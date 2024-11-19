
declare module '*/fitnesslogbook.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateWorkout: DocumentNode;
export const UpdateWorkout: DocumentNode;
export const Login: DocumentNode;
export const VerifyToken: DocumentNode;
export const GetWorkouts: DocumentNode;
export const GetWorkout: DocumentNode;
export const GetLocations: DocumentNode;
export const GetExercises: DocumentNode;
export const GetSports: DocumentNode;
export const GetWorkoutCategories: DocumentNode;
export const GetCrossfitCount: DocumentNode;
export const GetSwimmingCount: DocumentNode;

  export default defaultDocument;
}
    