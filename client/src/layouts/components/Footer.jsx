import './footer.css'; 

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-about">
            <h6>About Us</h6>
            <p className="text-justify">
              At PetsParadise, we are committed to providing pet owners with a
              complete range of tools and resources to help them manage their pets
              health, wellness, and happiness. Whether you are a first-time pet owner
              or an experienced breeder, our user-friendly platform makes it easy to
              keep track of your pets medical records, appointments, dietary needs,
              and more.
            </p>
          </div>

          <div className="footer-links-section">
            <div className="footer-categories">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li><a href="/dogs">Dogs</a></li>
                <li><a href="/cats">Cats</a></li>
                <li><a href="/birds">Birds</a></li>
                <li><a href="/fish">Fish</a></li>
              </ul>
            </div>

            <div className="footer-quick-links">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/vet-care">Vet-Care</a></li>
                <li><a href="/petsfoods">PetsFoods</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/products">Accessories</a></li>
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
              Copyright &copy; 2017 All Rights Reserved by <a href="#">Group 7</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
