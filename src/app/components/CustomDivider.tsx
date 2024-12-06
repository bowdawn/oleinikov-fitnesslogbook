import React from "react";
import { Divider, DividerProps } from "antd";

interface CustomDividerProps extends DividerProps {
  verticalMargin?: number;
}

const CustomDivider: React.FC<CustomDividerProps> = ({
  style,
  verticalMargin,
  ...props
}) => {
  return (
    <Divider
      {...props}
      style={{
        ...style,
        marginTop: verticalMargin !== undefined ? `${verticalMargin}px` : undefined,
        marginBottom: verticalMargin !== undefined ? `${verticalMargin}px` : undefined,
      }}
    >
      {props.children}
    </Divider>
  );
};

export default CustomDivider;
