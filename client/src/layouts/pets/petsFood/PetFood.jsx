import Home from "./Home";
import Features from "./Features";
import Categories from "./Categories";
import Products from "./Products";
import Review from "./Review";
import classes from "./petfoodLandingPage.module.css";
import "./food.css";
import { useSelector } from "react-redux";

const PetFood = () => {
  const views = useSelector((state) => state.ui.views);
  console.log(views);
  return (
    <div className={classes.main}>
      <Home />
      <Features />
      <Categories />
      <Products />
      <Review />
    </div>
  );
};

export default PetFood;
