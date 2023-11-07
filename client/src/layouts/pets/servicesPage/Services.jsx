import './servicesLandingPage.css'
import servicesImages from './servicesImages';
import check from '../petsFood/foodservicesLandingPage/checkmark-solid.png'
import cross from "../petsFood/foodservicesLandingPage/x-solid.svg"
import rupee from "../petsFood/foodservicesLandingPage/rupee.png"
import AppointmentSection from './Appointment';

function HomeSection() {
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

function AboutSection() {
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

function ServicesSection() {
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

function PackageSection() {
  return (
    <section className="package" id="package">
      <div className="section-title">
        <h1>Promotional package</h1>
        <span>for your pet</span>
      </div>
      <div className="package-cards">
        {servicesImages.packages.map((data,index) => (
          <div key={index} className="card">
          <div className="card-title">
            <h1>{data.name}</h1>
          </div>
          <div className="card-items">
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

function GallerySection() {
  return (
    <section className="gallery" id="gallery">
      <div className="gallery-content">
        <div className="section-title">
          <h1>Gallery</h1>
          <span>the cutest pets</span>
        </div>
        <div className="gallery-list-img">
          {servicesImages.gallery.map((img,imgIndex) => (
            <div key={imgIndex} className="gallery-img">
              <img src={img} alt="Gallery image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div>
      <HomeSection />
      <AboutSection />
      <ServicesSection />
      <PackageSection />
      <AppointmentSection />
      <GallerySection />
    </div>
  );
}

