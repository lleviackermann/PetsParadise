/* eslint-disable react/prop-types */
import { useHistory } from "react-router-dom";
import { BsFillBagFill } from "react-icons/bs";

const Card = (props) => {
  const history = useHistory();
  let star = "";
  for (let i = 0; i < Math.round(props.star); i++) {
    star += "⭐";
  }
  return (
    <>
      <section
        className="card"
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
        <h3 className="card-title">{props.title}</h3>

        <img
          src={props.img}
          alt={props.title}
          className="card-img"
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
        <div className="card-details">
          <section className="card-reviews">{star}</section>
          <section className="card-price">
            <div className="price">
              <p>
                <b>
                  $<del>{props.prevPrice}</del> ${props.newPrice}
                </b>
              </p>
            </div>
            <button className="cart--btn">ADD TO CART</button>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;
