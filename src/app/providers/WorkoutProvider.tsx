import React, { createContext, ReactNode, useContext, useState } from "react";
import { notification } from "antd";
import {
  useCreateWorkoutMutation,
  useUpdateWorkoutMutation,
  useGetWorkoutsQuery,
  useGetLocationsQuery,
  useGetExercisesQuery,
  useGetSportsQuery,
  useGetCrossfitCountQuery,
  useGetSwimmingCountQuery,
  useGetWorkoutCategoriesQuery,
  WorkoutType,
  GetWorkoutsQuery,
  GetWorkoutQuery,
  useGetWorkoutQuery,
} from "../../generated/graphql";
import dayjs from "dayjs";

export type WorkoutItemsType = NonNullable<
  GetWorkoutsQuery["allWorkouts"]
>["groupedItems"];
export type WorkoutItemType = NonNullable<WorkoutItemsType>[0];

interface WorkoutContextType {
  workouts: GetWorkoutsQuery | null;
  loadingWorkouts: boolean;
  errorWorkouts: any;
  fetchWorkouts: (limit: number, offset: number) => void;
  createWorkout: (values: any) => Promise<void>;
  updateWorkout: (values: any) => Promise<void>;
  selectedWorkout: WorkoutType | null;
  setSelectedWorkout: (workout: WorkoutType | null) => void;
  fetchWorkout: (id: number) => void;
  workout: GetWorkoutQuery | null | undefined; 
  loadingWorkout: boolean;  
  errorWorkout: any;  
  loadingLocations: boolean;
  errorLocations: any;
  locations: any;
  loadingExercises: boolean;
  errorExercises: any;
  exercises: any;
  loadingSports: boolean;
  errorSports: any;
  sports: any;
  loadingCrossfitCount: boolean;
  errorCrossfitCount: any;
  crossfitCount: any;
  loadingSwimmingCount: boolean;
  errorSwimmingCount: any;
  swimmingCount: any;
  loadingCategories: boolean;
  errorCategories: any;
  categories: any;
  loadingCreateWorkout: boolean;
  loadingUpdateWorkout: boolean;
}

const WorkoutContext = createContext<WorkoutContextType>({
  workouts: null,
  loadingWorkouts: false,
  errorWorkouts: null,
  fetchWorkouts: () => {},
  createWorkout: async () => {},
  updateWorkout: async () => {},
  selectedWorkout: null,
  setSelectedWorkout: () => {},
  fetchWorkout: async (id: number) => {},
  workout:null,
  loadingWorkout: false,  
  errorWorkout: null,
  loadingLocations: false,
  errorLocations: null,
  locations: null,
  loadingExercises: false,
  errorExercises: null,
  exercises: null,
  loadingSports: false,
  errorSports: null,
  sports: null,
  loadingCrossfitCount: false,
  errorCrossfitCount: null,
  crossfitCount: null,
  loadingSwimmingCount: false,
  errorSwimmingCount: null,
  swimmingCount: null,
  loadingCategories: false,
  errorCategories: null,
  categories: null,
  loadingCreateWorkout: false,
  loadingUpdateWorkout: false,
});

