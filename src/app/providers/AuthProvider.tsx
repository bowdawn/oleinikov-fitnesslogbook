import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { notification } from "antd";
import axios from "../../core/utils/axios";
import AuthProviderDebugPanel from "../components/AuthProviderDebugPanel";
import { useLoginMutation, useVerifyTokenMutation } from "../../generated/graphql";

export interface LoginFormValues {
  username: string;
  password: string;
}

type NotificationType = "success" | "info" | "warning" | "error";

interface AuthContextType {
  validateTokenLoading: boolean;
  loginLoading: boolean;
  isAuthenticated: boolean;
  validateToken: () => Promise<void>;
  isTokenValidated: boolean;
  login: (values: LoginFormValues) => Promise<void>;
  logout: () => void;
  user: {
    __typename?: "UserType";
    username: string;
    email: string;
  } | null | undefined;
}

const AuthContext = createContext<AuthContextType>({
  validateTokenLoading: false,
  loginLoading: false,
  isAuthenticated: false,
  isTokenValidated: false,
  validateToken: async () => {},
  login: async () => {},
  logout: () => {},
  user: null,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [validateTokenLoading, setValidateTokenLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loginMutation] = useLoginMutation();
  const [verifyTokenMutation] = useVerifyTokenMutation();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({ message, description });
  };

  const validateToken = async () => {
    setValidateTokenLoading(true);
    const token = localStorage.getItem("oleinikov-fitnesslogbook-token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const { data, errors } = await verifyTokenMutation();
        
        if (data?.verifyToken?.isValid && data.verifyToken.user) {
          setIsAuthenticated(true);
          setUser(data.verifyToken.user);
          openNotificationWithIcon("info", "Welcome Back", "Nice to see you again!");
        } else {
          handleLogout(
            "warning",
            "Session Expired",
            errors?.[0]?.message || "Please log in again."
          );
        }
      } catch (err : any) {
        handleLogout(
          "error",
          "Validation Error",
          err.message || "An error occurred during token validation."
        );
      }
    } else {
      handleLogout();
    }
    setIsTokenValidated(true);
    setValidateTokenLoading(false);
  };

  const handleLogout = (type: NotificationType = "info", message = "", description = "") => {
    localStorage.removeItem("oleinikov-fitnesslogbook-token");
    setIsAuthenticated(false);
    setUser(null);
    if (message) openNotificationWithIcon(type, message, description);
  };

  useEffect(() => {
    validateToken();
  }, []);

  const login = async (values: LoginFormValues) => {
    setLoginLoading(true);
    try {
      const { data, errors } = await loginMutation({
        variables: { username: values.username, password: values.password },
      });
      if (data?.login) {
        const { user, token } = data.login;
        if (token) {
          localStorage.setItem("oleinikov-fitnesslogbook-token", token);
        }

        setIsAuthenticated(true);
        setUser(user);
        openNotificationWithIcon("success", "Login Successful", "Welcome back!");
      } else {
        openNotificationWithIcon("error", "Login Error", errors?.[0]?.message || "Login failed.");
      }
    } catch (err : any) {
      openNotificationWithIcon("error", "Login Error", err.message || "Login failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    validateToken,
    login,
    logout: handleLogout,
    validateTokenLoading,
    loginLoading,
    isTokenValidated,
    user,
  };

  const debug_states = process.env["REACT_APP_DEBUG_AUTH"] === "true";

  return (
    <AuthContext.Provider value={value}>
      {contextHolder}
      {debug_states && (
        <AuthProviderDebugPanel
          setIsTokenValidated={setIsTokenValidated}
          setValidateTokenLoading={setValidateTokenLoading}
          setLoginLoading={setLoginLoading}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
