import { Col, Layout,  Drawer, Menu } from "antd";
import React, { FC,  useRef, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import CustomTitle from "./CustomTitle";
import { MenuOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import { logbookPath, loginPath } from "../routes/routes";
import CustomRow from "./CustomRow";
import CustomMenu from "./CustomMenu";
import useResizeObserver from "../hooks/useResizeObserver";


const FitnessLogbookHeader: FC = () => {
    const { isAuthenticated, logout, user, isTokenValidated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const parentRef = useRef(null);
    const [showMenu, setShowMenu] = useState(false);
    const currentPath = location.pathname;
    const [drawerVisible, setDrawerVisible] = useState(false);
    const menuItems = [
        isAuthenticated
            ? {
                key: "logout",
                label: "Logout",
                onClick: () => {logout()
                navigate(loginPath)
                },
            }
            : currentPath === loginPath || currentPath === "/"
                ? null
                : {
                    key: "login",
                    label: "Login",
                    onClick: () => navigate(loginPath),
                }
    ];

    const handleDrawerClose = () => {
        setDrawerVisible(false);
    };
    useResizeObserver(
        parentRef,
        [
          {
            width: 800,
            callback: () => setShowMenu(false),
          },
        ],
        () => setShowMenu(true)
      );

    return (
        <div ref={parentRef}>
            <Layout.Header>
                <CustomRow justify="end" align="middle" inheritHeight style={{ position: "relative" }}>
                    <CustomTitle
                        white
                        level={5}
                        marginless
                        style={{
                            textAlign: !showMenu ? "left" : "center", 
                            width: !showMenu ? "auto" : "100%", 
                            position: "absolute",
                            left: !showMenu ? "0%" : "50%",
                            top: "50%",
                            transform: !showMenu ? "translate(0%, -50%)" : "translate(-50%, -50%)",
                        }}
                    >
                        Oleinikov Fitness Logbook
                    </CustomTitle>
                    <Col flex="none" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {/* Welcome Message */}
                        {user && !showMenu ? (
                            <div style={{
                                color: "white",
                                marginRight: '16px',
                            }}>
                                Welcome, {user?.username }
                            </div>
                        ) : null}

                        {/* Drawer for small screens */}
                        {isTokenValidated && (
                            showMenu ? (
                                <>
                                    <MenuOutlined
                                        style={{ color: 'white', fontSize: '16px', cursor: 'pointer' }}
                                        onClick={() => setDrawerVisible(true)}
                                    />
                                    <Drawer
                                        title={user ?
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                Welcome, {user?.username}
                                            </div>
                                            : null
                                        }
                                        placement="right"
                                        onClose={handleDrawerClose}
                                        open={drawerVisible}
                                        closable={true}

                                    >


                                        <Menu
                                            items={menuItems}
                                            onClick={handleDrawerClose}
                                        />
                                    </Drawer>
                                </>
                            ) : (
                                <CustomMenu
                                    theme="dark"
                                    mode="horizontal"
                                    selectable={false}
                                    items={menuItems}
                                    style={{
                                        minWidth: '70px',
                                        textAlign: 'right',
                                    }}
                                />
                            )
                        )}
                    </Col>
                </CustomRow>
            </Layout.Header>
        </div>
    );
};

export default FitnessLogbookHeader;
