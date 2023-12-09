/* eslint-disable react/prop-types */
import classes from "./Products.module.css";
import { useEffect, useMemo, memo } from "react";
import usePagination from "./Pagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ProductsList from "./ProductsList";
import { useHistory, useParams } from "react-router-dom";
const Products = (props) => {
  const { pnum } = useParams();
  // alert(pnum);
  const history = useHistory();
  // let [page, setPage] = useState(pnum === undefined ? 1 : parseInt(pnum));
  const PER_PAGE = 8;
  const data = useMemo(() => props.result, [props.result]);
  const products = usePagination(data, PER_PAGE);
  const handleChange = (e, p) => {
    // setPage(p);
    products.jump(p);
    // history.replace({
    //   pathname: `/pets/dogs/${p}`,
    // });
  };
  useEffect(() => {
    // console.log("page changed");
    products.jump(pnum === undefined ? 1 : parseInt(pnum));
    // products.jump(1);
    // setPage(pnum === undefined ? 1 : parseInt(pnum));
  }, [pnum, products.maxPage]);
  // console.log(page, pnum === undefined ? 1 : parseInt(pnum));
  return (
    <>
      <div className={classes.pagination}>
        <Stack spacing={2}>
          <Pagination
            count={products.maxPage}
            // size="large"
            page={products.currentPage}
            variant="outlined"
            // shape="rounded"
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
      <ProductsList isLoading={props.isLoading} data={products.currentData()} />
    </>
  );
};
export default memo(Products);
