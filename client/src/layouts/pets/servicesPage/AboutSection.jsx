import servicesImages from "./servicesImages";
import classes from "./servicesLandingPage.module.css"; 

const AboutSection = () => {
  return (
    <section className={classes.about} id="about"> 
      <div className={classes.container}> 
        <div className={classes["section-title"]}> 
          <h1>Our Story</h1>
          <span>studio hair</span>
        </div>
        <div className={classes["about-detail"]}> 
          <div className={classes["about-detail-content"]}> 
            <div className={classes["about-img"]}> 
              <img
                src={servicesImages.about.a1}
                alt="About Image"
              />
            </div>
            <div className={classes["about-description"]}> 
              <p>
                We are dedicated to giving you the best service with a focus on customer support and best grooming. Founded in 2023 with the objective to become a one-stop solution for pet grooming. We do provide home service, so pet parents can see everything in front of their eyes. We bring the product with us, use your place for grooming, and after the service, we clean the area. We provide quick responses to calls and emails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
