import { Link } from "react-router-dom";
import "./PetLanndingPage.css";
import dogImage from "./dog-image.jpg";
import catImage from "./cat-image.jpg";
function PetLandingPage() {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to Pets Paradise</h1>
        <p>Your Destination for Adorable Pets</p>
      </header>

      <section className="categories">
        <div className="category">
          <Link to="/pets/dogs">
            <img src={dogImage} alt="Dogs" />
            <h2>Dogs</h2>
            <p>Mans best friend. Find your furry companion here.</p>
          </Link>
        </div>

        <div className="category">
          <Link to="/pets/cats">
            <img src={catImage} alt="Cats" />
            <h2>Cats</h2>
            <p>Elegant and independent feline friends are waiting for you.</p>
          </Link>
        </div>

        <div className="category">
          <Link to="/pets/birds">
            <img src="/bird-image.jpg" alt="Birds" />
            <h2>Birds</h2>
            <p>Feathered friends that will brighten your day.</p>
          </Link>
        </div>
      </section>

      <section className="explore-all">
        <Link to="/all-pets">
          <button>Explore All Pets</button>
        </Link>
      </section>
    </div>
  );
}

export default PetLandingPage;
