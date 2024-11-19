import React from "react";
import { Card, CardProps } from "antd";
interface CustomCardProps
    extends CardProps {
    fillHeight?: boolean;
    block?: boolean;
}
const CustomCard: React.FC<CustomCardProps> = ({
    style,
    block = false,
    ...props
}) => {
    return (
        <Card
            {...props

            }
            style={{
                ...style,
                width: block ? "100%" : ""
            }}
        >
            {props.children}
        </Card>
    );
};
export default CustomCard;