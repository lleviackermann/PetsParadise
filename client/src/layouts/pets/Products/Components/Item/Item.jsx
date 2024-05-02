import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  let imgSrc = props.image;
  // if (!props.image.includes("/src/layouts/pets/Products")) {
  //   imgSrc = `/src/layouts/pets/Products/images/${props.image.replace(
  //     "../../img/images",
  //     ""
  //   )}`;
  // }
  return (
    <div className="item">
      <Link to={`/pets/product/${props.id}`}>
        <img onClick={window.scrollTo(0, 0)} src={imgSrc} alt="" />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>
    </div>
  );
};

export default Item;
