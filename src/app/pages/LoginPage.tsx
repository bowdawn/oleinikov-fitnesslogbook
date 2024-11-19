import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, Col, Result, Row, Skeleton } from "antd";
import { SmileTwoTone } from "@ant-design/icons";
import { useAuth, LoginFormValues } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { logbookPath } from "../routes/routes";
import FitnessLogbookHeader from "../components/FitnessLogbookHeader";
import CustomLayout from "../components/CustomLayout";
import CustomContent from "../components/CustomContent";
import CustomCard from "../components/CustomCard";
import CustomRow from "../components/CustomRow";
import useResizeObserver from "../hooks/useResizeObserver";
import ScrollableContainer from "../components/ScrollableContainer";
import CustomSpinContainer from "../components/CustomSpinContainer";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const parentRef = useRef(null);
  const [cardSpan, setCardSpan] = useState(24);
  const { isTokenValidated, validateTokenLoading, login, loginLoading, isAuthenticated } = useAuth();
  const showSkeleton = !isTokenValidated || validateTokenLoading || loginLoading || isAuthenticated
  useEffect(() => {
    if (isAuthenticated) {
        const redirectTimeout = setTimeout(() => {
            navigate(logbookPath);
        }, 5000);
        return () => clearTimeout(redirectTimeout);
    }
}, [isAuthenticated]);

  useResizeObserver(
    parentRef,
    [
      {
        width: 1200,
        callback: () => setCardSpan(16),
      },
    ],
    () => setCardSpan(24)
  );

  const onFinish = async (values: LoginFormValues) => {
    await login(values);
    if (isAuthenticated) {
      navigate(logbookPath);
    }
  };

  return (
    <CustomLayout fullscreen relative>
      <ScrollableContainer ref={parentRef}>
        <FitnessLogbookHeader />
        <CustomContent centerbox>
          <CustomRow block justify="center" align="middle">
            <Col span={cardSpan}>
              <CustomCard
                block
                cover={
                  <Result
                    icon={
                      showSkeleton ? (
                        <Skeleton.Avatar size={80} active />
                      ) : (
                        <SmileTwoTone />
                      )
                    }
                    title={
                      showSkeleton ? (
                        <Skeleton
                          active
                          paragraph={false}
                          title={{ width: "50%" }}
                          className="ant-skeleton-centered"
                        />
                      ) : (
                        "Welcome to the Oleinikov Fitness Logbook!"
                      )
                    }
                    subTitle={
                      showSkeleton ? (
                        <Skeleton active paragraph={false} />
                      ) : (
                        "Login is reserved for existing users only. To view the fitness logbook please login first."
                      )
                    }
                  />
                }
              >
                <Form<LoginFormValues>
                  name="login"
                  layout={"vertical"}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label={showSkeleton ? <Skeleton active paragraph={false} title={{ width: 50 }} /> : "Username"}
                    name="username"
                  >
                    {showSkeleton ? <Skeleton.Input block active /> : <Input />}
                  </Form.Item>
                  <Form.Item
                    label={showSkeleton ? <Skeleton active paragraph={false} title={{ width: 75 }} /> : "Password"}
                    name="password"
                  >
                    {showSkeleton ? <Skeleton.Input block active /> : <Input.Password />}
                  </Form.Item>
                  <Row justify="end">
                    <Form.Item>
                      {showSkeleton ? (
                        <Skeleton.Button block active />
                      ) : (
                        <Button type="primary" htmlType="submit" loading={loginLoading}>
                          Login
                        </Button>
                      )}
                    </Form.Item>
                  </Row>
                </Form>
              </CustomCard>
            </Col>
          </CustomRow>
        </CustomContent>
        <CustomSpinContainer
                    spinners={[
                        {
                            condition: !isTokenValidated && !validateTokenLoading && !loginLoading && !isAuthenticated,
                            spinning: true || !isTokenValidated,
                            fullscreen: true,
                            tip: 'Token is not validated...',
                        },
                        {
                            condition: !isTokenValidated && validateTokenLoading && !loginLoading && !isAuthenticated,
                            spinning: validateTokenLoading,
                            fullscreen: true,
                            tip: 'Token is being validated...',
                        },
                        {
                            condition: isTokenValidated && !validateTokenLoading && loginLoading && !isAuthenticated,
                            spinning: loginLoading,
                            fullscreen: true,
                            tip: 'Login details are being verified...',
                        },
                        {
                            condition: isTokenValidated && !validateTokenLoading && !loginLoading && isAuthenticated,
                            spinning: isAuthenticated,
                            fullscreen: true,
                            tip: 'User has been successfully verified. You will now be redirected to the fitness logbook page in 5 seconds...',
                        },
                    ]}
                />
      </ScrollableContainer>
    </CustomLayout>
  );
};

export default LoginPage;
