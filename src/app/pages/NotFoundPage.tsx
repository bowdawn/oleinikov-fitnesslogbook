import React, { useRef } from "react";
import { Button, Card, Result } from "antd";
import { useNavigate } from "react-router-dom";
import CustomLayout from "../components/CustomLayout";
import FitnessLogbookHeader from "../components/FitnessLogbookHeader";
import CustomContent from "../components/CustomContent";
import ScrollableContainer from "../components/ScrollableContainer";


const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const parentRef = useRef(null);
  return (
    <CustomLayout fullscreen relative>
      <ScrollableContainer ref={parentRef}>
        <FitnessLogbookHeader />
        <CustomContent centerbox>
          <Card>
            <Result
              status="404"
              title="404"
              subTitle="Page Not Found."
              extra={
                <Button
                  type="primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back to Home
                </Button>
              }
            />
          </Card>
        </CustomContent>
      </ScrollableContainer>
    </CustomLayout>
  );
};
export default NotFoundPage;
