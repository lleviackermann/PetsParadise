import React, { useState } from "react";
import productDetails from "./productsDetails";
import classes from "../petsFood/petfoodLandingPage.module.css";

const ProductSection = () => {
  const [filteredProducts, setFilteredProducts] = useState(productDetails);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const buttonStyle = {
    padding: "10px 15px",
    margin: "5px",
    fontSize: "16px",
    backgroundColor: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const handleButtonClick = (petType) => {
    const petTypeProducts =
      petType === "ALL"
        ? productDetails
        : productDetails.filter((product) => product.petType === petType);

    setFilteredProducts(petTypeProducts);
    setSelectedPetType(petType);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const searchedProducts = productDetails.filter((product) =>
      product.productDetails.Name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredProducts(searchedProducts);
    setSelectedPetType(null);
  };

  return (
    <section id="product1" className="section-p1">
      <div className="wrapper">
        <div className="box">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <i
            className="fa-solid fa
            magnifying-glass"
          ></i>
        </div>
        <div id="buttons">
          <div>
            <button
              style={buttonStyle}
              onClick={() => handleButtonClick("ALL")}
            >
              All
            </button>
            <button
              style={buttonStyle}
              onClick={() => handleButtonClick("dogs")}
            >
              Dogs
            </button>
            <button
              style={buttonStyle}
              onClick={() => handleButtonClick("cats")}
            >
              Cats
            </button>
            <button
              style={buttonStyle}
              onClick={() => handleButtonClick("fishes")}
            >
              Fish
            </button>
            <button
              style={buttonStyle}
              onClick={() => handleButtonClick("birds")}
            >
              Birds
            </button>
          </div>
        </div>
      </div>

      <div className="pro-container">
        {filteredProducts.map((product, index) => (
          <div key={index} className={`pro ${product.petType}`}>
            <img className="imgsrc" src={product.productDetails.src} alt="" />
            <div className="des">
              <span>adidas</span>
              <h5 className="title">{product.productDetails.Name}</h5>
              <div className="star">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <h4 className="rate">
                <i className="fa-solid fa-indian-rupee-sign"></i>
                {product.productDetails.price}
              </h4>
            </div>
            <p className="name" style={{ display: "none" }}>
              {product.productDetails.Name}
            </p>
            <p className="price" style={{ display: "none" }}>
              {product.productDetails.price}
            </p>
            <p className="src" style={{ display: "none" }}>
              {product.productDetails.src}
            </p>
            <p className="type" style={{ display: "none" }}>
              Accessory
            </p>
            <div className={classes.productCart}>
              <button
                // onClick={addToCart.bind(null, item._id)}
                className={classes.btn}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
