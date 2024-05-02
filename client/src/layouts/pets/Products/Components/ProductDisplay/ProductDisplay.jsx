import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../../../../store/cart-actions";
import { uiActions } from "../../../../../store/ui-slice";
import all_product from "../Assets/all_product";

const ProductDisplay = (props) => {
  const { product } = props;
  // const [data, setData] = useState([]);
  // const [selectedPetType, setSelectedPetType] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const addToCart = (id) => {
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
  const productImage = all_product.map((item, index) => {
    const filteredProduct = all_product.find(
      (product) => product.productDetails.name === item.product.name
    );

    console.log("filteredProduct", filteredProduct);

    if (filteredProduct) {
      return filteredProduct.productDetails.src;
    }

    return null;
  });
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img
            src={`/src/layouts/pets/Products/images/${product.src.replace(
              "../../img/images",
              ""
            )}`}
            alt=""
          />
          <img
            src={`/src/layouts/pets/Products/images/${product.src.replace(
              "../../img/images",
              ""
            )}`}
            alt=""
          />
          <img
            src={`/src/layouts/pets/Products/images/${product.src.replace(
              "../../img/images",
              ""
            )}`}
            alt=""
          />
          <img
            src={`/src/layouts/pets/Products/images/${product.src.replace(
              "../../img/images",
              ""
            )}`}
            alt=""
          />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={productImage} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.price}</div>
          <div className="productdisplay-right-price-new">${product.price}</div>
        </div>
        {/* <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXl</div>
          </div>
        </div> */}
        <button
          onClick={() => {
            addToCart(product._id);
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
