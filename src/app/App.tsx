import React, { FC } from 'react';
import Routes from './routes/routes';
import { AuthProvider } from './providers/AuthProvider';
import { LibraryProvider } from './providers/LibraryProvider';
import "../core/styles/antd/index.scss"
import CustomLayout from './components/CustomLayout';
import { ApolloProvider } from "@apollo/client";
import client from '../core/utils/apollo';
import { WorkoutProvider } from './providers/WorkoutProvider';


export default (() => {
  return (
    <ApolloProvider client={client}>
      <CustomLayout>
        <AuthProvider>
          <WorkoutProvider>
            <Routes></Routes>
          </WorkoutProvider>
        </AuthProvider>
      </CustomLayout>
    </ApolloProvider>
  );
}) as FC


