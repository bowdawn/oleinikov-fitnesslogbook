import {
    Row,
    Card,
    Skeleton,
} from "antd";
import React, { FC,  useEffect,  useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FitnessLogbookHeader from "../components/FitnessLogbookHeader";
import CustomLayout from "../components/CustomLayout";
import CustomContent from "../components/CustomContent";
import { logbookPath, viewWorkoutPathPrefix} from "../routes/routes";
import CustomBreadcrumb from "../components/CustomBreadCrumb";

import CustomSpinContainer from "../components/CustomSpinContainer";
import ScrollableContainer from "../components/ScrollableContainer";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkout } from "../providers/WorkoutProvider";


const UpdateWorkoutPage: FC = () => {
    const parentRef = useRef(null);
    const navigate = useNavigate();
    const {workout, loadingWorkout, fetchWorkout} =  useWorkout()
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        fetchWorkout(parseInt(id || "0", 10));
      }, [id, location.search]);
    
    const showSkeleton = workout?.workout?.id != id || loadingWorkout;
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
                                title: (
                                    <a onClick={() => navigate(viewWorkoutPathPrefix+ workout?.workout?.id)}>View Workout</a>
                                ),
                            },
                            {
                                title: "Update Logbook Entry",
                            },
                        ]}
                    />
                    <Card>
                        <Row justify={"center"}>
                            {showSkeleton ? <Skeleton/> : <WorkoutForm selectedWorkout={workout?.workout}/>}
                            
                        </Row>
                    </Card>
                </CustomContent>
                <CustomSpinContainer
                    spinners={[
                     
                        
                    ]}
                />
            </ScrollableContainer>
        </CustomLayout>
    );
};
export default UpdateWorkoutPage;
