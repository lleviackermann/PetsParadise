import React, { useContext, useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import Offers from "../Components/Offers/Offers";
import Navbar from "../Components/Navbar/Navbar";

const ShopCategory = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch("http://localhost:8000/accessory");
        const data = await response.json();
        // setFilteredProducts(data);
        setData(data);
      } catch (error) {}
    };
    fetchFoodDetails();
  }, []);
  console.log(data);
  return (
    <div className="shop-category">
      <Navbar />
      {/* <img className='shopcategory-banner' src={props.banner} alt="" /> */}
      <Offers image={props.banner} />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {data.map((item, i) => {
          if (props.category === item.petType) {
            return (
              <Item
                key={i}
                id={item.index}
                name={item.name}
                image={item.src}
                new_price={item.price}
                old_price={item.price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
