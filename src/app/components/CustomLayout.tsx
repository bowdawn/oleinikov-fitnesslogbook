import React from "react";
import { Layout, LayoutProps } from "antd";
interface CustomLayoutProps
    extends LayoutProps {
    fullscreen?: boolean;
    relative?: boolean;
}
const CustomTitle: React.FC<CustomLayoutProps> = ({
    style,
    fullscreen = false,
    relative = false,
    ...props
}) => {
    return (
        <Layout
            {...props}
            style={{
                ...style,
                minHeight: fullscreen ? "100vh" : "",
                position: relative ? "relative" : "unset"
            }}
        >
            {props.children}
        </Layout>
    );
};
export default CustomTitle;