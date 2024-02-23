import servicesImages from "./servicesImages";
import classes from "./servicesLandingPage.module.css"; 

const ServicesSection = () => {
  return (
    <section className={classes.services} id="services"> 
      <div className={classes["services-content"]}> 
        <div className={classes["section-title"]}> 
          <h1>Services</h1>
          <span>What we do</span>
        </div>
        <div className={classes["services-content-description"]}> 
          {servicesImages.services.map((data, index) => (
            <div key={index} className={classes.box}>
              <div className={classes.inner}> 
                <img src={data.img} alt={`Service ${index}`} /> 
                <p>{data.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
