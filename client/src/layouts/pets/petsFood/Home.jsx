// import React from "react";
import classes from "./petfoodLandingPage.module.css";

const Home = () => {
  return (
    <section className={`${classes.home} ${classes.section}`} id="home">
      <div className={classes.content}>
        <h3>
          healthy and <span>nutritious</span> food for your pets
        </h3>
        <p>
          Take The First Step Towards Keeping Your Pet Healthy And Magnificent
          For Years To Come. Give Him Or Her The Best Start In Life. Discover
          What We Can Do For You. Healthy and Nutritious Food.
        </p>
        <a href="#products" className={classes.btn}>
          Shop now
        </a>
      </div>
    </section>
  );
};

export default Home;
