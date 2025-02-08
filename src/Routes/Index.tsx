import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { authProtectedRoutes, publicRoutes } from './allRoutes';
import Layout from 'Layout';
import NonAuthLayout from "Layout/NonLayout"
import AuthProtected from './AuthProtected';

const RouteIndex = () => {
  return (
    <React.Fragment>
      <Routes>
        {authProtectedRoutes.map((route: any, idx: number) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <AuthProtected>
                <Layout>
                  <route.component />
                </Layout>
              </AuthProtected>
            }
          />
        ))}
        {publicRoutes.map((route: any, idx: number) => (
          <Route
            path={route.path}
            key={idx}
            element={
              <NonAuthLayout>
                <route.component />
              </NonAuthLayout>
            }
          />
        ))}

        <Route
          path='*'
          element={
            <NonAuthLayout>
              <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="mt-2 text-lg">Sorry, the page you are looking for does not exist.</p>
              </div>
            </NonAuthLayout>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default RouteIndex;
