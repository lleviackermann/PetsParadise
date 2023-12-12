import React from "react";
import classes from "./Cart.module.css";
import Modal from "../Ui/Modal";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
const Cart = (props) => {
  let totalAmount = 0;
  const products = useSelector((state) => state.auth.cart);
  const token = useSelector((state) => state.auth.userToken);
  const hasProducts = products.length > 0;
  const cartProducts = (
    <ul className={classes["cart-Products"]}>
      {products.map((item) => {
        totalAmount += item.productId.price * item.quantity;
        return (
          <CartItem
            key={item._id}
            id={item.productId._id}
            name={item.productId.name}
            quantity={item.quantity}
            price={item.productId.price}
            productType={item.productId.productType}
            petType={item.productId.petType}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartProducts}
      {!hasProducts && (
        <>
          <span className={classes.empty}>
            Cart is empty,Add items to continue
          </span>
        </>
      )}
      {hasProducts && (
        <>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{`$${totalAmount.toFixed(2)}`}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
            {<button className={classes.button}>Order</button>}
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
