import chiness from "./images/chiness.jpg"
const About =()=>{

    return(
        <div className="about" id="about">
      <div className="main-about">
        <div className="inner-about">
          <div className="about-content">
            <h1>about us</h1>
            <p>We aim to provide world-class medical services and facilities to pet owners and stray and abandoned animals. This would include timely examinations and treatment, surgical interventions, nutritional consultancy, isolation wards for infectious diseases and hospitalization wards for primary rehabilitation of animals.</p>
            <a href="#">Read more</a>
          </div>
        </div>
        <div className="inner-about">
          <div className="inner-about-image">
            <img src={chiness} alt="" />
          </div>
        </div>
      </div>
    </div>
    );
}
export default About;