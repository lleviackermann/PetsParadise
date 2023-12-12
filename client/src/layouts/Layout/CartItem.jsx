import { addItemToCart, removeItemFromCart } from "../../store/cart-actions";
import classes from "./CartItem.module.css";
import { useSelector, useDispatch } from "react-redux";

const CartItem = (props) => {
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const price = `$${props.price.toFixed(2)}`;
  const addItem = () => {
    dispatch(addItemToCart(props.id, token));
  };
  const removeItem = () => {
    dispatch(removeItemFromCart(props.id, token));
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeItem}>-</button>
        <button onClick={addItem}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
