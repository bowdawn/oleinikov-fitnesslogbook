import React, { useEffect, useState } from "react";
import { Pagination, List, Skeleton, Card, Typography, Button, Divider, Row } from "antd";
import { useWorkout } from "../providers/WorkoutProvider";
import { WorkoutGroupType } from "../../generated/graphql";
import { updateWorkoutPathPrefix, viewWorkoutPathPrefix } from "../routes/routes";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const WorkoutList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const offset = (currentPage - 1) * pageSize;
  const { workouts, loadingWorkouts, fetchWorkouts } = useWorkout();

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const navigate = useNavigate()

  useEffect(() => {
    fetchWorkouts(pageSize, offset);
  }, [pageSize, offset, fetchWorkouts]);

  const loadingDataSource = Array.from({ length: pageSize }).map(
    () =>
      ({
        date: "",
        workouts: [],
      } as WorkoutGroupType)
  );

  const dataSource = loadingWorkouts
    ? loadingDataSource
    : workouts?.allWorkouts?.groupedItems ?? [];

  return (
    <>
      <Row justify={"center"}>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={workouts?.allWorkouts?.totalCount || 0}
        onChange={handlePageChange}
        showSizeChanger
        
      />
      </Row>
      <Title level={3}>Workouts</Title>
      <Divider style={{margin:0}}/>
      <List
        style={{ width: "100%" }}
        dataSource={dataSource || []}
        renderItem={(group, groupIndex) =>
          loadingWorkouts ? (
            <List.Item key={`loading-${groupIndex}`}>
              <Skeleton active title paragraph={{ rows: 4 }} />
            </List.Item>
          ) : (
            group && (
              <List.Item key={group.date || `group-${groupIndex}`}>
                <div  style={{ width: "100%" }}>
                  {/* Group Date */}
                  <h3>{group.date || "Unknown Date"}</h3>

                  {/* Workouts within the group */}
                  <List
                    style={{ width: "100%" }}
                    dataSource={group.workouts || []}
                    renderItem={(workout, workoutIndex) =>
                      workout && (
                        <List.Item
                          key={workout.id || `workout-${workoutIndex}`}
                        >
                          {/* Workout Card */}
                          <Card
                            style={{ width: "100%" }}
                            title={
                              <Title level={4} style={{ margin: 0 }}>
                                {workout.location?.name ||
                                  "No Location Provided"}
                              </Title>
                            }
                            actions={[
                              <Button onClick={() => {navigate(viewWorkoutPathPrefix+ workout?.id)}}>View</Button>,
                              <Button onClick={() => {navigate(updateWorkoutPathPrefix+ workout?.id)}}>Edit</Button>,
                            ]}
                          >
                            <Text>
                              <strong>Sport Type:</strong>{" "}
                              {workout.sport?.name || "N/A"}
                            </Text>
                            <br />
                            <Text>
                              <strong>Exercise Type:</strong>{" "}
                              {workout.workoutCategory?.name || "N/A"}
                            </Text>
                            {workout.details && workout.details.length > 0 && (
                              <>
                                <br />
                                <Text>
                                  <strong>Details:</strong>{" "}
                                  {Array.from(
                                    new Set(
                                      workout.details.map(
                                        (detail) =>
                                          detail.exercise?.name ||
                                          "Unknown Exercise"
                                      )
                                    )
                                  ).join(", ")}
                                </Text>
                              </>
                            )}
                          </Card>
                        </List.Item>
                      )
                    }
                  />
                </div>
              </List.Item>
            )
          )
        }
      />
    </>
  );
};

export default WorkoutList;
