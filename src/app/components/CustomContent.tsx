import React from "react";
import { Layout } from "antd";
interface CustomContentProps
  extends React.ComponentProps<typeof Layout.Content> {
  centerbox?: boolean;
  padding?: number;
  paddingTop?: number;
}
const CustomTitle: React.FC<CustomContentProps> = ({
  centerbox = false,
  padding = 0,
  paddingTop = 0,
  style,
  ...props
}) => {
  return (
    <Layout.Content
      {...props}
      style={{
        ...style,
        paddingTop: paddingTop ? paddingTop : "",
        display: centerbox ? "flex" : "unset",  // Set absolute positioning if centerbox is true
        justifyContent: centerbox ? "center" : "unset",
        overflow: "auto"
      }}
    >
      {props.children}
    </Layout.Content>
  );
};
export default CustomTitle;