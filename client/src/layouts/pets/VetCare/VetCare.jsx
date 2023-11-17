// import React from "react";
import './vetcare.css';
import {doctors} from "./ourDoctors"
const VetCare = () => {
  return (
    <div className="vetcare">
    {/* <div className="background-content">
                <h1>provide an exceptional patient experience</h1>
                <p>To ensure that the animals receive the best and most appropriate care, we will have an in-house team
                    of expert, passionate and ethical veterinary doctors from different faculties
                    . This will help in timely diagnosis, effective treatment and speedy recovery of the animals.
                </p>
                <a href="#">Read more</a>
            </div> */}
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
            <img src="../../img/vetcareLandingPage/chiness.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div className="our-services" id="ser">
      <div className="service-content">
        <div className="left-service-content">
          <h1>Our special services</h1>
          <p>
            We will have an exclusive diagnostic center to provide immediate diagnostic services. We will add advanced diagnostic tools such as X-ray, ultrasound, blood analyzer, laparoscopy, kidney dialysis unit among others in a phased manner. Our mission is to serve more animals and improve their quality of life in a timely and cost-effective manner.
          </p>
        </div>

        <div className="right-service-content">
          <div className="right-btn">
            <a href="#">See all services</a>
          </div>
        </div>
      </div>

      <div className="main-services">
        <div className="inner-services-content">
          <div className="service-icon">
            <i className="fas fa-notes-medical"></i>
          </div>
          <h2>X-Rays</h2>
          <p>
            X-rays can help our vets to get a view of your pets bones, tissues, and internal organs so that they can diagnose issues such as broken bones, bladder stones, swallowed foreign objects, and more.
          </p>
        </div>

        <div className="inner-services-content">
          <div className="service-icon">
            <i className="fas fa-hospital-user"></i>
          </div>
          <h2>Ultrasound Examination</h2>
          <p>
            An ultrasound examination, also known as ultrasonography, is a non-invasive imaging technique that allows internal body structures to be seen by recording echoes or reflections of ultrasonic waves.
          </p>
        </div>

        <div className="inner-services-content">
          <div className="service-icon">
            <i className="fas fa-user-md"></i>
          </div>
          <h2>Laparoscopy</h2>
          <p>
            Laparoscopic procedures are usually performed by placement of surgical instruments through cannulae, which are small plastic or metal tubes. Cannulae are placed through small 0.5-1cm incisions in the skin.
          </p>
        </div>
      </div>
    </div>

    <div className="gallery" id="gallery">
      <h1>Gallery</h1>
      <div className="main-gallery">
        <div className="inner-gallery">
          <img src="./images/gal1.jpg" alt="" />
        </div>

        <div className="inner-gallery">
          <img src="../../img/vetcareLandingPage/gal2.jpg" alt="" />
        </div>

        <div className="inner-gallery">
          <img src="../../img/vetcareLandingPage/gal3.jpg" alt="" />
        </div>

        <div className="inner-gallery">
          <img src="../../img/vetcareLandingPage/gal4.jpg" alt="" />
        </div>

        <div className="inner-gallery">
          <img src="../../img/vetcareLandingPage/gal5.jpg" alt="" />
        </div>

        <div className="inner-gallery">
          <img src="../../img/vetcareLandingPage/gal6.jpg" alt="" />
        </div>
      </div>
    </div>

    <div className="why-choseus">
      <div className="main-chose">
        <div className="inner-chose">
          <img src="../../img/vetcareLandingPage/cute.jpg" alt="" />
        </div>

        <div className="inner-chose">
          <h1>Why Choose Us</h1>

          <div className="inner-chose-content">
            <div className="main-inner-chose">
              <div className="chose-icon">
                <i className="fas fa-notes-medical"></i>
              </div>
              <div className="icon-content">
                <p>
                  We are first and foremost a team of animal lovers, who happen to also possess extraordinary skills in veterinary medicine. As a hospital accredited by the American Animal Hospital Association, we demonstrate our commitment and passion for the highest standards of veterinary medicine.
                </p>
              </div>
            </div>

            <div className="main-inner-chose">
              <div className="chose-icon">
                <i className="fas fa-hospital-user"></i>
              </div>
              <div className="icon-content">
                <p>
                  Our philosophy has always been to show animals the care, respect, and compassion that they deserve. Every aspect of our practice speaks to their needs, from the decor to the special way we interact with each pet as an individual.
                </p>
              </div>
            </div>

            <div className="main-inner-chose">
              <div className="chose-icon">
                <i className="fas fa-user-md"></i>
              </div>
              <div className="icon-content">
                <p>
                  We are first and foremost a team of animal lovers, who happen to also possess extraordinary skills in veterinary medicine. As a hospital accredited by the American Animal Hospital Association, we demonstrate our commitment and passion for the highest standards of veterinary medicine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="our-doctors">
      <h1>Our special doctors</h1>
      <div className="main-doctor">
        {doctors.map((doctor, index) => (
          <div className="inner-doctor" key={index}>
            <img src={doctor.imgSrc} />
            <div className="content">
              <p>
                {doctor.name}<br />
                {doctor.qualifications}<br />
                {doctor.experience}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <section className="appointment" id="appointment">
      <div className="appointment-content">
        <div className="section-title">
          <h1 className="app">MAKE An Appointment Here</h1>
          <span>BOOK An Appointment Of Your Choice</span>
        </div>
        <div className="form-content">
          <form action="/vet-care/appointment" method="post">
            <label htmlFor="selpack" className="app-headings">Choose veterinarian<span className="star">*</span>:</label><br />
            <select name="selpack" id="sel-pack">
              <option value="Hemanth">Dr k.Hemanth</option>
              <option value="Ritika">Dr k.Ritika</option>
              <option value="Ramchander">Dr N.Ramchander Rao</option>
              <option value="Abhishek">Dr .Abhishek</option>
            </select>
            <br />
            <label htmlFor="selnum" className="app-headings">Select the number of pets <span className="star">*</span>:</label><br />
            <input type="number" name="selmun" id="sel-num" min="1" value="1" />
            <br />
            <label htmlFor="seldate" className="app-headings">Select a date for your appointment <span className="star">*</span>:</label><br />
            <input type="date" name="seldate" id="sel-date" />
            <br />
            <label htmlFor="seltime" className="app-headings">Select the time of your appointment <span className="star">*</span>:</label><br />
            <input type="time" name="seltime" id="sel-time" />
            <br />
            <button type="submit" className="a-app">BOOK Your appointment</button>
          </form>
        </div>
      </div>
    </section>
    
    </div>
      
  );
};

export default VetCare;
