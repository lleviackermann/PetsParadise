import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import ProductDetail from "./petStore/Products/ProductDetail";

const Dogs = React.lazy(() => import("./petStore/Dogs"));
const Cats = React.lazy(() => import("./petStore/Cats"));
const Birds = React.lazy(() => import("./petStore/Birds"));
const Fish = React.lazy(() => import("./petStore/Fish"));
const Products = React.lazy(() => import("./Products/Products"));
const Services = React.lazy(() => import("./servicesPage/Services"));

const VetCare = React.lazy(() => import("./VetCare/VetCare"));
const PetFood = React.lazy(() => import("./petsFood/PetFood"));

const NotFound = React.lazy(() => import("../NotFound"));
const PetLandingPage = React.lazy(() =>
  import("../pets/petStore/PetLandingPage")
);

function PetRoutes() {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path="/pets/" exact>
          <PetLandingPage />
        </Route>
        <Route path="/pets/dogs" exact>
          <Redirect to="/pets/dogs/1"></Redirect>
        </Route>
        <Route path="/pets/dogs/1">
          <Dogs />
        </Route>
        <Route path="/pets/cats" exact>
          <Redirect to="/pets/cats/1"></Redirect>
        </Route>
        <Route path="/pets/cats/1">
          <Cats />
        </Route>

        <Route path="/pets/dogs/:pnum">
          <Dogs />
        </Route>
        {/* <Route path="/pets/birds">
          <Birds />
        </Route> */}
        <Route path="/pets/cats">
          <Cats />
        </Route>
        {/* <Route path="/pets/Fish">
          <Fish />
        </Route> */}
        <Route path="/pets/services" exact>
          <Services />
        </Route>
        <Route path="/pets/products" exact>
          <Products />
        </Route>
        <Route path="/pets/vetcare" exact>
          <VetCare />
        </Route>
        <Route path="/pets/petfoods" exact>
          <PetFood />
        </Route>
        <Route path="/pets/products">
          <Products />
        </Route>
        <Route path={`${path}:petId`}>
          <ProductDetail />
        </Route>
        {/* <Route path="*">
          <NotFound />
        </Route> */}
      </Switch>
      {/* <Route path="pets/:petId/comments" exact>
          <Comments />
        </Route> */}
    </div>
  );
}

export default PetRoutes;
