import React from "react";
import { Typography } from "antd";

interface CustomTitleProps
  extends React.ComponentProps<typeof Typography.Title> {
  white?: boolean;
  marginless?: boolean;
  oneline?: boolean; // Indicates if the text should be a single line
}

const CustomTitle: React.FC<CustomTitleProps> = ({
  white = false,
  marginless = false,
  oneline = false,
  style,
  ...props
}) => {
  return (
    <Typography.Title
      {...props}
      style={{
        ...style,
        color: white ? "white" : style?.color,
        margin: marginless ? 0 : style?.margin,
        whiteSpace: oneline ? "nowrap" : undefined, // Prevent wrapping if oneline is true
        overflow: oneline ? "hidden" : undefined, // Hide overflowed text
        textOverflow: oneline ? "ellipsis" : undefined, // Show ellipsis for overflowed text
      }}
    >
      {props.children}
    </Typography.Title>
  );
};

export default CustomTitle;
