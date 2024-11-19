import React from "react";
import { Breadcrumb, BreadcrumbProps } from "antd";
interface CustomBreadcrumbProps
    extends BreadcrumbProps {
    marginBottom?: number;
}
const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({
    style,
    marginBottom = 0,
    ...props
}) => {
    return (
        <Breadcrumb
            {...props}
            style={{
                ...style,
                marginBottom: marginBottom ? marginBottom : ""
            }}
        >
            {props.children}
        </Breadcrumb>
    );
};
export default CustomBreadcrumb;