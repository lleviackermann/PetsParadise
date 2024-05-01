import React, { useState, useEffect } from "react";
// import productDetails from "./productsDetails";
import classes from "../petsFood/petfoodLandingPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../../store/cart-actions";
import { uiActions } from "../../../store/ui-slice";
import { baseURL } from "../../../api/api";

const ProductSection = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const addToCart = (id) => {
    console.log("token ", token);
    if (token === null) {
      dispatch(
        uiActions.showNotification({
          notification: {
            status: "failure",
            title: "Login to add to cart",
            message: "Login to continue",
          },
        })
      );
      setTimeout(() => {
        dispatch(uiActions.removeNotification());
      }, 3000);
    } else {
      dispatch(addItemToCart(id, token));
    }
  };

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(`${baseURL}accessory`);
        const data = await response.json();
        setFilteredProducts(data);
        setData(data);
      } catch (error) {}
    };
    fetchFoodDetails();
  }, []);

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
        ? data
        : data.filter((product) => product.petType === petType);

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
            <img
              className="imgsrc"
              src={
                "/src/layouts/pets/Products" +
                product.src.substring(
                  product.src.indexOf("../../img") + "../../img".length
                )
              }
              alt=""
            />
            <div className="des">
              <span>adidas</span>
              <h5 className="title">{product.name}</h5>
              <div className="star">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <h4 className="rate">
                <i className="fa-solid fa-indian-rupee-sign"></i>
                {product.price}
              </h4>
            </div>
            <p className="name" style={{ display: "none" }}>
              {product.name}
            </p>
            <p className="price" style={{ display: "none" }}>
              {product.price}
            </p>
            <p className="src" style={{ display: "none" }}>
              {product.src}
            </p>
            <p className="type" style={{ display: "none" }}>
              Accessory
            </p>
            <div className={classes.productCart}>
              <button
                onClick={addToCart.bind(null, product._id)}
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
