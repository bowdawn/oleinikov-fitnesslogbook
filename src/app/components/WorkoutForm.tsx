import React from "react";
import {
  Form,
  DatePicker,
  AutoComplete,
  Input,
  Button,
  Space,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { getFilteredAndSortedRecords } from "../../core/utils/sort";
import { useWorkout } from "../providers/WorkoutProvider";
import { GetWorkoutQuery } from "../../generated/graphql";



interface WorkoutFormProps {
  selectedWorkout?: GetWorkoutQuery["workout"]
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({
  selectedWorkout,
}) => {
 const {exercises, locations, sports, categories, createWorkout , updateWorkout} = useWorkout()
  const [form] = Form.useForm();
  const  handleModalOk = async (values: any) =>  {
    if (selectedWorkout) {
        await updateWorkout({
          workoutId: selectedWorkout?.id ,
          ...values
        });
    } else {
        await createWorkout(values);
    }
  }

  return (
    <Form
      form={form}
      initialValues={
        selectedWorkout
          ? {
              ...selectedWorkout,
              date: dayjs(selectedWorkout.date),
              sportName: selectedWorkout?.sport?.name,
              locationName: selectedWorkout?.location?.name,
              workoutCategoryName: selectedWorkout?.workoutCategory?.name,
              durationMinutes: selectedWorkout.duration
                ? Math.floor(selectedWorkout.duration / 60)
                : undefined,
              durationSeconds: selectedWorkout.duration
                ? selectedWorkout.duration % 60
                : undefined,
              workoutDetailsInput: selectedWorkout?.details.map((detail) => ({
                exerciseName: detail?.exercise?.name,
                reps: detail?.reps,
                weight: detail?.weight,
                calories: detail?.calories,
                distance: detail?.distance,
                selected: false,
              })),
            }
          : {}
      }
      onFinish={handleModalOk}
      layout="vertical"
    >
      <Space>
        <Button
          type="primary"
          onClick={() => {
            form.setFieldsValue({
              date: dayjs(),
              locationName: "Chinn Center",
              sportName: "Swimming",
              workoutCategoryName: "Laps",
              durationMinutes: 45,
            });
          }}
          style={{ marginBottom: "16px" }}
        >
          Swimming
        </Button>
        <Button
          type="primary"
          onClick={() => {
            form.setFieldsValue({
              date: dayjs(),
              locationName: "Woodbridge Crossfit",
              sportName: "CrossFit",
            });
          }}
          style={{ marginBottom: "16px" }}
        >
          Crossfit
        </Button>

        <Button
          type="primary"
          onClick={() => {
            form.setFieldsValue({
              date: dayjs(),
              locationName: "Home to Chinn Center to Home Loop",
              sportName: "Biking",
              workoutCategoryName: "Biking",
              workoutDetailsInput: [{
                exerciseName: "Biking",
                distance: "13000"
              }]
            
            });
          }}
          style={{ marginBottom: "16px" }}
        >
          Biking
        </Button>
      </Space>
      <Form.Item name="date" label="Date">
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="sportName"
        label="Sport"
        rules={[{ required: true, message: "Please input the sport!" }]}
      >
        <AutoComplete
          options={getFilteredAndSortedRecords(
            sports?.allSports || [],
            form.getFieldValue("sportName") || ""
          )}
          onChange={(value) => form.setFieldsValue({ sportName: value })}
        >
          <Input />
        </AutoComplete>
      </Form.Item>
      <Form.Item
        name="locationName"
        label="Location"
        rules={[{ required: true, message: "Please input the location!" }]}
      >
        <AutoComplete
          options={getFilteredAndSortedRecords(
            locations?.allLocations || [],
            form.getFieldValue("locationName") || ""
          )}
          onChange={(value) => form.setFieldsValue({ locationName: value })}
        >
          <Input />
        </AutoComplete>
      </Form.Item>
      <Form.Item
        name="workoutCategoryName"
        label="Workout Category"
        rules={[
          { required: true, message: "Please input the workout category!" },
        ]}
      >
        <AutoComplete
          options={getFilteredAndSortedRecords(
            categories?.allWorkoutCategories || [],
            form.getFieldValue("workoutCategoryName") || ""
          )}
          onChange={(value) =>
            form.setFieldsValue({ workoutCategoryName: value })
          }
        >
          <Input />
        </AutoComplete>
      </Form.Item>
      <Form.Item label="Duration">
        <Space align="center">
          <Form.Item name="durationMinutes">
            <Input placeholder="minutes" />
          </Form.Item>
          <span>minutes</span>
          <Form.Item name="durationSeconds">
            <Input placeholder="seconds" />
          </Form.Item>
          <span>seconds</span>
        </Space>
      </Form.Item>
      <div>
        <h3>Details</h3>
        <Form.List name="workoutDetailsInput">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "selected"]}
                    valuePropName="checked"
                  >
                    <Checkbox />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "exerciseName"]}>
                    <AutoComplete
                      options={getFilteredAndSortedRecords(
                        exercises?.allExercises || [],
                        form.getFieldValue([
                          "workoutDetailsInput",
                          index,
                          "exerciseName",
                        ]) || ""
                      )}
                      onChange={(value) =>
                        form.setFieldsValue({
                          workoutDetailsInput: {
                            [index]: { exerciseName: value },
                          },
                        })
                      }
                    >
                      <Input placeholder="Exercise Name" />
                    </AutoComplete>
                  </Form.Item>
                  <Form.Item name={[name, "reps"]}>
                    <Input placeholder="Reps" />
                  </Form.Item>
                  <Form.Item name={[name, "weight"]}>
                    <Input placeholder="Weight" />
                  </Form.Item>
                  <Form.Item name={[name, "calories"]}>
                    <Input placeholder="Calories" />
                  </Form.Item>
                  <Form.Item name={[name, "distance"]}>
                    <Input placeholder="Distance" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                  <CopyOutlined
                    onClick={() => {
                      const currentValues = form.getFieldValue([
                        "workoutDetailsInput",
                        name,
                      ]);
                      add(currentValues);
                    }}
                    style={{
                      marginLeft: "8px",
                      color: "#1890ff",
                      cursor: "pointer",
                    }}
                  />
                  <Button
                    type="link"
                    onClick={() => add({}, index)}
                    style={{ color: "#52c41a" }}
                  >
                    Insert Before
                  </Button>
                  <Button
                    type="link"
                    onClick={() => add({}, index + 1)}
                    style={{ color: "#52c41a" }}
                  >
                    Insert After
                  </Button>
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
              <Form.Item>
                    <Space>
                      <Input
                        placeholder="Number of times to copy"
                        type="number"
                        min={0}
                        value={form.getFieldValue("copyCount")}
                        onChange={(e) =>
                          form.setFieldsValue({ copyCount: e.target.value })
                        }
                      />
                      <Button
                        type="primary"
                        onClick={() => {
                          const details = form.getFieldValue(
                            "workoutDetailsInput"
                          );
                          const selectedDetails = details
                            .filter((detail: any) => detail.selected)
                            .map((detail: any) => ({
                              ...detail,
                              selected: false,
                            }));
                          const copyCount =
                            form.getFieldValue("copyCount") || 1;

                          for (let i = 0; i < copyCount; i++) {
                            selectedDetails.forEach((detail: any) =>
                              add(detail)
                            );
                          }
                        }}
                      >
                        Copy Selected Fields
                      </Button>
                    </Space>
                  </Form.Item>
            </>
          )}
        </Form.List>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {selectedWorkout ? "Save Changes" : "Create Log"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WorkoutForm;

