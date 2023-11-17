/* eslint-disable react/prop-types */
import "./Products.css";
import { useState } from "react";
import usePagination from "./Pagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ProductsList from "./ProductsList";
const Products = (props) => {
  const productsFound = props.result.length !== 0;
  let [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const count = Math.ceil(props.result.length / PER_PAGE);
  const products = usePagination(props.result, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    products.jump(p);
  };

  return (
    <>
      <ProductsList data={props.result} />
      {/* <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>

      <section className="card-container">
        {productsFound ? products.currentData() : <h1>No Products Found!!</h1>}
      </section> */}
    </>
  );
};

export default Products;
