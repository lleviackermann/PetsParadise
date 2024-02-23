import servicesImages from "./servicesImages";
import check from '../petsFood/foodservicesLandingPage/checkmark-solid.png';
import cross from "../petsFood/foodservicesLandingPage/x-solid.svg";
import rupee from "../petsFood/foodservicesLandingPage/rupee.png";
import classes from "./servicesLandingPage.module.css";   

const PackageSection = () => {
  return (
    <section className={classes.package} id="package"> 
      <div className={classes["section-title"]}> 
        <h1>Promotional package</h1>
        <span>for your pet</span>
      </div>
      <div className={classes["package-cards"]}> 
        {servicesImages.packages.map((data, index) => (
          <div key={index} className={classes["Pack-card"]}> 
            <div className={classes["service-card-title"]}> 
              <h1>{data.name}</h1>
            </div>
            <div className={classes["service-card-items"]}> 
              {servicesImages.packNames.map((items, itemIndex) => (
                <div key={itemIndex} className={classes.item}> 
                  <p>
                    {data[items] ? (
                      <img src={check} width="20px" alt="Check" />
                    ) : (
                      <img src={cross} width="15px" alt="Cross" />
                    )}
                    &nbsp;{servicesImages.packItems[itemIndex]}
                  </p>
                </div>
              ))}

              <div className={classes.p}> 
                <p style={{ color: 'black' }}>&nbsp;&nbsp;&nbsp;Price : <img src={rupee} width="10px" alt="Rupee" />&nbsp;{data.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PackageSection;
