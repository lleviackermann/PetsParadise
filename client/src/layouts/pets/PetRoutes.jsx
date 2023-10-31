import { Outlet, Route, Routes } from "react-router-dom";
import Dogs from "./Dogs";
import Cats from "./Cats";
import Birds from "./Birds";
import Fish from "./Fish";
import Products from "./Products";
import Services from "./Services";
import VetCare from "./VetCare";
import PetFood from "./PetFood";
import NotFound from "../NotFound";
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
        <Route path="/petfoods" element={<PetFood />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet></Outlet>
    </div>
  );
}

export default PetRoutes;
