import React from "react";
import classes from "./Products.module.css";
import Card from "../components/Card";
function ProductsList(props) {
  const productsFound = props.data.length !== 0;
  const prev = Math.random() * 5 + 5;
  const lifeSpan = `${Math.round(prev)}-${Math.round(
    prev + Math.random() + 1
  )} years`;
  // console.log(props.data);
  // console.log(props.data[0]._id);
  return (
    <>
      <section className={classes.cardContainer}>
        {productsFound &&
          props.data.map(({ _id, name, src, price, rating }) => (
            <Card
              key={_id}
              id={_id}
              img={src}
              title={name}
              star={rating}
              reviews={"worst"}
              prevPrice={price * 1.5}
              newPrice={price}
              span={lifeSpan}
              src={src}
            />
          ))}
        {!props.isLoading && !productsFound && <h1>No Products Found</h1>}
        {props.isLoading && !productsFound && <h1>Loading...</h1>}
      </section>
    </>
  );
}

export default ProductsList;
