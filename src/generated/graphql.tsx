import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Decimal: { input: any; output: any; }
};

export type CreateExercise = {
  __typename?: 'CreateExercise';
  exercise?: Maybe<ExerciseType>;
};

export type CreateLocation = {
  __typename?: 'CreateLocation';
  location?: Maybe<LocationType>;
};

export type CreateSport = {
  __typename?: 'CreateSport';
  sport?: Maybe<SportType>;
};

export type CreateUser = {
  __typename?: 'CreateUser';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserType>;
};

export type CreateWorkout = {
  __typename?: 'CreateWorkout';
  workout?: Maybe<WorkoutType>;
  workoutDetails?: Maybe<Array<Maybe<WorkoutDetailType>>>;
};

export type CreateWorkoutCategory = {
  __typename?: 'CreateWorkoutCategory';
  workoutCategory?: Maybe<WorkoutCategoryType>;
};

export type CreateWorkoutDetailInputType = {
  calories?: InputMaybe<Scalars['Int']['input']>;
  distance?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  exerciseName?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  reps?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type ExerciseType = {
  __typename?: 'ExerciseType';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  workoutdetailSet: Array<WorkoutDetailType>;
};

export type LocationType = {
  __typename?: 'LocationType';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  workoutSet: Array<WorkoutType>;
};

export type Login = {
  __typename?: 'Login';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createExercise?: Maybe<CreateExercise>;
  createLocation?: Maybe<CreateLocation>;
  createSport?: Maybe<CreateSport>;
  createUser?: Maybe<CreateUser>;
  createWorkout?: Maybe<CreateWorkout>;
  createWorkoutCategory?: Maybe<CreateWorkoutCategory>;
  login?: Maybe<Login>;
  updateWorkout?: Maybe<UpdateWorkout>;
  verifyToken?: Maybe<VerifyToken>;
};


export type MutationCreateExerciseArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateLocationArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateSportArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCreateWorkoutArgs = {
  date: Scalars['Date']['input'];
  duration?: InputMaybe<Scalars['Int']['input']>;
  locationName: Scalars['String']['input'];
  sportName: Scalars['String']['input'];
  workoutCategoryName: Scalars['String']['input'];
  workoutDetailsInput?: InputMaybe<Array<InputMaybe<CreateWorkoutDetailInputType>>>;
};


export type MutationCreateWorkoutCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateWorkoutArgs = {
  date?: InputMaybe<Scalars['Date']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
  sportName?: InputMaybe<Scalars['String']['input']>;
  workoutCategoryName?: InputMaybe<Scalars['String']['input']>;
  workoutDetailsInput?: InputMaybe<Array<InputMaybe<UpdateWorkoutDetailInputType>>>;
  workoutId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  allExercises?: Maybe<Array<Maybe<ExerciseType>>>;
  allLocations?: Maybe<Array<Maybe<LocationType>>>;
  allSports?: Maybe<Array<Maybe<SportType>>>;
  allWorkoutCategories?: Maybe<Array<Maybe<WorkoutCategoryType>>>;
  allWorkoutDetails?: Maybe<Array<Maybe<WorkoutDetailType>>>;
  allWorkouts?: Maybe<WorkoutPaginationType>;
  crossfitAttendanceCount?: Maybe<Scalars['Int']['output']>;
  crossfitAttendanceLastWeekCount?: Maybe<Scalars['Int']['output']>;
  crossfitAttendanceTotalCount?: Maybe<Scalars['Int']['output']>;
  exercise?: Maybe<ExerciseType>;
  location?: Maybe<LocationType>;
  sport?: Maybe<SportType>;
  swimmingAttendanceCount?: Maybe<Scalars['Int']['output']>;
  swimmingAttendanceLastWeekCount?: Maybe<Scalars['Int']['output']>;
  swimmingAttendanceTotalCount?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Array<Maybe<UserType>>>;
  workout?: Maybe<WorkoutType>;
  workoutDetail?: Maybe<WorkoutDetailType>;
  workoutType?: Maybe<WorkoutCategoryType>;
};


export type QueryAllWorkoutsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryExerciseArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLocationArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySportArgs = {
  id: Scalars['Int']['input'];
};


export type QueryWorkoutArgs = {
  id: Scalars['Int']['input'];
};


export type QueryWorkoutDetailArgs = {
  id: Scalars['Int']['input'];
};


export type QueryWorkoutTypeArgs = {
  id: Scalars['Int']['input'];
};

export type SportType = {
  __typename?: 'SportType';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  workoutSet: Array<WorkoutType>;
};

export type UpdateWorkout = {
  __typename?: 'UpdateWorkout';
  workout?: Maybe<WorkoutType>;
  workoutDetails?: Maybe<Array<Maybe<WorkoutDetailType>>>;
};

export type UpdateWorkoutDetailInputType = {
  calories?: InputMaybe<Scalars['Int']['input']>;
  distance?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  exerciseName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  reps?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String']['output'];
};

export type VerifyToken = {
  __typename?: 'VerifyToken';
  isValid?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<UserType>;
};

export type WorkoutCategoryType = {
  __typename?: 'WorkoutCategoryType';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  workoutSet: Array<WorkoutType>;
};

export type WorkoutDetailType = {
  __typename?: 'WorkoutDetailType';
  calories?: Maybe<Scalars['Int']['output']>;
  distance?: Maybe<Scalars['Int']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  exercise: ExerciseType;
  id: Scalars['ID']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  reps?: Maybe<Scalars['Int']['output']>;
  weight?: Maybe<Scalars['Decimal']['output']>;
  workout: WorkoutType;
};

export type WorkoutGroupType = {
  __typename?: 'WorkoutGroupType';
  date?: Maybe<Scalars['Date']['output']>;
  workouts?: Maybe<Array<Maybe<WorkoutType>>>;
};

export type WorkoutPaginationType = {
  __typename?: 'WorkoutPaginationType';
  groupedItems?: Maybe<Array<Maybe<WorkoutGroupType>>>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type WorkoutType = {
  __typename?: 'WorkoutType';
  date: Scalars['Date']['output'];
  details: Array<WorkoutDetailType>;
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  location: LocationType;
  sport: SportType;
  user: UserType;
  workoutCategory: WorkoutCategoryType;
};

export type CreateWorkoutMutationVariables = Exact<{
  date: Scalars['Date']['input'];
  sportName: Scalars['String']['input'];
  workoutCategoryName: Scalars['String']['input'];
  locationName: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['Int']['input']>;
  workoutDetailsInput?: InputMaybe<Array<InputMaybe<CreateWorkoutDetailInputType>> | InputMaybe<CreateWorkoutDetailInputType>>;
}>;


export type CreateWorkoutMutation = { __typename?: 'Mutation', createWorkout?: { __typename?: 'CreateWorkout', workout?: { __typename?: 'WorkoutType', id: string, date: any, duration?: number | null, sport: { __typename?: 'SportType', name: string }, workoutCategory: { __typename?: 'WorkoutCategoryType', name: string }, location: { __typename?: 'LocationType', name: string } } | null, workoutDetails?: Array<{ __typename?: 'WorkoutDetailType', reps?: number | null, weight?: any | null, calories?: number | null, distance?: number | null, duration?: number | null, order?: number | null, exercise: { __typename?: 'ExerciseType', name: string } } | null> | null } | null };

export type UpdateWorkoutMutationVariables = Exact<{
  workoutId: Scalars['ID']['input'];
  date: Scalars['Date']['input'];
  sportName: Scalars['String']['input'];
  locationName: Scalars['String']['input'];
  workoutCategoryName: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['Int']['input']>;
  workoutDetailsInput?: InputMaybe<Array<InputMaybe<UpdateWorkoutDetailInputType>> | InputMaybe<UpdateWorkoutDetailInputType>>;
}>;


export type UpdateWorkoutMutation = { __typename?: 'Mutation', updateWorkout?: { __typename?: 'UpdateWorkout', workout?: { __typename?: 'WorkoutType', id: string, date: any, sport: { __typename?: 'SportType', name: string }, workoutCategory: { __typename?: 'WorkoutCategoryType', name: string }, details: Array<{ __typename?: 'WorkoutDetailType', id: string, reps?: number | null, weight?: any | null, calories?: number | null, distance?: number | null, duration?: number | null, order?: number | null, exercise: { __typename?: 'ExerciseType', name: string } }> } | null } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Login', token?: string | null, user?: { __typename?: 'UserType', username: string, email: string } | null } | null };

export type VerifyTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type VerifyTokenMutation = { __typename?: 'Mutation', verifyToken?: { __typename?: 'VerifyToken', isValid?: boolean | null, user?: { __typename?: 'UserType', id: string, username: string, email: string } | null } | null };

export type GetWorkoutsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetWorkoutsQuery = { __typename?: 'Query', allWorkouts?: { __typename?: 'WorkoutPaginationType', totalCount?: number | null, hasNextPage?: boolean | null, hasPreviousPage?: boolean | null, groupedItems?: Array<{ __typename?: 'WorkoutGroupType', date?: any | null, workouts?: Array<{ __typename?: 'WorkoutType', id: string, date: any, duration?: number | null, user: { __typename?: 'UserType', id: string, username: string, email: string }, sport: { __typename?: 'SportType', name: string }, location: { __typename?: 'LocationType', name: string }, workoutCategory: { __typename?: 'WorkoutCategoryType', name: string }, details: Array<{ __typename?: 'WorkoutDetailType', id: string, reps?: number | null, order?: number | null, calories?: number | null, distance?: number | null, weight?: any | null, duration?: number | null, exercise: { __typename?: 'ExerciseType', name: string } }> } | null> | null } | null> | null } | null };

export type GetWorkoutQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetWorkoutQuery = { __typename?: 'Query', workout?: { __typename?: 'WorkoutType', id: string, date: any, duration?: number | null, user: { __typename?: 'UserType', id: string, username: string, email: string }, sport: { __typename?: 'SportType', name: string }, location: { __typename?: 'LocationType', name: string }, workoutCategory: { __typename?: 'WorkoutCategoryType', name: string }, details: Array<{ __typename?: 'WorkoutDetailType', id: string, reps?: number | null, order?: number | null, calories?: number | null, distance?: number | null, weight?: any | null, duration?: number | null, exercise: { __typename?: 'ExerciseType', name: string } }> } | null };

export type GetLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLocationsQuery = { __typename?: 'Query', allLocations?: Array<{ __typename?: 'LocationType', id: string, name: string } | null> | null };

export type GetExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExercisesQuery = { __typename?: 'Query', allExercises?: Array<{ __typename?: 'ExerciseType', id: string, name: string } | null> | null };

export type GetSportsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSportsQuery = { __typename?: 'Query', allSports?: Array<{ __typename?: 'SportType', id: string, name: string } | null> | null };

export type GetWorkoutCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorkoutCategoriesQuery = { __typename?: 'Query', allWorkoutCategories?: Array<{ __typename?: 'WorkoutCategoryType', id: string, name: string } | null> | null };

export type GetCrossfitCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCrossfitCountQuery = { __typename?: 'Query', crossfitAttendanceCount?: number | null, crossfitAttendanceLastWeekCount?: number | null, crossfitAttendanceTotalCount?: number | null };

export type GetSwimmingCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSwimmingCountQuery = { __typename?: 'Query', swimmingAttendanceCount?: number | null, swimmingAttendanceLastWeekCount?: number | null, swimmingAttendanceTotalCount?: number | null };


export const CreateWorkoutDocument = gql`
    mutation CreateWorkout($date: Date!, $sportName: String!, $workoutCategoryName: String!, $locationName: String!, $duration: Int, $workoutDetailsInput: [CreateWorkoutDetailInputType]) {
  createWorkout(
    date: $date
    sportName: $sportName
    workoutCategoryName: $workoutCategoryName
    locationName: $locationName
    duration: $duration
    workoutDetailsInput: $workoutDetailsInput
  ) {
    workout {
      id
      date
      duration
      sport {
        name
      }
      workoutCategory {
        name
      }
      location {
        name
      }
    }
    workoutDetails {
      exercise {
        name
      }
      reps
      weight
      calories
      distance
      duration
      order
    }
  }
}
    `;
export type CreateWorkoutMutationFn = Apollo.MutationFunction<CreateWorkoutMutation, CreateWorkoutMutationVariables>;
export function useCreateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkoutMutation, CreateWorkoutMutationVariables>(CreateWorkoutDocument, options);
      }
export type CreateWorkoutMutationHookResult = ReturnType<typeof useCreateWorkoutMutation>;
export type CreateWorkoutMutationResult = Apollo.MutationResult<CreateWorkoutMutation>;
export type CreateWorkoutMutationOptions = Apollo.BaseMutationOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>;
export const UpdateWorkoutDocument = gql`
    mutation UpdateWorkout($workoutId: ID!, $date: Date!, $sportName: String!, $locationName: String!, $workoutCategoryName: String!, $duration: Int, $workoutDetailsInput: [UpdateWorkoutDetailInputType]) {
  updateWorkout(
    workoutId: $workoutId
    date: $date
    sportName: $sportName
    locationName: $locationName
    duration: $duration
    workoutCategoryName: $workoutCategoryName
    workoutDetailsInput: $workoutDetailsInput
  ) {
    workout {
      id
      date
      sport {
        name
      }
      workoutCategory {
        name
      }
      details {
        id
        exercise {
          name
        }
        reps
        weight
        calories
        distance
        duration
        order
      }
    }
  }
}
    `;
export type UpdateWorkoutMutationFn = Apollo.MutationFunction<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>;
export function useUpdateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>(UpdateWorkoutDocument, options);
      }
export type UpdateWorkoutMutationHookResult = ReturnType<typeof useUpdateWorkoutMutation>;
export type UpdateWorkoutMutationResult = Apollo.MutationResult<UpdateWorkoutMutation>;
export type UpdateWorkoutMutationOptions = Apollo.BaseMutationOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      username
      email
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const VerifyTokenDocument = gql`
    mutation VerifyToken {
  verifyToken {
    isValid
    user {
      id
      username
      email
    }
  }
}
    `;
export type VerifyTokenMutationFn = Apollo.MutationFunction<VerifyTokenMutation, VerifyTokenMutationVariables>;
export function useVerifyTokenMutation(baseOptions?: Apollo.MutationHookOptions<VerifyTokenMutation, VerifyTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyTokenMutation, VerifyTokenMutationVariables>(VerifyTokenDocument, options);
      }
export type VerifyTokenMutationHookResult = ReturnType<typeof useVerifyTokenMutation>;
export type VerifyTokenMutationResult = Apollo.MutationResult<VerifyTokenMutation>;
export type VerifyTokenMutationOptions = Apollo.BaseMutationOptions<VerifyTokenMutation, VerifyTokenMutationVariables>;
export const GetWorkoutsDocument = gql`
    query GetWorkouts($limit: Int, $offset: Int) {
  allWorkouts(limit: $limit, offset: $offset) {
    totalCount
    hasNextPage
    hasPreviousPage
    groupedItems {
      date
      workouts {
        user {
          id
          username
          email
        }
        id
        date
        duration
        sport {
          name
        }
        location {
          name
        }
        workoutCategory {
          name
        }
        details {
          id
          exercise {
            name
          }
          reps
          order
          calories
          distance
          weight
          duration
        }
      }
    }
  }
}
    `;
export function useGetWorkoutsQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkoutsQuery, GetWorkoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkoutsQuery, GetWorkoutsQueryVariables>(GetWorkoutsDocument, options);
      }
