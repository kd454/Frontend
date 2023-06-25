import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import Footer from "./components/Footer/Footer";
import Home from "./containers/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherRegistration from "./containers/TeacherRegistration/TeacherRegistration";
import Search from "./containers/Search/Search";
import Login from "./containers/Login/Login";
import BatchDetail from "./containers/BatchDetail/BatchDetail";
import PageNotFound from "./containers/404Page/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteForAlreadyLogin from "./components/PrivateRouteForAlreadyLogin";
import TeacherProfile from "./containers/TeacherProfile/TeacherProfile";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/teacher/register"
          element={
            <PrivateRouteForAlreadyLogin>
              <TeacherRegistration />
            </PrivateRouteForAlreadyLogin>
          }
        />
        <Route
          path="/teacher/batchdetail"
          element={
            <PrivateRouteForAlreadyLogin>
              <BatchDetail />
            </PrivateRouteForAlreadyLogin>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route
          path="/teacher/profile"
          element={
            <PrivateRoute>
              <TeacherProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/login"
          element={
            <PrivateRouteForAlreadyLogin>
              <Login />
            </PrivateRouteForAlreadyLogin>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
