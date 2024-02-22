import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import ProductDetail from "./petStore/Products/ProductDetail";
import Shop from "./Products/Pages/Shop";
import ShopCategory from "./Products/Pages/ShopCategory";
import Product from "./Products/Pages/Product";
import  product1 from '../pets/Products/Components/Assets/dog_banner.png'
import product2 from '../pets/Products/Components/Assets/cat_banner.png';
import product3 from '../pets/Products/Components/Assets/bird_banner.png'
import product4 from '../pets/Products/Components/Assets/fish_banner.png'


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
       
{/* Accessories */}
        <Route path='/pets/products' exact>{<Shop/>}</Route> 
        <Route path='/pets/products/dogs'><ShopCategory banner={product1} category="dog"/></Route> 
        <Route path='/pets/products/cats'><ShopCategory banner={product2} category="cat"/></Route>
        <Route path='/pets/products/birds'><ShopCategory banner={product3} category="bird"/></Route>
        <Route path='/pets/products/fishs'><ShopCategory banner={product4} category="fish"/></Route>
        {/* <Route path="/pets/products/product" ><Product/></Route> */}
        <Route path='/pets/product/:productId' ><Product/></Route>

{/* Accessories */}


        {/* <Route path="/pets/products">
          <Products />
        </Route> */}
        {/* <Route path={`${path}:petId`}>
          <ProductDetail />
        </Route> */}
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