export function useGetWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkoutsQuery, GetWorkoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkoutsQuery, GetWorkoutsQueryVariables>(GetWorkoutsDocument, options);
        }
export function useGetWorkoutsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkoutsQuery, GetWorkoutsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkoutsQuery, GetWorkoutsQueryVariables>(GetWorkoutsDocument, options);
        }
export type GetWorkoutsQueryHookResult = ReturnType<typeof useGetWorkoutsQuery>;
export type GetWorkoutsLazyQueryHookResult = ReturnType<typeof useGetWorkoutsLazyQuery>;
export type GetWorkoutsSuspenseQueryHookResult = ReturnType<typeof useGetWorkoutsSuspenseQuery>;
export type GetWorkoutsQueryResult = Apollo.QueryResult<GetWorkoutsQuery, GetWorkoutsQueryVariables>;
export const GetWorkoutDocument = gql`
    query GetWorkout($id: Int!) {
  workout(id: $id) {
    id
    date
    duration
    user {
      id
      username
      email
    }
    sport {
      name
    }
    location {
      name
    }
    workoutCategory {
      name
    }
    details {
      id
      reps
      order
      calories
      distance
      weight
      duration
      exercise {
        name
      }
    }
  }
}
    `;
export function useGetWorkoutQuery(baseOptions: Apollo.QueryHookOptions<GetWorkoutQuery, GetWorkoutQueryVariables> & ({ variables: GetWorkoutQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkoutQuery, GetWorkoutQueryVariables>(GetWorkoutDocument, options);
      }
export function useGetWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkoutQuery, GetWorkoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkoutQuery, GetWorkoutQueryVariables>(GetWorkoutDocument, options);
        }
export function useGetWorkoutSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkoutQuery, GetWorkoutQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkoutQuery, GetWorkoutQueryVariables>(GetWorkoutDocument, options);
        }
