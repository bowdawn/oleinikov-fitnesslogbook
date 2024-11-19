import React from "react";
import { Space, SpaceProps } from "antd";
interface CustomSpaceProps
    extends SpaceProps {
    fillHeight?: boolean;
    block?: boolean;
}
const CustomSpace: React.FC<CustomSpaceProps> = ({
    style,
    block = false,
    ...props
}) => {
    return (
        <Space
            {...props

            }
            style={{
                ...style,
                width: block ? "100%" : ""
            }}
        >
            {props.children}
        </Space>
    );
};
export default CustomSpace;