/* eslint-disable react/prop-types */
import { useHistory } from "react-router-dom";
import classes from "../Products/Products.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../../../store/cart-actions";
import { uiActions } from "../../../../store/ui-slice";

const Card = (props) => {
  const history = useHistory();
  let star = "";
  for (let i = 0; i < Math.round(props.star); i++) {
    star += "⭐";
  }
  const token = useSelector((state) => state.auth.userToken);

  const dispatch = useDispatch();
  const addToCart = () => {
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
    }
    dispatch(addItemToCart(props.id, token));
  };

  return (
    <>
      <section className={classes.card}>
        <h3 className={classes.cardTitle}>{props.title}</h3>

        <img
          src={props.src}
          alt={props.title}
          className={classes.cardImg}
          onClick={() => {
            const params = new URLSearchParams({
              title: props.title,
              imgSrc: props.img,
              stars: star,
              price: props.newPrice,
              lifeSpan: props.span,
            });
            history.push({
              pathname: `/pets/${props.src}`,
              search: params.toString(),
            });
          }}
        />
        <div className={classes.cardDetails}>
          <section className={classes.cardReviews}>{star}</section>
          <section className={classes.cardPrice}>
            <div className={classes.price}>
              <p>
                <b>
                  $<del>{props.prevPrice}</del> ${props.newPrice}
                </b>
              </p>
            </div>
            <button onClick={addToCart} className={classes.cartBtn}>
              ADD TO CART
            </button>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;
