import React from "react";
import classes from "./Cart.module.css";
import Modal from "../Ui/Modal";

const Cart = (props) => {
  const totalAmount = 0;
  const hasItems = false;
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
