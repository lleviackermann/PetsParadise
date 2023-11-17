import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProductDetail from "./petStore/Products/ProductDetail";
import Comments from "./petStore/Products/Comments";

const Dogs = React.lazy(() => import("./petStore/Dogs"));
const Cats = React.lazy(() => import("./Cats"));
const Birds = React.lazy(() => import("./Birds"));
const Fish = React.lazy(() => import("./Fish"));
const Products = React.lazy(() => import("./Products"));
const Services = React.lazy(() => import("./Services"));
const VetCare = React.lazy(() => import("./VetCare"));
const PetFood = React.lazy(() => import("./PetFood"));
const NotFound = React.lazy(() => import("../NotFound"));
const PetLandingPage = React.lazy(() =>
  import("../pets/petStore/PetLandingPage")
);

function PetRoutes() {
  const { path } = useRouteMatch();
  // console.log(path);
  return (
    <div>
      <Switch>
        <Route path="/pets/" exact>
          <PetLandingPage />
        </Route>
        <Route path="/pets/dogs/:pnum">
          <Dogs />
        </Route>
        <Route path="/pets/birds">
          <Birds />
        </Route>
        <Route path="/pets/cats">
          <Cats />
        </Route>
        <Route path="/pets/Fish">
          <Fish />
        </Route>
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
