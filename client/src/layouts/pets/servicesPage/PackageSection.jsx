import servicesImages from "./servicesImages";
import check from '../petsFood/foodservicesLandingPage/checkmark-solid.png'
import cross from "../petsFood/foodservicesLandingPage/x-solid.svg"
import rupee from "../petsFood/foodservicesLandingPage/rupee.png" 

const PackageSection = () => {
    return (
      <section className="package" id="package">
        <div className="section-title">
          <h1>Promotional package</h1>
          <span>for your pet</span>
        </div>
        <div className="package-cards">
          {servicesImages.packages.map((data,index) => (
            <div key={index} className="Pack-card">
            <div className="service-card-title">
              <h1>{data.name}</h1>
            </div>
            <div className="service-card-items">
              {servicesImages.packNames.map((items,itemIndex) => (
                <div key={itemIndex} className="item">
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
  
              <div className="p">
                <p style={{color: 'black'}}>&nbsp;&nbsp;&nbsp;Price : <img src={rupee} width="10px" alt="Rupee"/>&nbsp;{data.price}</p>
              </div>
            </div>
          </div>
          ))}
        </div>
      </section>
    );
  }

  export default PackageSection;