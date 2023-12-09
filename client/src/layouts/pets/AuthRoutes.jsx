import React from "react";
import { Switch, Route } from "react-router-dom";
import UserProfile from "../auth/profile/UserProfile/UserProfile";
import { RecoilRoot } from "recoil";
import LoginSignUp from "../auth/LoginSignUp";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = React.lazy(() => import("../auth/Login"));
const SignUp = React.lazy(() => import("../auth/SignUp"));
const ForgotPassword = React.lazy(() => import("../auth/ForgotPassword"));
const NotFound = React.lazy(() => import("../NotFound"));

function AuthRoutes() {
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);
  return (
    <Switch>
      <Route path="/auth/login" exact>
        {userLoggedIn && <Redirect to="/" />}
        {!userLoggedIn && <LoginSignUp />}
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/auth/user/:activepage">
        <RecoilRoot>
          <UserProfile />
        </RecoilRoot>
      </Route>
      {/* <Route path="/ForgotPassword" element={<ForgotPassword />} /> */}
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}

export default AuthRoutes;
