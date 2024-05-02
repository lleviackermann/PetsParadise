import React from "react";
import "./NewCollections.css";
import new_collection from "../Assets/new_collections";
import Item from "../Item/Item";
import Navbar from "../Navbar/Navbar";
import all_product from "../Assets/all_product";

const NewCollections = () => {
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <Navbar />
      <div className="collections">
        {new_collection.map((item, i) => {
          const productImage = () => {
            const filteredProduct = all_product.find((prod) => {
              console.log(prod.index, i, prod.index === i);
              return prod.index === i;
            });

            if (filteredProduct) {
              console.log("returning", filteredProduct);
              return filteredProduct.productDetails.src;
            }

            return null;
          };

          let img = productImage();
          console.log(img);

          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={img}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
