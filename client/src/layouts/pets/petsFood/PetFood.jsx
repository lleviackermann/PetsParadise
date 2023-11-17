import Home from './Home';
import Features from './Features';
import Categories from './Categories';
import Products from './Products';
import Review from './Review';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './petfoodLandingPage.css';

const PetFood = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Features />
      <Categories />
      <Products />
      <Review />
      <Footer />
    </div>
    );
};

export default PetFood;
