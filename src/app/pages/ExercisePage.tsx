import React, { useState } from "react";
import { Select, Button, Table, notification, Space } from "antd";
import { useLazyQuery, gql } from "@apollo/client";
import { useWorkout } from "../providers/WorkoutProvider";

const { Option } = Select;

// Define the GraphQL query
const GET_MAX_WEIGHT_PER_REPS = gql`
  query GetMaxWeightPerReps($exerciseName: String!) {
    maxWeightPerReps(exerciseName: $exerciseName) {
      reps
      maxWeight
    }
  }
`;

interface MaxWeightPerReps {
  reps: number;
  maxWeight: number;
}

const ExerciseMaxWeightPage: React.FC = () => {
  const [exerciseName, setExerciseName] = useState<string | null>(null);
  const { exercises } = useWorkout();
  const [data, setData] = useState<MaxWeightPerReps[]>([]);

  const [fetchMaxWeightPerReps, { loading }] = useLazyQuery(GET_MAX_WEIGHT_PER_REPS, {
    onCompleted: (response) => {
      setData(response.maxWeightPerReps || []);
      notification.success({
        message: "Data Fetched Successfully",
      });
    },
    onError: (err) => {
      notification.error({
        message: "Error Fetching Data",
        description: err.message,
      });
    },
  });

  const handleFetchData = () => {
    if (exerciseName) {
      fetchMaxWeightPerReps({ variables: { exerciseName } });
    } else {
      notification.warning({
        message: "No Exercise Selected",
        description: "Please select an exercise to fetch data.",
      });
    }
  };

  const columns = [
    {
      title: "Reps",
      dataIndex: "reps",
      key: "reps",
    },
    {
      title: "Max Weight",
      dataIndex: "maxWeight",
      key: "maxWeight",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Exercise Max Weight per Reps</h1>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Select
          placeholder="Select an exercise"
          style={{ width: "100%" }}
          onChange={(value) => setExerciseName(value)}
          value={exerciseName}
          loading={loading}
          showSearch
          filterOption={(input, option) =>
            option?.children?.toLowerCase().includes(input.toLowerCase())
          }
        >
          {exercises?.allExercises?.map((exercise: any) => (
            <Option key={exercise.id} value={exercise.name}>
              {exercise.name}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={handleFetchData} loading={loading}>
          Fetch Data
        </Button>
        <Table
          columns={columns}
          dataSource={data.map((item, index) => ({ ...item, key: index }))}
          loading={loading}
          pagination={false}
        />
      </Space>
    </div>
  );
};

export default ExerciseMaxWeightPage;
