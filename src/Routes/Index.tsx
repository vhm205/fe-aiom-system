import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import Layout from "Layout";
import NonAuthLayout from "Layout/NonLayout";
import AuthProtected from "./AuthProtected";
import { Home } from "lucide-react";

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
          path="*"
          element={
            <NonAuthLayout>
              <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-5xl font-bold mb-4">
                  404 - Không tìm thấy trang
                </h1>
                <p className="mt-2 text-lg">
                  Sorry, the page you are looking for does not exist.
                </p>
                <Link
                  to="/products"
                  className="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20 mt-5"
                >
                  <Home className="inline-block size-3 ltr:mr-1 rtl:ml-1"></Home>{" "}
                  <span className="align-middle">Về trang chủ</span>
                </Link>
              </div>
            </NonAuthLayout>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default RouteIndex;
