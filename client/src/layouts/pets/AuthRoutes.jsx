import React from "react";
import { Routes, Route } from "react-router-dom";

const Login = React.lazy(() => import("../auth/Login"));
const SignUp = React.lazy(() => import("../auth/SignUp"));
const ForgotPassword = React.lazy(() => import("../auth/ForgotPassword"));
const NotFound = React.lazy(() => import("../NotFound"));

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRoutes;
