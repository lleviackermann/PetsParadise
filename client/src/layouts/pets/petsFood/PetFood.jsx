import Home from "./Home";
import Features from "./Features";
import Categories from "./Categories";
import Products from "./Products";
import Review from "./Review";
import classes from "./petfoodLandingPage.module.css";
import styled from "styled-components";
// import "./food.css";
const StyledComponent = styled.div`
  html {
    font-size: 62.5%;
  }
`;

const PetFood = () => {
  return (
    <StyledComponent className={classes.main}>
      <Home />
      <Features />
      <Categories />
      <Products />
      <Review />
    </StyledComponent>
  );
};

export default PetFood;
