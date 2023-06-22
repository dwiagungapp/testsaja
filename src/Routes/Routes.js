import React from "react";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LayoutComponent from "../components/Layout";
import DashboardComponent from "../components/dashboard/LayoutDashboard";
import { GlobalProvider } from "../context/GlobalContext";
import JobHome from "../components/beranda/JobHome";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import JobDetail from "../components/beranda/JobDetail";
import JobList from "../components/beranda/JobList";
import NotFound from "../components/NotFound";
import ListJob from "../components/dashboard/ListJob";
import Profile from "../components/dashboard/Profile";
import ChangePassword from "../components/dashboard/ChangePassword";
import FormCreateJob from "../components/dashboard/FormCreateJob";

const Pages = () => {
  const LoginRoute = (props) => {
    if (Cookies.get("token") === undefined) {
      return props.children;
    } else {
      return <Navigate to={"/"} />;
    }
  };

  const RegisterRoute = (props) => {
    if (Cookies.get("token") === undefined) {
      return props.children;
    } else {
      return <Navigate to={"/"} />;
    }
  };

  const DashboardRoute = (props) => {
    if (Cookies.get("token") !== undefined) {
      return props.children;
    } else {
      return <Navigate to={"/login"} />;
    }
  };

  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutComponent>
                <JobHome />
              </LayoutComponent>
            }
          />

          <Route
            path="/login"
            element={
              <LoginRoute>
                <LayoutComponent>
                  <Login />
                </LayoutComponent>
              </LoginRoute>
            }
          />

          <Route
            path="/register"
            element={
              <LoginRoute>
              <LayoutComponent>
                <Register />
              </LayoutComponent>
              </LoginRoute>
            }
          />

          <Route
            path="/job-vacancy/:Id"
            element={
              <LayoutComponent>
                <JobDetail />
              </LayoutComponent>
            }
          />

          <Route
            path="/job-vacancy"
            element={
              <LayoutComponent>
                <JobList />
              </LayoutComponent>
            }
          />

          <Route
            path="*"
            element={
              <LayoutComponent>
                <NotFound />
              </LayoutComponent>
            }
          />

          <Route
            path="/dashboard/list-job-vacancy"
            element={
              <DashboardRoute>
                <DashboardComponent>
                  <ListJob />
                </DashboardComponent>
              </DashboardRoute>
            }
          />

          <Route
            path="/dashboard/profile"
            element={
              <DashboardRoute>
                <DashboardComponent>
                  <Profile />
                </DashboardComponent>
              </DashboardRoute>
            }
          />

          <Route
            path="/dashboard/profile/change-password"
            element={
              <DashboardRoute>
                <DashboardComponent>
                  <ChangePassword />
                </DashboardComponent>
              </DashboardRoute>
            }
          />

          <Route
            path="/dashboard/list-job-vacancy/form"
            element={
              <DashboardRoute>
                <DashboardComponent>
                  <FormCreateJob />
                </DashboardComponent>
              </DashboardRoute>
            }
          />

          <Route
            path="/dashboard/list-job-vacancy/edit/:slug"
            element={
              <DashboardRoute>
                <DashboardComponent>
                  <FormCreateJob />
                </DashboardComponent>
              </DashboardRoute>
            }
          />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default Pages;