const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [selectedWorkout, setSelectedWorkout] =
    React.useState<WorkoutType | null>(null);
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(0);
  const {
    data: workoutsData,
    loading: loadingWorkouts,
    error: errorWorkouts,
    refetch: refetchWorkouts,
  } = useGetWorkoutsQuery();


   const {
    data: workoutData,
    loading: loadingWorkout,
    error: errorWorkout,
    refetch: refetchWorkout
  } = useGetWorkoutQuery({
    variables: {id: 0}
  });

  

  const {
    data: locationsData,
    loading: loadingLocations,
    error: errorLocations,
  } = useGetLocationsQuery();

  const {
    data: exercisesData,
    loading: loadingExercises,
    error: errorExercises,
  } = useGetExercisesQuery();

  const {
    data: sportsData,
    loading: loadingSports,
    error: errorSports,
  } = useGetSportsQuery();

  const {
    data: crossfitCountData,
    loading: loadingCrossfitCount,
    error: errorCrossfitCount,
  } = useGetCrossfitCountQuery();

  const {
    data: swimmingCountData,
    loading: loadingSwimmingCount,
    error: errorSwimmingCount,
  } = useGetSwimmingCountQuery();

  const {
    data: workoutCategoriesData,
    loading: loadingWorkoutCategories,
    error: errorWorkoutCategories,
  } = useGetWorkoutCategoriesQuery();

  const fetchWorkouts = (newLimit: number, newOffset: number) => {
    setLimit(newLimit);
    setOffset(newOffset);
    refetchWorkouts({ limit: newLimit, offset: newOffset });
  };

  const fetchWorkout = (id: number) => {
    setLimit(limit);
    setOffset(offset);
    refetchWorkout({ id: id });
  };

  // Mutation hooks with loading state destructuring
  const [createWorkoutMutation, { loading: loadingCreateWorkout }] =
    useCreateWorkoutMutation();
  const [updateWorkoutMutation, { loading: loadingUpdateWorkout }] =
    useUpdateWorkoutMutation();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: "success" | "info" | "warning" | "error",
    message: string,
    description: string
  ) => {
    api[type]({ message, description });
  };

  const createWorkout = async (values: any) => {
    try {
      console.log(values);
      const formattedDate = values.date
        ? dayjs(values.date).format("YYYY-MM-DD")
        : null;
      await createWorkoutMutation({
        variables: {
          date: formattedDate,
          sportName: values.sportName,
          locationName: values.locationName,
          workoutCategoryName: values.workoutCategoryName,
          duration:
            (parseInt(values.durationMinutes, 10) || 0) * 60 +
            (parseInt(values.durationSeconds, 10) || 0),
          workoutDetailsInput: values?.workoutDetailsInput?.map(
            (detail: any) => ({
              exerciseName: detail.exerciseName,
              reps: detail.reps ? parseInt(detail.reps, 10) : undefined,
              weight: detail.weight ? parseInt(detail.weight, 10) : undefined,
              calories: detail.calories
                ? parseInt(detail.calories, 10)
                : undefined,
              distance: detail.distance
                ? parseInt(detail.distance, 10)
                : undefined,
              duration: detail.duration
                ? parseInt(detail.duration, 10)
                : undefined,
            })
          ),
        },
      });
      openNotificationWithIcon(
        "success",
        "Logbook entry created successfully!",
        ""
      );
      fetchWorkouts(limit, offset);
    } catch (error) {
      console.error(error);
      openNotificationWithIcon("error", "Failed to create logbook entry.", "");
    }
  };

  const updateWorkout = async (values: any) => {
    try {
      console.log("Form values:", values);
      const formattedDate = values.date
        ? dayjs(values.date).format("YYYY-MM-DD")
        : null;

      // Attempt the mutation with Apollo Client
      const { data, errors } = await updateWorkoutMutation({
        variables: {
          workoutId: values.workoutId,
          date: formattedDate,
          sportName: values.sportName,
          locationName: values.locationName,
          workoutCategoryName: values.workoutCategoryName,
          duration:
            (parseInt(values.durationMinutes, 10) || 0) * 60 +
            (parseInt(values.durationSeconds, 10) || 0),
          workoutDetailsInput: values?.workoutDetailsInput?.map(
            (detail: any) => ({
              exerciseName: detail.exerciseName,
              reps: detail.reps ? parseInt(detail.reps, 10) : undefined,
              weight: detail.weight ? parseInt(detail.weight, 10) : undefined,
              calories: detail.calories
                ? parseInt(detail.calories, 10)
                : undefined,
              distance: detail.distance
                ? parseInt(detail.distance, 10)
                : undefined,
              duration: detail.duration
                ? parseInt(detail.duration, 10)
                : undefined,
            })
          ),
        },
      });

      // Check for GraphQL errors or invalid response data
      if (errors && errors.length > 0) {
        console.log("GraphQL Errors:", errors);
        throw new Error(errors[0]?.message || "Unknown GraphQL error");
      }

      // If data is valid, handle success
      if (data && data.updateWorkout && data.updateWorkout.workout) {
        console.log("Mutation Data:", data);
        openNotificationWithIcon(
          "success",
          "Logbook entry updated successfully!",
          ""
        );
        fetchWorkouts(limit, offset); // Refetch workouts after successful update
      } else {
        throw new Error(
          "Failed to update logbook entry. Unexpected response data."
        );
      }
    } catch (error: any) {
      // Log the caught error for debugging
      console.log("Caught error:", error);

      // Check if it's a network error
      if (error.networkError) {
        // Check if there are errors in the network error's result
        const networkErrorMessage =
          error.networkError.result?.errors?.[0]?.message;
        if (networkErrorMessage) {
          // If we have a message from the errors array, display it
          openNotificationWithIcon(
            "error",
            "Failed to update logbook entry.",
            networkErrorMessage
          );
        } else {
          // Fallback to a generic network error message
          openNotificationWithIcon(
            "error",
            "Network Error",
            error.networkError.message ||
              "Please check your internet connection."
          );
        }
      }
      // Check for GraphQL-specific errors
      else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        // GraphQL errors contain an array of error objects
        openNotificationWithIcon(
          "error",
          "GraphQL Error",
          error.graphQLErrors[0]?.message ||
            "An unknown GraphQL error occurred."
        );
      }
      // Handle server errors or generic errors
      else if (error.message) {
        // If it's just a message from the ApolloError
        openNotificationWithIcon(
          "error",
          "Failed to update logbook entry.",
          error.message || "An unexpected error occurred."
        );
      } else {
        // Fallback for any unexpected errors
        openNotificationWithIcon(
          "error",
          "Failed to update logbook entry.",
          "An unexpected error occurred."
        );
      }
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts: workoutsData ? workoutsData : null,
        loadingWorkouts,
        errorWorkouts,
        locations: locationsData ? locationsData : null,
        loadingLocations,
        errorLocations: errorLocations ?? null,
        exercises: exercisesData ? exercisesData : null,
        loadingExercises,
        errorExercises: errorExercises ?? null,
        sports: sportsData ? sportsData : null,
        loadingSports,
        errorSports: errorSports ?? null,
        crossfitCount: crossfitCountData ? crossfitCountData : null,
        loadingCrossfitCount,
        errorCrossfitCount: errorCrossfitCount ?? null,
        swimmingCount: swimmingCountData ? swimmingCountData : null,
        loadingSwimmingCount,
        errorSwimmingCount: errorSwimmingCount ?? null,
        categories: workoutCategoriesData ? workoutCategoriesData : null,
        loadingCategories: loadingWorkoutCategories,
        errorCategories: errorWorkoutCategories ?? null,
        fetchWorkouts,
        fetchWorkout,
        loadingWorkout,
        errorWorkout,
        workout:  workoutData ? workoutData : null,
        createWorkout,
        updateWorkout,
        selectedWorkout,
        setSelectedWorkout,
        loadingCreateWorkout,
        loadingUpdateWorkout,
      }}
    >
      {contextHolder}
      {children}
    </WorkoutContext.Provider>
  );
};

const useWorkout = () => useContext(WorkoutContext);

export { WorkoutProvider, useWorkout };
