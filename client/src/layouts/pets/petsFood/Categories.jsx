import images from "./foodservicesLandingPage/images";
import classes from "./petfoodLandingPage.module.css";

const Categories = () => {
  return (
    <section
      className={`${classes.categories} ${classes.section}`}
      id="categories"
    >
      <h1 className={classes.heading}>
        Product <span>categories</span>
      </h1>
      <div className={classes.boxContainer}>
        <div className={classes.box}>
          <img
            src={images.categories.dogFood6}
            style={{ width: "190px", height: "190px" }}
            alt="Dog Food"
          />
          <h3>Dog food</h3>
          <p>for all breeds</p>
          <a href="#products" className={classes.btn}>
            shop now
          </a>
        </div>
        <div className={classes.box}>
          <img
            src={images.categories.catFood6}
            style={{ width: "190px", height: "190px" }}
            alt="Cat Food"
          />
          <h3>Cat food</h3>
          <p>for all breeds</p>
          <a href="#products" className={classes.btn}>
            shop now
          </a>
        </div>
        <div className={classes.box}>
          <img
            src={images.categories.birdFood5}
            style={{ width: "190px", height: "190px" }}
            alt="Bird Food"
          />
          <h3>Bird food</h3>
          <p>for specific breeds</p>
          <a href="#products" className={classes.btn}>
            shop now
          </a>
        </div>
        <div className={classes.box}>
          <img
            src={images.categories.fishFood5}
            style={{ width: "190px", height: "190px" }}
            alt="Fish Food"
          />
          <h3>Fish food</h3>
          <p>for all breeds</p>
          <a href="#products" className={classes.btn}>
            shop now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Categories;
