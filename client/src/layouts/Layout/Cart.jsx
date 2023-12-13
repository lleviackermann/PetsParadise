import React from "react";
import classes from "./Cart.module.css";
import Modal from "../Ui/Modal";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
const Cart = (props) => {
  let totalAmount = 0;
  const products = useSelector((state) => state.auth.cart);
  const token = useSelector((state) => state.auth.userToken);
  const hasProducts = products.length > 0;
  const dispatch = useDispatch();
  console.log("products", products);
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
  const orderItems = () => {
    const orderItems = async () => {
      const response = await fetch("http://localhost:8000/auth/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
    };
    orderItems();
    dispatch(authActions.updateCart([]));
  };

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
            {
              <button onClick={orderItems} className={classes.button}>
                Order
              </button>
            }
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