export type GetWorkoutQueryHookResult = ReturnType<typeof useGetWorkoutQuery>;
export type GetWorkoutLazyQueryHookResult = ReturnType<typeof useGetWorkoutLazyQuery>;
export type GetWorkoutSuspenseQueryHookResult = ReturnType<typeof useGetWorkoutSuspenseQuery>;
export type GetWorkoutQueryResult = Apollo.QueryResult<GetWorkoutQuery, GetWorkoutQueryVariables>;
export const GetLocationsDocument = gql`
    query GetLocations {
  allLocations {
    id
    name
  }
}
    `;
export function useGetLocationsQuery(baseOptions?: Apollo.QueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, options);
      }
export function useGetLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, options);
        }
export function useGetLocationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, options);
        }
export type GetLocationsQueryHookResult = ReturnType<typeof useGetLocationsQuery>;
export type GetLocationsLazyQueryHookResult = ReturnType<typeof useGetLocationsLazyQuery>;
export type GetLocationsSuspenseQueryHookResult = ReturnType<typeof useGetLocationsSuspenseQuery>;
export type GetLocationsQueryResult = Apollo.QueryResult<GetLocationsQuery, GetLocationsQueryVariables>;
export const GetExercisesDocument = gql`
    query GetExercises {
  allExercises {
    id
    name
  }
}
    `;
