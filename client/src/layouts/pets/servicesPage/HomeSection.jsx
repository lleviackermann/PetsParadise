import servicesImages from "./servicesImages";

const HomeSection = () => {
    return (
      <section className="home">
        <div className="container">
          <div className="home-img">
            <img
              src={servicesImages.home.h1}
              id="p1"
              alt="Home Image"
            />
          </div>
  
          <div className="home-content">
            <h1>
              Your big day<br />
              <span>in style</span>
            </h1>
            <p>come give your pet a new look.</p>
            <a href="#package" className="btn btn-outline">
              <i className="fa-solid fa-money-check-dollar"></i>
              Check packages
            </a>
          </div>
        </div>
      </section>
    );
  }

  export default HomeSection;