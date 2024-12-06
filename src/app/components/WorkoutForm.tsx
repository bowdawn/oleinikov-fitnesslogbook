import React from "react";
import {
  Form,
  DatePicker,
  AutoComplete,
  Input,
  Button,
  Space,
  Checkbox,
  Divider,
  Row,
  Col,
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
import CustomSpace from "./CustomSpace";
import Title from "antd/es/typography/Title";
import CustomDivider from "./CustomDivider";
import CustomTitle from "./CustomTitle";
import CustomRow from "./CustomRow";

interface WorkoutFormProps {
  selectedWorkout?: GetWorkoutQuery["workout"];
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ selectedWorkout }) => {
  const {
    exercises,
    locations,
    sports,
    categories,
    createWorkout,
    updateWorkout,
  } = useWorkout();
  const [form] = Form.useForm();
  const handleModalOk = async (values: any) => {
    if (selectedWorkout) {
      await updateWorkout({
        workoutId: selectedWorkout?.id,
        ...values,
      });
    } else {
      await createWorkout(values);
    }
  };

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
      <CustomTitle level={4} marginless>Presets</CustomTitle>
      <CustomDivider verticalMargin={8} />
     
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
              workoutDetailsInput: [],
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
              durationMinutes: undefined,
              workoutDetailsInput: [],
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
              durationMinutes: undefined,
              workoutDetailsInput: [
                {
                  exerciseName: "Biking",
                  distance: "13000",
                },
              ],
            });
          }}
          style={{ marginBottom: "16px" }}
        >
          Biking
        </Button>
      </Space>

      <CustomTitle level={4} marginless>Workout Info</CustomTitle>
      <CustomDivider verticalMargin={8} />
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
          <Input  placeholder="Select sport"/>
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
          <Input placeholder="Select placeholder" />
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
          <Input placeholder="Select Category"/>
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
        <CustomTitle level={4} marginless>Details</CustomTitle>
        <CustomDivider verticalMargin={8} />
        <Form.List name="workoutDetailsInput">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div key={key}>
                  <CustomRow gutter={8} noWrap>
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, "selected"]}
                        valuePropName="checked"
                      >
                        <Checkbox />
                      </Form.Item>
                    </Col>
                    <Col flex={1} >
                      <CustomSpace direction="vertical" size={0} block >
                        <Form.Item {...restField} name={[name, "exerciseName"]} style={{marginBottom: 8}} >
                          <AutoComplete
                            popupClassName="custom-autocomplete"
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
                        <Form.Item name={[name, "reps"]} style={{marginBottom: 8}}>
                          <Input placeholder="Reps" />
                        </Form.Item>
                        <Form.Item name={[name, "weight"]} style={{marginBottom: 8}}>
                          <Input placeholder="Weight" />
                        </Form.Item>
                        <Form.Item name={[name, "calories"]} style={{marginBottom: 8}}>
                          <Input placeholder="Calories" />
                        </Form.Item>
                        <Form.Item name={[name, "distance"]} style={{marginBottom: 0}}>
                          <Input placeholder="Distance" />
                        </Form.Item>
                      </CustomSpace>
                    </Col>
                    <Col>
                      <Space
                        direction="vertical"
                        style={{
                          border: "1px solid #d9d9d9",
                          borderRadius: "4px",
                          padding: "8px",
                          backgroundColor: "#fafafa",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button type={"link"} size="small">
                            <MinusCircleOutlined
                              onClick={() => remove(name)}
                              style={{
                                color: "#ff4d4f",
                                cursor: "pointer",
                                fontSize: "16px",
                              }}
                            />
                          </Button>
                          <Button type={"link"} size="small">
                            <CopyOutlined
                              onClick={() => {
                                const currentValues = form.getFieldValue([
                                  "workoutDetailsInput",
                                  name,
                                ]);
                                add(currentValues);
                              }}
                              style={{
                                color: "#1890ff",
                                cursor: "pointer",
                                fontSize: "16px",
                              }}
                            />
                          </Button>
                        </div>
                        <Divider style={{ margin: "8px 0" }} />
                        <Button
                          type="link"
                          size="small"
                          onClick={() => add({}, index)}
                          icon={<PlusOutlined />}
                          style={{
                            color: "#52c41a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Insert Before
                        </Button>
                        <Button
                          type="link"
                          onClick={() => add({}, index + 1)}
                          icon={<PlusOutlined />}
                          size="small"
                          style={{
                            color: "#52c41a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Insert After
                        </Button>
                      </Space>
                    </Col>
                  </CustomRow>
                  <CustomDivider verticalMargin={8} />
                </div>
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
                <Row gutter={[8,8]}>
                  <Col flex={1}>
                  <Input
                    placeholder="Number of times to copy"
                    type="number"
                    min={0}
                    value={form.getFieldValue("copyCount")}
                    onChange={(e) =>
                      form.setFieldsValue({ copyCount: e.target.value })
                    }
                  />
                  </Col>
                  <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      const details = form.getFieldValue("workoutDetailsInput");
                      const selectedDetails = details
                        .filter((detail: any) => detail.selected)
                        .map((detail: any) => ({
                          ...detail,
                          selected: false,
                        }));
                      const copyCount = form.getFieldValue("copyCount") || 1;

                      for (let i = 0; i < copyCount; i++) {
                        selectedDetails.forEach((detail: any) => add(detail));
                      }
                    }}
                  >
                    Copy Selected Fields
                  </Button>
                  </Col>
                </Row>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
      <Row justify={"end"}>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {selectedWorkout ? "Save Changes" : "Create Log"}
        </Button>
      </Form.Item>
      </Row>
    </Form>
  );
};

export default WorkoutForm;