export function useGetExercisesQuery(baseOptions?: Apollo.QueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, options);
      }
export function useGetExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, options);
        }
export function useGetExercisesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, options);
        }
export type GetExercisesQueryHookResult = ReturnType<typeof useGetExercisesQuery>;
export type GetExercisesLazyQueryHookResult = ReturnType<typeof useGetExercisesLazyQuery>;
export type GetExercisesSuspenseQueryHookResult = ReturnType<typeof useGetExercisesSuspenseQuery>;
export type GetExercisesQueryResult = Apollo.QueryResult<GetExercisesQuery, GetExercisesQueryVariables>;
export const GetSportsDocument = gql`
    query GetSports {
  allSports {
    id
    name
  }
}
    `;
export function useGetSportsQuery(baseOptions?: Apollo.QueryHookOptions<GetSportsQuery, GetSportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSportsQuery, GetSportsQueryVariables>(GetSportsDocument, options);
      }
export function useGetSportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSportsQuery, GetSportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSportsQuery, GetSportsQueryVariables>(GetSportsDocument, options);
        }
export function useGetSportsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSportsQuery, GetSportsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSportsQuery, GetSportsQueryVariables>(GetSportsDocument, options);
        }
export type GetSportsQueryHookResult = ReturnType<typeof useGetSportsQuery>;
export type GetSportsLazyQueryHookResult = ReturnType<typeof useGetSportsLazyQuery>;
export type GetSportsSuspenseQueryHookResult = ReturnType<typeof useGetSportsSuspenseQuery>;
export type GetSportsQueryResult = Apollo.QueryResult<GetSportsQuery, GetSportsQueryVariables>;
export const GetWorkoutCategoriesDocument = gql`
    query GetWorkoutCategories {
  allWorkoutCategories {
    id
    name
  }
}
    `;
