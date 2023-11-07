import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const Dogs = React.lazy(() => import("./Dogs"));
const Cats = React.lazy(() => import("./Cats"));
const Birds = React.lazy(() => import("./Birds"));
const Fish = React.lazy(() => import("./Fish"));
const Products = React.lazy(() => import("./Products/Products"));
const Services = React.lazy(() => import("./Services"));

const VetCare = React.lazy(() => import("./VetCare/VetCare"));
const PetFood = React.lazy(() => import("./petsFood/PetFood"));

const NotFound = React.lazy(() => import("../NotFound"));

function PetRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/birds" element={<Birds />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/Fish" element={<Fish />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/vetcare" element={<VetCare />} />
        <Route path="/petsFood/petfoods" element={<PetFood />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet></Outlet>
    </div>
  );
}

export default PetRoutes;
