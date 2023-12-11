import { useState, useEffect } from "react";
import foodDetails from "./foodImages";
import images from "./foodservicesLandingPage/images";
import { BsCurrencyRupee } from "react-icons/bs";
import classes from "./petfoodLandingPage.module.css";

function Products() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchFoodDetails = async () => {
      const response = await fetch("http://localhost:8000/food");
      const data = await response.json();
      setFilteredProducts(data);
      setData(data);
    };
    fetchFoodDetails();
  }, []);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleButtonClick = (petType) => {
    const petTypeProducts =
      petType === "ALL"
        ? data
        : data.filter((product) => {
            console.log(product.petType);
            return product.petType === petType;
          });

    setFilteredProducts(petTypeProducts);
    setSelectedPetType(petType);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const searchedProducts = data.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredProducts(searchedProducts);
    setSelectedPetType(null);
  };

  return (
    <section className={`${classes.products} ${classes.section}`} id="products">
      <h1 className={classes.heading}>
        our <span>products</span>
      </h1>
      <div className={classes.wrapper}>
        <div id="search-container">
          <input
            type="text"
            id="search-input"
            placeholder="Search for items"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div id="buttons">
          {images.buttons.map((b, index) => (
            <a
              key={index}
              href="#products"
              className={classes.buttonValue}
              value={b.value}
              onClick={() => handleButtonClick(b.desc)}
            >
              {b.desc}
            </a>
          ))}
        </div>
      </div>
      <div className={classes.productContent}>
        {filteredProducts.map((item, index) => {
          console.log(item);
          return (
            <div key={index} className={`${item.petType} ${classes.items}`}>
              <img
                className={classes.imgsrc}
                src={
                  "/src/layouts/pets/petsFood" +
                  item.src.substring(
                    item.src.indexOf("../../img") + "../../img".length
                  )
                }
                style={{ width: "200px" }}
              />
              <div className={classes.des}>
                <h3 className={classes.title}>{item.name}</h3>
                <div className={classes.prices} style={{ fontSize: "1.5rem" }}>
                  <BsCurrencyRupee />
                  {item.price}
                </div>
              </div>
              <div className={classes.productCart}>
                <a className={classes.btn}>Add to cart</a>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.viewMore}>
        <center>
          <button
            href="#products"
            className={`${classes.btn} ${classes.viewbtn}`}
          >
            View more
          </button>
        </center>
      </div>
    </section>
  );
}

export default Products;
