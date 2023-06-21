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
    
  const LoginRoute = ({ ...props }) => {
    if (Cookies.get("token") === undefined) {
      return <Route {...props} />;
    } else if (Cookies.get("token") !== undefined) {
      return <Navigate to={"/"} />;
    }
  };

  const DashboardRoute = ({ ...props }) => {
    if (Cookies.get("token") !== undefined) {
      return <Route {...props} />;
    } else if (Cookies.get("token") === undefined) {
      return <Navigate to={"/login"} />;
    }
  };

  return (
    <BrowserRouter>
      <GlobalProvider>
      <Routes>

      <Route path='/' element={
      <LayoutComponent>
        <JobHome />
      </LayoutComponent>
      } />

      <Route path='/login' element={
      <LayoutComponent>
        <Login />
      </LayoutComponent>
      } />

      <Route path='/register' element={
      <LayoutComponent>
        <Register />
      </LayoutComponent>
      } />

      <Route path='/job-vacancy/:Id' element={
      <LayoutComponent>
        <JobDetail />
      </LayoutComponent>
      } />

      <Route path='/job-vacancy' element={
      <LayoutComponent>
        <JobList />
      </LayoutComponent>
      } />

      <Route path='*' element={
      <LayoutComponent>
        <NotFound />
      </LayoutComponent>
      } />

      <Route path='/dashboard/list-job-vacancy' element={
      <DashboardComponent>
        <ListJob />
      </DashboardComponent>
      } />

      <Route path='/dashboard/profile' element={
      <DashboardComponent>
        <Profile />
      </DashboardComponent>
      } />

      <Route path='/dashboard/profile/change-password' element={
      <DashboardComponent>
        <ChangePassword />
      </DashboardComponent>
      } />

      <Route path='/dashboard/list-job-vacancy/form' element={
      <DashboardComponent>
        <FormCreateJob />
      </DashboardComponent>
      } />
      
      <Route path='/dashboard/list-job-vacancy/edit/:slug' element={
      <DashboardComponent>
        <FormCreateJob />
      </DashboardComponent>
      } />


      </Routes>
        {/* <Route path="/job-vacancy/:slug" exact>
          <LayoutComponent content={<JobCard />} />
        </Route>
        <Route path="/search/:valueOfSearch" exact>
          <LayoutComponent content={<SearchSection />} />
        </Route>
        <DashboardRoute path="/dashboard/list-job-vacancy" exact>
          <LayoutComponent content={<JobList />} />
        </DashboardRoute>
        <DashboardRoute path="/dashboard/list-job-vacancy/edit/:slug" exact>
          <LayoutComponent content={<JobForm />} />
        </DashboardRoute>
        <DashboardRoute path="/dashboard/list-job-vacancy/form" exact>
          <LayoutComponent content={<JobForm />} />
        </DashboardRoute>
        <DashboardRoute path="/dashboard/profile" exact>
          <LayoutComponent content={<CardProfile />} />
        </DashboardRoute>
        <DashboardRoute
          path="/dashboard/profile/change-password"
          exact
        >
          <LayoutComponent content={<ChangePassword />} />
        </DashboardRoute>
        <LoginRoute path="/login" exact>
          <LayoutComponent content={<Login />} />
        </LoginRoute>
        <Route path="/register" exact>
          <LayoutComponent content={<Regist />} />
        </Route>
        <Route path="*">
          <LayoutComponent content={<NotFound />} />
        </Route> */}
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default Pages;