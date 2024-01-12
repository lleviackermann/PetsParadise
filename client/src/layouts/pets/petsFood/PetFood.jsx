import Home from "./Home";
import Features from "./Features";
import Categories from "./Categories";
import Products from "./Products";
import Review from "./Review";
import classes from "./petfoodLandingPage.module.css";
import "./food.css";

const PetFood = () => {
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
