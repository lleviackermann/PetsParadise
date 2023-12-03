import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dogs from "../pets/petStore/Dogs";
const Home = React.lazy(() => import("../Home"));
const PetRoutes = React.lazy(() => import("../pets/PetRoutes"));
const NotFound = React.lazy(() => import("../NotFound"));
const Payment = React.lazy(() => import("../Others/Payment"));
const AuthRoutes = React.lazy(() => import("../pets/AuthRoutes"));

function MainRoutes() {
  return (
    <div>
      <main>
        <Suspense
          fallback={
            <div className="centered">
              <h1>Loading..</h1>
            </div>
          }
        >
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/auth/*" exact>
              <AuthRoutes />
            </Route>
            <Route path="/pets/">
              <PetRoutes />
            </Route>
            <Route path="/user/payment">
              <Payment />
            </Route>
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
