import React from "react";
import { Menu, MenuProps } from "antd";
interface CustomMenuProps
    extends MenuProps {
    justify?: "start" | "center" | "end";
}
const CustomTitle: React.FC<CustomMenuProps> = ({
    style,
    justify,
    ...props
}) => {
    return (
        <Menu
            {...props}
            style={{
                ...style,
                justifyContent: justify,

            }}
        />
    );
};
export default CustomTitle;