import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import LogbookPage from "../pages/LogbookPage";
import ViewWorkoutPage from "../pages/ViewWorkoutPage";
import UpdateWorkoutPage from "../pages/UpdateWorkoutPage";
import CreateWorkoutPage from "../pages/CreateWorkoutPage";


export const logbookPath = "/logbook"
export const loginPath = "/login"
export const viewWorkoutPathPrefix = "/view-workout/";
export const viewWorkoutPath = viewWorkoutPathPrefix + ":id";
export const updateWorkoutPathPrefix = "/update-workout/";
export const updateWorkoutPath = updateWorkoutPathPrefix + ":id";
export const createWorkoutPath = "/create-workout";


const router = () => {
  return createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: loginPath,
          element: <LoginPage />,
        },
        {
          path: "/",
          element: <LoginPage />,
        },
        {
          path: logbookPath,
          element: <LogbookPage />,
        },
        {
          path: viewWorkoutPath,
          element: <ViewWorkoutPage />,
        },
        {
          path: updateWorkoutPath,
          element: <UpdateWorkoutPage />,
        },
        {
          path: createWorkoutPath,
          element: <CreateWorkoutPage />,
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
};

export const AppRoutes: React.FC = () => {
  return (
    <RouterProvider router={router()} />
  );
};

export default AppRoutes;
