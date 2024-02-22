import React from "react";
import { Switch, Route } from "react-router-dom";
import UserProfile from "../auth/profile/UserProfile/UserProfile";
import EmployeeProfile from "../auth/profile/EmployeeProfile/EmployeeProfile";
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
  const userInfo = useSelector((state) => state.auth.userInfo);
  let userRole = "User";
  if (userInfo != null) {
    userRole = userInfo.role;
  }

  const ProtectedRoute = ({
    path,
    exact,
    userRole,
    allowedRoles,
    children,
  }) => {
    const isUserAllowed = allowedRoles.includes(userRole);

    return (
      <Route path={path} exact={exact}>
        {isUserAllowed ? (
          children
        ) : userRole === "Admin" ? (
          <Redirect to="/admin/dashboard" />
        ) : (
          <Redirect to="/employee/dashboard" />
        )}
      </Route>
    );
  };

  return (
    <Switch>
      {
        <Route path="/auth/login" exact>
          {userLoggedIn && userRole === "User" && <Redirect to="/" />}
          {userLoggedIn && userRole === "Admin" && (
            <Redirect to="/admin/dashboard" />
          )}
          {!userLoggedIn && <LoginSignUp />}
        </Route>
      }

      {/* <ProtectedRoute
        path="/signup"
        userRole={userRole}
        allowedRoles={["User"]}
      >
        <SignUp />
      </ProtectedRoute> */}

      <Route path="/signup">
        <SignUp />
      </Route>
      {/* <ProtectedRoute
        path="/auth/user/:activepage"
        userRole={userRole}
        allowedRoles={["User"]}
      >
        <RecoilRoot>
          <UserProfile />
        </RecoilRoot>
      </ProtectedRoute> */}

      <Route path="/auth/user/:activepage">
        <RecoilRoot>
          <UserProfile />
        </RecoilRoot>
      </Route>

      {/* <ProtectedRoute
        path="/auth/employee/:activepage"
        userRole={userRole}
        allowedRoles={["Employee"]}
      >
        <RecoilRoot>
          <EmployeeProfile />
        </RecoilRoot>
      </ProtectedRoute> */}

      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="*" exact>
        {userRole === "Admin" && <Redirect to="/admin/dashboard" />}
      </Route>
    </Switch>
  );
}

export default AuthRoutes;
