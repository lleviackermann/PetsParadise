import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import { baseURL } from "../../../../api/api";

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { productId } = useParams();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(`${baseURL}accessory`);
        const data = await response.json();
        // console.log(data);
        setData(data);
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, []);

  // Access the product details only when loading is completed
  const product = !loading && data.find((e) => e.index === Number(productId));
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {product && (
        <>
          <Breadcrum product={product} />
          <ProductDisplay product={product} />
          <DescriptionBox />
          <RelatedProducts />
        </>
      )}
    </div>
  );
};

export default Product;
