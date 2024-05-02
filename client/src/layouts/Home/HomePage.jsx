import React, { useEffect, useState } from "react";
import "./HomePage.css";
import dogSketch from "./dog-sketch.png";
import groupPet from "./group_pet.jpg";
import petGromming from "./petGromming.gif";
import manTrainingDog from "./man-training-dog.gif";
import petSitting from "./petsitting.gif";
import vetCare from "./vet-care.gif";
import petFood from "./pet-food.gif";
import petToys from "./pet-toys.gif";
import birds from "./birds.gif";
import featureBird from "./feature-bird.png";
import featureService from "./feature-service.png";
import featureCare from "./feature-care.png";
import customerService from "./customer-service.png";
import TypingEffect from "./TypingEffect";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useHistory } from "react-router-dom";
import { baseURL } from "../../api/api";

let firstVisit = true;

export default function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [contactUs, setContactUs] = useState({
    name: "",
    email: "",
    message: "",
  });

  // const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(`${baseURL}8000/updatecount`);
        const responseData = await response.json();
        return responseData.views;
      } catch (error) {
        console.error("Error fetching counts:", error);
        return 0;
      }
    };

    const handleFirstVisit = async () => {
      if (firstVisit) {
        firstVisit = false;
        const views = await fetchCounts();
        dispatch(uiActions.updateViews({ views }));
      }
    };

    handleFirstVisit();
  }, [firstVisit, dispatch]);

  // const gettingCsrfToken = async() => {
  //   const response = await fetch("http://localhost:8000/csrf-token", {
  //     method: "GET",
  //   });
  //   const data = await response.json()
  //   setCsrfToken(data.csrfToken);
  // };

  // useEffect(() => {
  //   gettingCsrfToken();
  // }, []);

  const strings = [
    "Dogs",
    "Cats",
    "Birds",
    "Fish",
    "Vet-Care",
    "Services",
    "Accessories",
  ];

  const handleServicesClick = () => {};
  const handleContactUsClick = () => {};
  const goToDogsPage = () => {
    history.push("/pets/dogs");
  };
  const goToCatsPage = () => {
    history.push("/pets/cats");
  };
  const goToServicesPage = () => {
    history.push("/pets/services");
  };
  const goToProductsPage = () => {
    history.push("/pets/products");
  };
  const goToVetCarePage = () => {
    history.push("/pets/vetcare");
  };
  const goToPetsFoodPage = () => {
    history.push("/pets/petfoods");
  };

  const handleContactUsSubmit = async (event) => {
    event.preventDefault();
    // console.log("csrf ", csrfToken);
    const response = await fetch(`${baseURL}sendFeedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contactUs.name,
        email: contactUs.email,
        message: contactUs.message,
      }),
    });
    setContactUs({
      name: "",
      email: "",
      message: "",
    });
  };
  const handleNameChange = (evt) => {
    setContactUs({ ...contactUs, name: evt.target.value });
  };
  const handleEmailChange = (evt) => {
    setContactUs({ ...contactUs, email: evt.target.value });
  };
  const handleMessageChange = (evt) => {
    setContactUs({ ...contactUs, message: evt.target.value });
  };
  return (
    <div className="root_div">
      <header>
        <main>
          <div className="left">
            <div className="heading">
              <h1 className="heading__top">
                PETS<span>Paradise</span>
                <img src={dogSketch} className="dog-sketch" alt="" />
              </h1>
              <br />
              <p className="heading__middle">
                Your One-Stop-Shop for Pets <br />
                and Pet Resources
              </p>
              <br />
              <div className="heading__end">
                We provide you
                <span className="multiText">
                  <TypingEffect
                    words={strings}
                    styles={{
                      color: "",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "90%",
                      height: "80px",
                      fontSize: "30px",
                      padding: "2px",
                      borderRadius: "20px",
                      margin: "5px",
                    }}
                  />
                </span>
              </div>
            </div>
            <div className="button">
              <div className="btn-grad" onClick={handleServicesClick}>
                Services
              </div>
              <div className="normal-btn" onClick={handleContactUsClick}>
                Contact Us
              </div>
            </div>
          </div>
          <div className="right">
            <div className="images">
              <img src={groupPet} alt="" className="group__img" />
            </div>
          </div>
        </main>
      </header>

      <section className="categories__main">
        <p className="categories--heading small">Explore Categories</p>
        <section className="categories__section">
          <div className="container">
            <div onClick={goToDogsPage}>
              <button className="learn-more">
                <span className="circle">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Dogs</span>
              </button>
            </div>
          </div>

          <div className="container">
            <div onClick={goToCatsPage}>
              <button className="learn-more">
                <span className="circle">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Cats</span>
              </button>
            </div>
          </div>

          <div className="container">
            <div onClick={goToServicesPage}>
              <button className="learn-more">
                <span className="circle">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Our Services</span>
              </button>
            </div>
          </div>

          <div className="container">
            <div onClick={goToProductsPage}>
              <button className="learn-more">
                <span className="circle">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Our Products</span>
              </button>
            </div>
          </div>

          <div className="container">
            <a href="#why-choose-us">
              <button className="learn-more">
                <span className="circle">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Why choose us</span>
              </button>
            </a>
          </div>

          <div className="container">
            <a href="#contact-us">
              <button className="learn-more">
                <span className="circle">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Contact us</span>
              </button>
            </a>
          </div>
        </section>
      </section>

      <section className="our__services">
        <p className="services--heading small">Our Services</p>
        <div className="services">
          <div className="services__info">
            <h3>Pet Gromming</h3>
            <h2 className="services__heading">
              Pamper your furry friend with our top-notch pet grooming services.
            </h2>
            <p className="services__details">
              Regular pet grooming not only keeps your furry friend looking and
              smelling great, but it also offers numerous health benefits.
              Grooming can help prevent matting, skin irritations, and
              infections. Additionally, grooming sessions provide an opportunity
              for you to bond with your pet and detect any potential health
              issues early on. Give your pet the gift of good health and hygiene
              with our professional pet grooming services
            </p>
            <div className="services__button" onClick={goToServicesPage}>
              Learn more<span>&rarr;</span>
            </div>
          </div>
          <div className="services__add">
            <img src={petGromming} alt="" className="services__image" />
          </div>
        </div>

        <div className="services">
          <div className="services__add">
            <img src={manTrainingDog} className="services__image" alt="" />
          </div>
          <div className="services__info">
            <h3 className="services__h3">Pet Training</h3>
            <h2 className="services__heading">
              Unlock your pet's full potential with our expert pet training
              services.
            </h2>
            <p className="services__details">
              Pet training is an essential aspect of responsible pet ownership.
              Not only does it help prevent unwanted behaviors, but it also
              creates a stronger bond between you and your furry friend. With
              proper training, your pet can learn obedience, socialization, and
              basic commands, which can help keep them safe and happy in various
              situations.Whether you have a new puppy or an older dog, our
              professional pet trainers can help you achieve your training goals
              and create a harmonious relationship with your pet.
            </p>
            <div onClick={goToServicesPage} className="services__button">
              Learn more&rarr;
            </div>
          </div>
        </div>

        <div className="services">
          <div className="services__info">
            <h3>Pet Sitting</h3>
            <h2 className="services__heading">
              Travel with peace of mind knowing your beloved pet is in the
              loving care of our experienced pet sitters, who treat them like
              family.
            </h2>
            <p className="services__details">
              Regular pet grooming not only keeps your furry friend looking and
              smelling great, but it also offers numerous health benefits.
              Grooming can help prevent matting, skin irritations, and
              infections. Additionally, grooming sessions provide an opportunity
              for you to bond with your pet and detect any potential health
              issues early on. Give your pet the gift of good health and hygiene
              with our professional pet grooming services
            </p>
            <div onClick={goToServicesPage}>
              <button className="services__button" type="submit">
                Learn more<span>&rarr;</span>
              </button>
            </div>
          </div>
          <div className="services__add">
            <img src={petSitting} alt="" className="services__image big" />
          </div>
        </div>

        <div className="services">
          <div className="services__add">
            <img src={vetCare} alt="" className="services__image large" />
          </div>
          <div className="services__info">
            <h3 className="servicex__h3">Vet-Care</h3>
            <h2 className="services__heading">
              Compassionate care and expert medical attention for your furry
              family members, because they deserve nothing but the best.
            </h2>
            <p className="services__details">
              Our veterinary care services offer comprehensive medical care for
              your furry friends. From routine check-ups to advanced diagnostics
              and treatments, our expert veterinarians and staff are dedicated
              to providing the highest level of care for your pets. We
              understand that pets are family, and we treat them with the same
              care and compassion we would want for our own. Whether your pet
              needs a vaccination, surgery, or ongoing medical management, we
              are here to support you and your pet every step of the way. Trust
              us to provide the best possible care for your furry friend.
            </p>
            <div onClick={goToVetCarePage}>
              <button className="services__button" type="submit">
                Learn more&rarr;
              </button>
            </div>
          </div>
        </div>

        <p className="services--heading product--heading small">Our Products</p>
        <div className="services">
          <div className="services__info little-pad-top">
            <h3 className="product-heading">Pet Food</h3>
            <h2 className="services__heading">
              Nourish Your Furry Friend with High-Quality Pet Food
            </h2>
            <p className="services__details">
              Introducing our new line of premium pet food - the perfect choice
              for pets of all kinds! Made with high-quality ingredients and
              formulated by experts in pet nutrition, our pet food provides the
              essential nutrients that your furry, feathered, or finned friends
              need to thrive. Whether you have a dog, cat, bird, or fish, our
              pet food is designed to meet their unique nutritional
              requirements. With real meat, vegetables, and other natural
              ingredients, our pet food is both delicious and nutritious,
              ensuring that your pet stays healthy and happy. Plus, our
              convenient home delivery service means that you never have to
              worry about running out of food. Try our new line of pet food
              today and give your pets the gift of good health!
            </p>
            <div onClick={goToPetsFoodPage}>
              <button className="services__button product-button" type="submit">
                Learn more<span>&rarr;</span>
              </button>
            </div>
          </div>
          <div className="services__add">
            <img src={petFood} alt="" className="services__image big" />
          </div>
        </div>

        <div className="services">
          <div className="services__add">
            <img src={petToys} alt="" className="services__image" />
          </div>
          <div className="services__info little-pad-top">
            <h3 className="product-heading">Pets Toys</h3>
            <h2 className="services__heading">
              Playtime made fun: A guide to the best pet toys for your furry
              friend.
            </h2>
            <p className="services__details">
              Bring joy to your pet's life with our exciting line of pet toys!
              Designed to stimulate your pet's natural instincts, our toys
              provide endless entertainment and mental stimulation. Made with
              high-quality materials and available in a variety of fun shapes
              and sizes, our pet toys are the perfect way to keep your furry
              friend happy and healthy. Order now and discover the joy of
              playtime with your pet!
            </p>
            <div onClick={goToProductsPage}>
              <button className="services__button product-button" type="submit">
                Learn more<span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        <div className="services">
          <div className="services__info">
            <h3 className="product-heading">Cages and Aquariums</h3>
            <h2 className="services__heading">
              Create a cozy home: Shop our range of cages and aquariums for your
              pets.
            </h2>
            <p className="services__details">
              Transform your home into a serene oasis for your feathered and
              finned friends with our range of bird cages and fish aquariums!
              Our bird cages provide a safe and spacious environment for your
              birds to thrive, while our fish aquariums are designed to mimic
              the natural habitats of your fish. Made with high-quality
              materials and available in a variety of sizes and styles, our
              cages and aquariums are the perfect choice for pet owners who want
              to provide their pets with a comfortable and stimulating living
              space. Order now and create an oasis of tranquility for your pets!
            </p>
            <div onClick={goToProductsPage}>
              <button className="services__button product-button" type="submit">
                Learn more<span>&rarr;</span>
              </button>
            </div>
          </div>
          <div className="services__add">
            <img src={birds} alt="" className="services__image big" />
          </div>
        </div>
      </section>

      <section className="choose-us" id="why-choose-us">
        <p className="choose-us-heading1 small">Why Choose Us</p>
        <div className="choose-us-grid">
          <div className="choose-us-cards">
            <img src={featureBird} alt="" />
            <p className="card-heading">Wide variety of pets</p>
            <p className="card-details">
              We offer a range of pets to choose from, including dogs, cats,
              birds, fish.We ensure that all our pets are healthy, well-cared
              for, and ethically sourced from reputable breeders.
            </p>
          </div>

          <div className="choose-us-cards">
            <p className="card-heading">Expertise and Experience</p>
            <p className="card-details">
              Our team of pet care professionals has years of experience in
              handling different types of pets, and we are passionate about
              providing them with the best possible care. Our staff includes
              certified pet groomers, trained pet sitters, and veterinary
              assistants.
            </p>
          </div>

          <div className="choose-us-cards">
            <img src={featureService} alt="" />
            <p className="card-heading">Variety of Services</p>
            <p className="card-details">
              We offer a range of services, including pet grooming, pet sitting,
              dog walking, and pet training. Whether you need someone to take
              care of your pet while you're away or want to improve your pet's
              behavior, we have you covered.
            </p>
          </div>

          <div className="choose-us-cards">
            <img src={featureCare} alt="" />
            <p className="card-heading">Personalized Care</p>
            <p className="card-details">
              We understand that each pet is unique, and we take the time to get
              to know your pet's individual needs and preferences. We customize
              our services to meet your pet's specific requirements, so you can
              rest assured that your furry friend is in good hands.
            </p>
          </div>

          <div className="choose-us-cards">
            <p className="card-heading">Affordable Pricing</p>
            <p className="card-details">
              We believe that quality pet care should be accessible to everyone,
              which is why we offer competitive pricing for our services. We
              also offer discounts for multiple pets and long-term pet care
              packages.
            </p>
          </div>
          <div className="choose-us-cards">
            <img src={customerService} alt="" />
            <p className="card-heading">Exceptional Customer Service</p>
            <p className="card-details">
              At PetParadise, we pride ourselves on providing exceptional
              customer service. We are always available to answer any questions
              you may have, and we go above and beyond to ensure that you and
              your pet are happy with our services.
            </p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact-us">
        <p className="services--heading contact-head small topic-text">
          Feedback Form
        </p>

        <div className="contact-container">
          <div className="content">
            <div className="left-side">
              <div className="address details">
                <i className="fas fa-map-marker-alt contact-icon"></i>
                <div className="topic">Address</div>
                <div className="text-one">Sricity, Chittoor</div>
                <div className="text-two">Andhra Pradesh</div>
              </div>
              <div className="phone details">
                <i className="fas fa-phone-alt contact-icon"></i>
                <div className="topic">Phone</div>
                <div className="text-one">+9112 3456 7890</div>
                <div className="text-two">+9191 3434 5678</div>
              </div>
              <div className="email details">
                <i className="fas fa-envelope contact-icon"></i>
                <div className="topic">Email</div>
                <div className="text-one">petparadise30@gmail.com</div>
                <div className="text-two">info.petParadise@gmail.com</div>
              </div>
            </div>

            <div className="right-side">
              <div className="topic-text">Send us a feedback</div>
              <p>Out team would be very happy to hear from you.</p>

              <form className="contact-form">
                <div className="input-box">
                  <input
                    className="input-name"
                    type="text"
                    pattern="[A-Za-z ]+"
                    placeholder="Enter your name"
                    name="name"
                    title="Please enter a valid name. Names can only contain letters and spaces."
                    onChange={handleNameChange}
                    value={contactUs.name}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    className="input-email"
                    type="email"
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    placeholder="Enter your email"
                    name="email"
                    title="Please enter a valid Email."
                    onChange={handleEmailChange}
                    value={contactUs.email}
                    required
                  />
                </div>
                <div className="input-box message-box">
                  <textarea
                    className="input-message"
                    placeholder="Enter your message"
                    name="message"
                    onChange={handleMessageChange}
                    required
                    value={contactUs.message}
                  ></textarea>
                </div>
                <div className="button">
                  <button
                    className="services__button"
                    onClick={handleContactUsSubmit}
                  >
                    Send<span>&rarr;</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
