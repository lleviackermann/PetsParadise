import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoadingSpinner from "../Ui/LoadingSpinner";

const Home = React.lazy(() => import("../Home/HomePage"));
const PetRoutes = React.lazy(() => import("../pets/PetRoutes"));
const NotFound = React.lazy(() => import("../NotFound"));
const Payment = React.lazy(() => import("../Others/Payment"));
const AuthRoutes = React.lazy(() => import("../pets/AuthRoutes"));

function MainRoutes() {
  return (
    <div>
      <main>
        <Suspense fallback={<LoadingSpinner />}>
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
