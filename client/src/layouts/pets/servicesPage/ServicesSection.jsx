import servicesImages from "./servicesImages";

const ServicesSection = () => {
    return (
      <section className="services" id="services">
        <div className="services-content">
          <div className="section-title">
            <h1>Services</h1>
            <span>What we do</span>
          </div>
          <div className="services-content-description">
            {(servicesImages.services).map((data,index) => (
              <div key={index} className="box">
              <div className="inner">
                <img src={data.img}  />
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