export function useGetWorkoutCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkoutCategoriesQuery, GetWorkoutCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkoutCategoriesQuery, GetWorkoutCategoriesQueryVariables>(GetWorkoutCategoriesDocument, options);
      }
export function useGetWorkoutCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkoutCategoriesQuery, GetWorkoutCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkoutCategoriesQuery, GetWorkoutCategoriesQueryVariables>(GetWorkoutCategoriesDocument, options);
        }
export function useGetWorkoutCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkoutCategoriesQuery, GetWorkoutCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkoutCategoriesQuery, GetWorkoutCategoriesQueryVariables>(GetWorkoutCategoriesDocument, options);
        }
export type GetWorkoutCategoriesQueryHookResult = ReturnType<typeof useGetWorkoutCategoriesQuery>;
export type GetWorkoutCategoriesLazyQueryHookResult = ReturnType<typeof useGetWorkoutCategoriesLazyQuery>;
export type GetWorkoutCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetWorkoutCategoriesSuspenseQuery>;
export type GetWorkoutCategoriesQueryResult = Apollo.QueryResult<GetWorkoutCategoriesQuery, GetWorkoutCategoriesQueryVariables>;
export const GetCrossfitCountDocument = gql`
    query GetCrossfitCount {
  crossfitAttendanceCount
  crossfitAttendanceLastWeekCount
  crossfitAttendanceTotalCount
}
    `;
