import React from "react";
import "./Products.css";
import Card from "../components/Card";
function ProductsList(props) {
  const productsFound = props.data.length !== 0;
  return (
    <>
      <section className="card-container">
        {productsFound &&
          props.data.map(({ reference_image_id, name, src }) => (
            <Card
              key={Math.random()}
              img={reference_image_id}
              title={name}
              star={3}
              reviews={"worst"}
              prevPrice={100}
              newPrice={200}
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
