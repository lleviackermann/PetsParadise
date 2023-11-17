import React, { useEffect } from "react";
import "./Products.css";
import { useState } from "react";
import usePagination from "./Pagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Card from "../components/Card";
import { useHistory, useParams } from "react-router-dom";
function ProductsList(props) {
  const { pnum } = useParams();
  const history = useHistory();
  const productsFound = props.data.length !== 0;
  let [page, setPage] = useState(pnum == undefined ? 1 : parseInt(pnum));
  const PER_PAGE = 8;
  const count = Math.ceil(props.data.length / PER_PAGE);
  const products = usePagination(props.data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    products.jump(p);
    history.replace({
      pathname: `/pets/dogs/${p}`,
    });
  };

  useEffect(() => {
    products.jump(page);
  }, [page]);

  useEffect(() => {
    products.jump(1);
    history.replace({
      pathname: `/pets/dogs/${1}`,
    });
  }, [products.maxPage]);

  return (
    <>
      <div className="pagination">
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
        {productsFound &&
          products
            .currentData()
            .map(({ reference_image_id, name, src }) => (
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
        {!productsFound && <h1>No Products Found</h1>}
        {/* {productsFound ? products.currentData() : <h1>No Products Found!!</h1>} */}
      </section>
    </>
  );
}

export default ProductsList;
