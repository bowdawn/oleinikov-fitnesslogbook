import React from "react";
import { List } from "antd";
interface CustomListItemsProps
  extends React.ComponentProps<typeof List.Item> {
  flex?: boolean; 
}
const CustomListItem: React.FC<CustomListItemsProps> = ({

  
  style,
  ...props
}) => {
  return (
    <List.Item
      {...props}
      style={{
        ...style,
      }}
    >
      {props.children}
    </List.Item>
  );
};
export default CustomListItem;