export function useGetCrossfitCountQuery(baseOptions?: Apollo.QueryHookOptions<GetCrossfitCountQuery, GetCrossfitCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCrossfitCountQuery, GetCrossfitCountQueryVariables>(GetCrossfitCountDocument, options);
      }
export function useGetCrossfitCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCrossfitCountQuery, GetCrossfitCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCrossfitCountQuery, GetCrossfitCountQueryVariables>(GetCrossfitCountDocument, options);
        }
export function useGetCrossfitCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCrossfitCountQuery, GetCrossfitCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCrossfitCountQuery, GetCrossfitCountQueryVariables>(GetCrossfitCountDocument, options);
        }
export type GetCrossfitCountQueryHookResult = ReturnType<typeof useGetCrossfitCountQuery>;
export type GetCrossfitCountLazyQueryHookResult = ReturnType<typeof useGetCrossfitCountLazyQuery>;
export type GetCrossfitCountSuspenseQueryHookResult = ReturnType<typeof useGetCrossfitCountSuspenseQuery>;
export type GetCrossfitCountQueryResult = Apollo.QueryResult<GetCrossfitCountQuery, GetCrossfitCountQueryVariables>;
export const GetSwimmingCountDocument = gql`
    query GetSwimmingCount {
  swimmingAttendanceCount
  swimmingAttendanceLastWeekCount
  swimmingAttendanceTotalCount
}
    `;
export function useGetSwimmingCountQuery(baseOptions?: Apollo.QueryHookOptions<GetSwimmingCountQuery, GetSwimmingCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSwimmingCountQuery, GetSwimmingCountQueryVariables>(GetSwimmingCountDocument, options);
      }
export function useGetSwimmingCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSwimmingCountQuery, GetSwimmingCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSwimmingCountQuery, GetSwimmingCountQueryVariables>(GetSwimmingCountDocument, options);
        }
export function useGetSwimmingCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSwimmingCountQuery, GetSwimmingCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSwimmingCountQuery, GetSwimmingCountQueryVariables>(GetSwimmingCountDocument, options);
        }
export type GetSwimmingCountQueryHookResult = ReturnType<typeof useGetSwimmingCountQuery>;
export type GetSwimmingCountLazyQueryHookResult = ReturnType<typeof useGetSwimmingCountLazyQuery>;
export type GetSwimmingCountSuspenseQueryHookResult = ReturnType<typeof useGetSwimmingCountSuspenseQuery>;
export type GetSwimmingCountQueryResult = Apollo.QueryResult<GetSwimmingCountQuery, GetSwimmingCountQueryVariables>;