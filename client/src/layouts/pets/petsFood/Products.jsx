import { useState, useEffect } from "react";
import foodDetails from "./foodImages";
import images from "./foodservicesLandingPage/images";
import { BsCurrencyRupee } from "react-icons/bs";

function Products() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchFoodDetails = async () => {
      const response = await fetch("http://localhost:8000/food");
      const data = await response.json();
      console.log(
        "/src/layouts/pets/petsFood",
        data[0].src.substring(
          data[0].src.indexOf("../../img") + "../../img".length
        ),
        foodDetails[0].productDetails.src
        // data[0].src
      );
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

    const searchedProducts = foodDetails.filter((product) =>
      product.productDetails.Name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredProducts(searchedProducts);
    setSelectedPetType(null);
  };

  return (
    <section className="products" id="products">
      <h1 className="heading">
        our <span>products</span>
      </h1>
      <div className="wrapper">
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
              className="button-value"
              value={b.value}
              onClick={() => handleButtonClick(b.desc)}
            >
              {b.desc}
            </a>
          ))}
        </div>
      </div>
      <div className="product-content">
        {filteredProducts.map((item, index) => (
          <div key={index} className={`${item.petType} items`}>
            <img
              className="imgsrc"
              src={
                "/src/layouts/pets/petsFood" +
                item.src.substring(
                  item.src.indexOf("../../img") + "../../img".length
                )
              }
              style={{ width: "200px" }}
            />
            <div className="des">
              <h3 className="title">{item.name}</h3>
              <div className="prices" style={{ fontSize: "1.5rem" }}>
                <BsCurrencyRupee />
                {item.price}
              </div>
            </div>
            <div className="product-cart">
              <a className="btn">Add to cart</a>
            </div>
          </div>
        ))}
      </div>
      <div className="view-more">
        <center>
          <button href="#products" className="btn viewbtn">
            View more
          </button>
        </center>
      </div>
    </section>
  );
}

export default Products;
