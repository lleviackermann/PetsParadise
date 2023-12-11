/* eslint-disable react/prop-types */
import { useHistory } from "react-router-dom";
import classes from "../Products/Products.module.css";
const Card = (props) => {
  const history = useHistory();
  let star = "";
  for (let i = 0; i < Math.round(props.star); i++) {
    star += "⭐";
  }


  return (
    <>
      <section
        className={classes.card}
        // onClick={() => {
        //   const params = new URLSearchParams({
        //     title: props.title,
        //     imgSrc: props.img,
        //     stars: star,
        //     price: props.newPrice,
        //     lifeSpan: props.span,
        //   });
        //   history.push({
        //     pathname: `/pets/${props.src}`,
        //     search: params.toString(),
        //   });
        // }}
      >
        <h3 className={classes.cardTitle}>{props.title}</h3>

        <img
          src={props.img}
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
            <button className={classes.cartBtn} >ADD TO CART</button>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;
