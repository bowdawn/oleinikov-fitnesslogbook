import { Button, FloatButton, Card, Statistic, Col, Row, Result } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import FitnessLogbookHeader from "../components/FitnessLogbookHeader";
import CustomLayout from "../components/CustomLayout";
import CustomContent from "../components/CustomContent";
import ScrollableContainer from "../components/ScrollableContainer";
import { PlusCircleTwoTone } from "@ant-design/icons";
import WorkoutList from "../components/WorkoutList";
import { useWorkout, WorkoutItemType } from "../providers/WorkoutProvider";
import CustomSpinContainer from "../components/CustomSpinContainer";
import { createWorkoutPath } from "../routes/routes";
import { useNavigate } from "react-router-dom";

const LogbookPage: FC = () => {
  const parentRef = useRef(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const offset = (currentPage - 1) * pageSize;
  const {
    workouts,
    loadingWorkouts,
    errorWorkouts,
    loadingCrossfitCount,
    errorCrossfitCount,
    crossfitCount,
    loadingSwimmingCount,
    errorSwimmingCount,
    swimmingCount,
    fetchWorkouts,
    loadingUpdateWorkout,
    loadingCreateWorkout,
  } = useWorkout();
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  useEffect(() => fetchWorkouts(pageSize, offset), []);

  return (
    <CustomLayout fullscreen relative>
      <ScrollableContainer ref={parentRef}>
        <FitnessLogbookHeader />
        <CustomContent>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card>
                <Statistic
                  loading={loadingCrossfitCount}
                  title="CrossFit Attendance This Week"
                  value={crossfitCount?.crossfitAttendanceCount || undefined}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  loading={loadingCrossfitCount}
                  title="CrossFit Attendance Last Week"
                  value={
                    crossfitCount?.crossfitAttendanceLastWeekCount || undefined
                  }
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  loading={loadingCrossfitCount}
                  title="CrossFit Attendance Total"
                  value={
                    crossfitCount?.crossfitAttendanceTotalCount || undefined
                  }
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  loading={loadingSwimmingCount}
                  title="Swimming Attendance This Week"
                  value={swimmingCount?.swimmingAttendanceCount || undefined}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  loading={loadingSwimmingCount}
                  title="Swimming Attendance Last Week"
                  value={
                    swimmingCount?.swimmingAttendanceLastWeekCount || undefined
                  }
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  loading={loadingSwimmingCount}
                  title="Swimming Attendance Total"
                  value={
                    swimmingCount?.swimmingAttendanceTotalCount || undefined
                  }
                />
              </Card>
            </Col>

            <Col span={24}>
              <Card>
                <Result
                  icon={<PlusCircleTwoTone />}
                  title="Logbook Entry"
                  subTitle="Click the button below to create a new logbook entry."
                  extra={
                    <Button
                      type="primary"
                      onClick={() => navigate(createWorkoutPath)}
                      style={{ marginBottom: "20px" }}
                    >
                      Create Logbook Entry
                    </Button>
                  }
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card>
                <WorkoutList />
              </Card>
            </Col>
          </Row>
        </CustomContent>

        <CustomSpinContainer
          spinners={[
            {
              condition: loadingUpdateWorkout,
              spinning: loadingUpdateWorkout,
              fullscreen: true,
              tip: "Fitness Log Entry being updated",
            },
            {
              condition: loadingCreateWorkout,
              spinning: loadingCreateWorkout,
              fullscreen: true,
              tip: "Fitness Log Entry being created",
            },
          ]}
        />
        <FloatButton.BackTop
          target={() => (parentRef?.current ? parentRef.current : window)}
          style={{ right: "20px", bottom: "20px" }}
        />
      </ScrollableContainer>
    </CustomLayout>
  );
};
export default LogbookPage;
