import React from "react";
import classes from "./Cart.module.css";
import Modal from "../Ui/Modal";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const totalAmount = 0;
  const hasProducts = false;
  const products = useSelector((state) => state.cart)

  const cartProducts = (
    <ul className={classes["cart-Products"]}>
      {products.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.amount}
          price={item.price}
          productType={item.productType}
          petType={item.petType}
          // onRemove={}
          // onAdd={}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartProducts}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasProducts && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
