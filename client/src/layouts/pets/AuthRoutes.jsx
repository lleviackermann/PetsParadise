import React from "react";
import { Switch, Route } from "react-router-dom";
import UserProfile from "../auth/profile/UserProfile/UserProfile";

const Login = React.lazy(() => import("../auth/Login"));
const SignUp = React.lazy(() => import("../auth/SignUp"));
const ForgotPassword = React.lazy(() => import("../auth/ForgotPassword"));
const NotFound = React.lazy(() => import("../NotFound"));

function AuthRoutes() {
  return (
    <Switch>
      <Route path="/login"><Login /></Route> 
      <Route path="/signup"><SignUp /></Route>
      <Route path="/auth/user/"><UserProfile /></Route>
      {/* <Route path="/ForgotPassword" element={<ForgotPassword />} /> */}
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}

export default AuthRoutes;
