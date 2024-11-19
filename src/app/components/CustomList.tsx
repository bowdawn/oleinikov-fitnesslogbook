import React from "react";
import { List, ListProps } from "antd";
interface CustomListProps
    extends ListProps<any> {
        dynamicHeight?: boolean;
}
const CustomList: React.FC<CustomListProps> = ({
    style,
    dynamicHeight = true,
    ...props
}) => {
    return (
        <List
            {...props}
            className={ dynamicHeight ? "ant-list-dynamic-height" : "" }
        >
            {props.children}
        </List>
    );
};
export default CustomList;