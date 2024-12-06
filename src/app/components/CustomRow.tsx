import React from "react";
import { Row, RowProps } from "antd";
interface CustomRowProps
    extends RowProps {
        verticalPadding?: number;
        verticalMargin?: number;
        marginBottom?: number;
        marginTop?: number;
        inheritHeight?: boolean;
        block?: boolean;
        preventOverflow?: boolean;
        noWrap?: boolean; 
}
const CustomRow: React.FC<CustomRowProps> = ({
    style,
    verticalPadding = 0,
    verticalMargin = 0,
    marginBottom = 0,
    marginTop = 0,
    inheritHeight = false,
    block = false,
    preventOverflow = false,
    noWrap = false, 
    ...props
}) => {
    return (
        <Row
            {...props}
            style={{
                ...style,
                paddingTop : verticalPadding ? verticalPadding + "px" : "",
                paddingBottom : verticalPadding ? verticalPadding + "px" : "",
                marginTop : marginTop ? marginTop + "px" :  verticalMargin ? verticalMargin + "px" : "",
                marginBottom : marginBottom ? marginBottom + "px" : verticalMargin ? verticalMargin + "px" : "",
                height: inheritHeight ? "inherit": "",
                width: block ? " 100%" : "",
                overflow: preventOverflow ? "hidden" : "",
                ...(noWrap && { flexWrap: "nowrap" })
            }}
        >
            {props.children}
        </Row>
    );
};
export default CustomRow;