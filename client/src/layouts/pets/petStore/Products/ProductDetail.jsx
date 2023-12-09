/* eslint-disable react/prop-types */
import classes from "./ProductDetail.module.css";
import {
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import Comments from "./Comments";
function ProductDetail() {
  // const location = useLocation();
  // const { hash, pathname, search } = location;
  const history = useHistory();
  const match = useRouteMatch();
  let { petId } = useParams();
  // console.log(path, url);
  console.log(match.url, match.path);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const getParam = (name) => queryParams.get(name);

  return (
    <div className={classes.details}>
      <div className={classes.bigImg}>
        <img src={getParam("imgSrc")} />
      </div>

      <div className={classes.box}>
        <div className={classes.row}>
          <h1 className={classes.heading}>Name: {getParam("title")}</h1>
          <h2 className={classes.heading}>Rating: {getParam("stars")}</h2>
          <h2 className={classes.productPrice}>
            M.R.P: Rs. $<del>{getParam("price") * 1.5}</del>
            {getParam("price")}
          </h2>
          <h2>Life Span:{getParam("lifeSpan")}</h2>
        </div>
        <div className={classes.buttons}>
          <button className={classes.cart}>Add to cart</button>
          <button
            className={classes.cart}
            onClick={() => {
              history.goBack();
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
