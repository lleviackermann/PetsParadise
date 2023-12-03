import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginSignUp from "../auth/LoginSignUp";

const Login = React.lazy(() => import("../auth/Login"));
const SignUp = React.lazy(() => import("../auth/SignUp"));
const ForgotPassword = React.lazy(() => import("../auth/ForgotPassword"));
const NotFound = React.lazy(() => import("../NotFound"));

function AuthRoutes() {
  return (
    <Switch>
      <Route path="/auth/login" exact>
        <LoginSignUp />
      </Route>
      {/* <Route path="/signup" element={<SignUp />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} /> */}
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default AuthRoutes;
