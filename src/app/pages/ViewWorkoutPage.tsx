import { Card, Descriptions, Row, Button, Result, Skeleton, List } from "antd";
import React, { FC, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FitnessLogbookHeader from "../components/FitnessLogbookHeader";
import CustomLayout from "../components/CustomLayout";
import CustomContent from "../components/CustomContent";
import { EditOutlined } from "@ant-design/icons";
import { logbookPath, updateWorkoutPathPrefix } from "../routes/routes";
import CustomBreadcrumb from "../components/CustomBreadCrumb";
import ScrollableContainer from "../components/ScrollableContainer";
import CustomSpinContainer from "../components/CustomSpinContainer";
import { useWorkout } from "../providers/WorkoutProvider";
import { Chart, Tooltip, Axis, Area, Line } from "viser-react";
import G2Demo from "../components/G2Demo";
import LineGraph from "../components/G2Demo";

const ViewWorkoutPage: FC = () => {
  const location = useLocation();
  const { fetchWorkout, workout, loadingWorkout } = useWorkout();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const parentRef = useRef(null);

  useEffect(() => {
    fetchWorkout(parseInt(id || "0", 10));
  }, [id, location.search]);

  const showSkeleton = workout?.workout?.id != id || loadingWorkout;

  // Group data by exercise name
  const groupedData: Record<string, { index: number; weight: number }[]> =
    workout?.workout?.details?.reduce((acc, detail) => {
      const exerciseName = detail?.exercise?.name || "Unknown Exercise";
      if (!acc[exerciseName]) {
        acc[exerciseName] = [];
      }
      acc[exerciseName].push({
        index: acc[exerciseName].length + 1, // Use index for x-axis
        weight: parseFloat(detail.weight), // Parse weight to number
      });
      return acc;
    }, {} as Record<string, { index: number; weight: number }[]>) || {};

  // Function to check if weights are uniform
  const isUniform = (data: { index: number; weight: number }[]): boolean => {
    const weights = data.map((d) => d.weight);
    return weights.every((weight) => weight === weights[0]);
  };
  const exerciseCharts = Object.entries(groupedData || {})
    .filter(([, data]) => !isUniform(data))
    .map(([exerciseName, data]) => {
      // Scale configuration for each chart
      const scale = [
        {
          dataKey: "weight",
          min: 0,
        },
        {
          dataKey: "index",
        },
      ];

      return (
        <div key={exerciseName} style={{ marginBottom: "20px", width: "100%" }}>
          <h3>{exerciseName}</h3>
          <LineGraph data={data} />
        </div>
      );
    });

  return (
    <CustomLayout fullscreen relative>
      <ScrollableContainer ref={parentRef}>
        <FitnessLogbookHeader />
        <CustomContent>
         
          <div id="chart-container"></div>
          <CustomBreadcrumb
            marginBottom={13}
            items={[
              {
                title: (
                  <a
                    onClick={() => {
                      navigate(logbookPath);
                    }}
                  >
                    Workouts
                  </a>
                ),
              },
              {
                title: "View Workout",
              },
            ]}
          />
          <Card>
            <Row gutter={[24, 24]} justify={"center"}>
              {showSkeleton ? (
                <Skeleton title paragraph active />
              ) : (
                <Descriptions bordered column={1} style={{ width: "100%" }}>
                  <Descriptions.Item label="Date">
                    {workout?.workout?.date}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location">
                    {workout?.workout?.location?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Sport Type">
                    {workout?.workout?.sport?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Exercise Type">
                    {workout?.workout?.workoutCategory?.name}
                  </Descriptions.Item>
                  {workout?.workout?.duration ? (
                    <Descriptions.Item label="Duration">
                      {Math.floor(workout?.workout.duration / 60)} minute
                      {Math.floor(workout?.workout.duration / 60) !== 1
                        ? "s"
                        : ""}
                      {workout?.workout.duration % 60 !== 0 &&
                        ` ${workout?.workout.duration % 60} second${
                          workout?.workout.duration % 60 !== 1 ? "s" : ""
                        }`}
                    </Descriptions.Item>
                  ) : null}
                  {workout?.workout?.details &&
                  workout?.workout?.details.length > 0 ? (
                    <Descriptions.Item label="Details">
                      <List
                        dataSource={workout?.workout.details}
                        renderItem={(detail) => (
                          <List.Item>
                            <Descriptions
                              size="small"
                              layout="vertical"
                              bordered
                            >
                              {detail?.exercise?.name && (
                                <Descriptions.Item label="Exercise Name">
                                  {detail.exercise.name}
                                </Descriptions.Item>
                              )}
                              {detail?.reps !== null && (
                                <Descriptions.Item label="Reps">
                                  {detail.reps}
                                </Descriptions.Item>
                              )}
                              {detail?.weight !== null && (
                                <Descriptions.Item label="Weight">
                                  {detail.weight} kg
                                </Descriptions.Item>
                              )}
                              {detail?.calories !== null && (
                                <Descriptions.Item label="Calories">
                                  {detail.calories} kcal
                                </Descriptions.Item>
                              )}
                              {detail?.distance !== null && (
                                <Descriptions.Item label="Distance">
                                  {detail.distance} meters
                                </Descriptions.Item>
                              )}
                              {detail?.duration !== null && (
                                <Descriptions.Item label="Duration">
                                  {detail.duration} sec
                                </Descriptions.Item>
                              )}
                            </Descriptions>
                          </List.Item>
                        )}
                      />
                    </Descriptions.Item>
                  ) : null}
                </Descriptions>
              )}

              <Row justify={"center"} style={{ width: "100%" }}>
                {exerciseCharts.length > 0 ? exerciseCharts : null}
              </Row>

              <Row justify={"center"}>
                <Result
                  icon={
                    showSkeleton ? (
                      <Skeleton.Avatar size={80} active />
                    ) : (
                      <EditOutlined />
                    )
                  }
                  title={
                    showSkeleton ? (
                      <Skeleton
                        active
                        paragraph={false}
                        title={{ width: "50%" }}
                        className="ant-skeleton-centered"
                      />
                    ) : (
                      "Would you like to edit the Workout record?"
                    )
                  }
                  extra={
                    showSkeleton ? (
                      <Skeleton.Button active />
                    ) : (
                      <Button
                        type="primary"
                        onClick={() =>
                          navigate(
                            updateWorkoutPathPrefix + workout?.workout?.id
                          )
                        }
                      >
                        Update Workout
                      </Button>
                    )
                  }
                />
              </Row>
            </Row>
          </Card>
        </CustomContent>
        <CustomSpinContainer spinners={[]} />
      </ScrollableContainer>
    </CustomLayout>
  );
};

export default ViewWorkoutPage;
