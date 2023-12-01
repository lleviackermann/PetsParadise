import servicesImages from "./servicesImages";

const AboutSection = () => {
    return (
      <section className="about" id="about">
        <div className="container">
          <div className="section-title">
            <h1>Our Story</h1>
            <span>studio hair</span>
          </div>
          <div className="about-detail">
            <div className="about-detail-content">
              <div className="about-img">
                <img
                  src={servicesImages.about.a1}
                  alt="About Image"
                />
              </div>
              <div className="about-description">
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