import servicesImages from "./servicesImages";
import classes from "./servicesLandingPage.module.css"; 

const HomeSection = () => {
  return (
    <section className={classes.home}> 
      <div className={classes.container}>
        <div className={classes["home-img"]}> 
          <img
            src={servicesImages.home.h1}
            id="p1"
            alt="Home Image"
          />
        </div>

        <div className={classes["home-content"]}> 
          <h1>
            Your big day<br />
            <span>in style</span>
          </h1>
          <p>come give your pet a new look.</p>
          <a href="#package" className={`${classes.btn} ${classes["btn-outline"]}`}> 
            <i className="fa-solid fa-money-check-dollar"></i>
            Check packages
          </a>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
