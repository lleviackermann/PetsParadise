import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import classes from "./Dropdown.module.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-about">
            <h6>About Us</h6>
            <p className="text-justify">
              At PetsParadise, we're committed to providing pet owners with a
              complete range of tools and resources to help them manage their
              pets' health, wellness, and happiness. Whether you're a first-time
              pet owner or an experienced breeder, our user-friendly platform
              makes it easy to keep track of your pets' medical records,
              appointments, dietary needs, and more.
            </p>
          </div>

          <div className="footer-links-section">
            <div className="footer-categories">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li>
                  <a href="/pets/dogs">Dogs</a>
                </li>
                <li>
                  <a href="/cats">Cats</a>
                </li>
              </ul>
            </div>

            <div className="footer-quick-links">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <Link to="/" className={classes.navLinks}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/pets/vetCare" className={classes.navLinks}>
                    vet Care
                  </Link>
                </li>
                <li>
                  <Link to="/pets/petfoods" className={classes.navLinks}>
                    Food
                  </Link>
                </li>
                <li>
                  <Link to="/pets/services" className={classes.navLinks}>
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/pets/products" className={classes.navLinks}>
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="footer-container">
        <div className="footer-down-row">
          <div className="footer-copyright-class">
            <p className="footer-copyright-text">
              Copyright &copy; 2017 All Rights Reserved by{" "}
              <a href="#">Group 7</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
