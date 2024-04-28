import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoadingSpinner from "../Ui/LoadingSpinner";
import { useSelector } from "react-redux";
import EmployeeProfile from "../auth/profile/EmployeeProfile/EmployeeProfile";

const Home = React.lazy(() => import("../Home/HomePage"));
const PetRoutes = React.lazy(() => import("../pets/PetRoutes"));
const NotFound = React.lazy(() => import("../NotFound"));
const Payment = React.lazy(() => import("../Others/Payment"));
const AuthRoutes = React.lazy(() => import("../pets/AuthRoutes"));
import { RecoilRoot } from "recoil";

const AdminRoutes = React.lazy(() =>
  import("../../Admin/AdminRoutes/AdminRoutes")
);
const Dashboard = React.lazy(() => import("../../Admin/Layouts/Dashboard"));
function MainRoutes() {
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
        ) : userRole === "Employee" || userRole === "Manager" ? (
          <Redirect to="/auth/employee/accountsettings" />
        ) : (
          <Redirect to="/" />
        )}
      </Route>
    );
  };
  return (
    <div>
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <ProtectedRoute
              path="/"
              exact
              userRole={userRole}
              allowedRoles={["User"]}
            >
              <Home />
            </ProtectedRoute>

            {/* <Route path="/" exact>
              <Home />
            </Route> */}

            <ProtectedRoute
              path="/admin/*"
              exact
              userRole={userRole}
              allowedRoles={["Admin"]}
            >
              <AdminRoutes />
            </ProtectedRoute>

            <ProtectedRoute
              path="/auth/employee/:activepage"
              userRole={userRole}
              allowedRoles={["Employee", "Manager"]}
            >
              <RecoilRoot>
                <EmployeeProfile />
              </RecoilRoot>
            </ProtectedRoute>

            {/* <Route path="/auth/employee/:activepage">
              <RecoilRoot>
                <EmployeeProfile />
              </RecoilRoot>
            </Route> */}

            <ProtectedRoute
              path="/auth/*"
              exact
              userRole={userRole}
              allowedRoles={["User"]}
            >
              <AuthRoutes />
            </ProtectedRoute>

            {/* <Route path="/auth/*" exact>
              <AuthRoutes />
            </Route> */}
            <ProtectedRoute
              path="/pets/"
              userRole={userRole}
              allowedRoles={["User"]}
            >
              <PetRoutes />
            </ProtectedRoute>

            {/* <Route path="/pets/">
              <PetRoutes />
            </Route> */}
            {/* <Route path="/user/payment">
              <Payment />
            </Route> */}
            <Route path="*" exact>
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}

export default MainRoutes;
