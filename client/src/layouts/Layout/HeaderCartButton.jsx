/* eslint-disable react/prop-types */
import CartIcon from "./CartIcon";
import { useState, useEffect } from "react";
import classes from "./HeaderCartButton.module.css";
import { useSelector } from "react-redux";
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cart = useSelector((state) => state.auth.cart);
  const numberOfCartItems = cart.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cart.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cart]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      {/* <span>Your Cart</span> */}
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
