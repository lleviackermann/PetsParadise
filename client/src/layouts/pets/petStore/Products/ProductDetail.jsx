/* eslint-disable react/prop-types */
import "./ProductDetail.css";
import {
  Link,
  Route,
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
    <div className="details">
      <div className="big-img">
        <img src={getParam("imgSrc")} />
      </div>

      <div className="box">
        <div className="row">
          <h1 className="heading">Name: {getParam("title")}</h1>
          <h2 className="heading">Rating: {getParam("stars")}</h2>
          <h2 className="product-price">
            M.R.P: Rs. $<del>{getParam("price") * 1.5}</del>
            {getParam("price")}
          </h2>
          <h2>Life Span:{getParam("lifeSpan")}</h2>
        </div>
        <div className="buttons">
          <button className="cart">Add to cart</button>
          <button
            className="cart"
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
