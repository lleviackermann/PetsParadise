// import React from "react";
import "./products.css";
import ProductSection from "./ProductSection";
import BannerSection from "./BannerSection";
import SmBannerSection from "./Smbanner";
import Hero from "./hero";
const Products = () => {
  return (
    <div>
      <Hero />
      <ProductSection />
      <BannerSection />
      <SmBannerSection />
    </div>
  );
};

export default Products;
