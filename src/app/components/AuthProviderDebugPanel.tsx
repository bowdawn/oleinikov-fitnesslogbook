import React, { useEffect, useState } from "react";
import { Descriptions, Button, Typography, FloatButton, Layout, Card, Row, Affix } from "antd";
import { useAuth } from "../providers/AuthProvider";
import { UserOutlined } from "@ant-design/icons";
import CustomTitle from "./CustomTitle";

const { Text } = Typography;

const AuthProviderDebugPanel: React.FC<{
    setIsTokenValidated: React.Dispatch<React.SetStateAction<boolean>>;
    setValidateTokenLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setLoginLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
    setIsTokenValidated,
    setValidateTokenLoading,
    setLoginLoading,
    setIsAuthenticated,
}) => {
        const [visible, setCollapsed] = useState(false);
        const {
            isTokenValidated,
            validateTokenLoading,
            loginLoading,
            isAuthenticated,
            user
        } = useAuth();

        const collapseSider = () => {
            setCollapsed(!visible);
        };
        useEffect(() => {
            const rootElement = document.getElementById('root'); 
            if (rootElement) {
              if (visible) {
                rootElement.classList.add('auth-sider-open'); 
              } else {
                rootElement.classList.remove('auth-sider-open'); 
              }
            }
        
    
            return () => {
              if (rootElement) {
                rootElement.classList.remove('auth-sider-open');
              }
            };
          }, [visible]);

        return (
            <>
                <FloatButton
                    type="primary"
                    icon={<UserOutlined />}
                    onClick={collapseSider}
                    style={{ display: visible ? "none" : "block", bottom: 108, right: 20 }}
                />
                <Layout.Sider
                    collapsible
                    width={400}
                    collapsed={!visible}
                    onCollapse={collapseSider}
                > <Affix offsetTop={0}>
                        <div className="opacity-transition" style={{ width: visible? 400 : 0, opacity: visible ? 1 : 0, overflow: "hidden" }}>
                            <Row style={{ height: 64 }} justify={"center"} align={"middle"}>
                                <CustomTitle oneline  white level={5} marginless>Auth Provider Debug Panel</CustomTitle>
                            </Row>
                            <Card style={{ borderRadius: 0, maxHeight: "calc(100vh - 112px)", height: "calc(100vh - 112px)", overflow: "auto" }}>
                                <Descriptions column={1} bordered size="small" style={{ marginTop: 16 }}>
                                    <Descriptions.Item label="is Token Validated">
                                        <Button
                                            type={isTokenValidated ? "primary" : "default"}
                                            onClick={() => setIsTokenValidated(prev => !prev)} // Toggle using setIsTokenValidated
                                            style={{ marginRight: 8 }}
                                        >
                                            Toggle
                                        </Button>
                                        <Text style={{ color: isTokenValidated ? "green" : "red" }}>
                                            {isTokenValidated.toString()}
                                        </Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="validate Token Loading">
                                        <Button
                                            type={validateTokenLoading ? "primary" : "default"}
                                            onClick={() => setValidateTokenLoading(prev => !prev)} // Toggle using setValidateTokenLoading
                                            style={{ marginRight: 8 }}
                                        >
                                            Toggle
                                        </Button>
                                        <Text style={{ color: validateTokenLoading ? "green" : "red" }}>
                                            {validateTokenLoading.toString()}
                                        </Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="login Loading">
                                        <Button
                                            type={loginLoading ? "primary" : "default"}
                                            onClick={() => setLoginLoading(prev => !prev)} // Toggle using setLoginLoading
                                            style={{ marginRight: 8 }}
                                        >
                                            Toggle
                                        </Button>
                                        <Text style={{ color: loginLoading ? "green" : "red" }}>
                                            {loginLoading.toString()}
                                        </Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="is Authenticated">
                                        <Button
                                            type={isAuthenticated ? "primary" : "default"}
                                            onClick={() => setIsAuthenticated(prev => !prev)} // Toggle using setIsAuthenticated
                                            style={{ marginRight: 8 }}
                                        >
                                            Toggle
                                        </Button>
                                        <Text style={{ color: isAuthenticated ? "green" : "red" }}>
                                            {isAuthenticated?.toString()}
                                        </Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="User">
                                        {JSON.stringify(user)}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </div>
                    </Affix>
                </Layout.Sider>
            </>
        );
    };

export default AuthProviderDebugPanel;
