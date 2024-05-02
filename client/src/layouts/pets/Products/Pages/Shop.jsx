import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import exclusive_image from "../Components/Assets/banner_without_BG.png";
import { baseURL } from "../../../../api/api";
const Shop = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(`${baseURL}accessory`);
        const data = await response.json();
        setData(data);
      } catch (error) {}
    };
    fetchFoodDetails();
  }, []);

  return (
    <div>
      <Hero />
      <Popular />
      <Offers image={exclusive_image} />
      <NewCollections data={data} />
      <NewsLetter />
    </div>
  );
};

export default Shop;
