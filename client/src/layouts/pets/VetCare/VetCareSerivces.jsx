const Service =()=>{
    return(
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
    );
}

export default Service;