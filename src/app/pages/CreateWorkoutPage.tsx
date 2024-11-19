import {
    Row,
    Card,
} from "antd";
import React, { FC,  useRef } from "react";
import { useNavigate } from "react-router-dom";
import FitnessLogbookHeader from "../components/FitnessLogbookHeader";
import CustomLayout from "../components/CustomLayout";
import CustomContent from "../components/CustomContent";
import { logbookPath} from "../routes/routes";
import CustomBreadcrumb from "../components/CustomBreadCrumb";
import { useAuth } from "../providers/AuthProvider";
import CustomSpinContainer from "../components/CustomSpinContainer";
import ScrollableContainer from "../components/ScrollableContainer";
import WorkoutForm from "../components/WorkoutForm";


const CreateWorkoutPage: FC = () => {
    const parentRef = useRef(null);
    const navigate = useNavigate();
    const { isTokenValidated, validateTokenLoading } = useAuth();
    return (
        <CustomLayout fullscreen relative>
            <ScrollableContainer ref={parentRef}>
                <FitnessLogbookHeader />
                <CustomContent >
                    <CustomBreadcrumb
                        marginBottom={13}
                        items={[
                            {
                                title: (
                                    <a onClick={() => navigate(logbookPath)}>Workouts</a>
                                ),
                            },
                            {
                                title: "Add Logbook Entry",
                            },
                        ]}
                    />
                    <Card>
                        <Row justify={"center"}>
                            <WorkoutForm/>
                        </Row>
                    </Card>
                </CustomContent>
                <CustomSpinContainer
                    spinners={[
                        {
                            condition: !isTokenValidated && !validateTokenLoading,
                            spinning: !isTokenValidated,
                            fullscreen: true,
                            tip: 'Token is not validated...',
                        },
                        {
                            condition: !isTokenValidated && validateTokenLoading,
                            spinning: validateTokenLoading,
                            fullscreen: true,
                            tip: 'Token is being validated...',
                        },
                        
                    ]}
                />
            </ScrollableContainer>
        </CustomLayout>
    );
};
export default CreateWorkoutPage;
