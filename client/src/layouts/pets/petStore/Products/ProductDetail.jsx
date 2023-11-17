/* eslint-disable react/prop-types */
import "./ProductDetail.css";
import {
  Link,
  Route,
  Redirect,
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
  // if (!/^[A-Z][a-zA-Z0-9]{8}$/.test(petId)) {
  //   return <Redirect to="/not-found"></Redirect>;
  // }
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
          <h2 className="heading">{getParam("title")}</h2>
          <span>{getParam("stars")}</span>
          <span className="product-price">M.R.P: Rs.{getParam("price")}</span>
        </div>
        {/* <Colors colors={props.colors} /> */}
        {/* <p>{props.description}</p>
          <p>{props.content}</p> */}
        {/* <DetailsThumb
            images={props.src}
            tab={this.handleTab}
            myRef={this.myRef}
          /> */}
        <p className="para">
          The Nike SB Chron 2 Canvas is the newest member of the Chron
          family.The revamped design includes a reshaped collar and heel for an
          improved fit—all while maintaining the comfort and performance you
          expect from Nike SB. Colour Shown: Pilgrim/Pilgrim/White/Black Style:
          DM3494-301
        </p>
        <p className="para">
          The Nike SB Chron 2 Canvas is the newest member of the Chron
          family.The revamped design includes a reshaped collar and heel for an
          improved fit—all while maintaining the comfort and performance you
          expect from Nike SB. Colour Shown: Pilgrim/Pilgrim/White/Black Style:
          DM3494-301
        </p>
        <p className="para">
          The Nike SB Chron 2 Canvas is the newest member of the Chron
          family.The revamped design includes a reshaped collar and heel for an
          improved fit—all while maintaining the comfort and performance you
          expect from Nike SB. Colour Shown: Pilgrim/Pilgrim/White/Black Style:
          DM3494-301
        </p>
        <p className="para">
          The Nike SB Chron 2 Canvas is the newest member of the Chron
          family.The revamped design includes a reshaped collar and heel for an
          improved fit—all while maintaining the comfort and performance you
          expect from Nike SB. Colour Shown: Pilgrim/Pilgrim/White/Black Style:
          DM3494-301
        </p>
        {/* <p>{item.content}</p> */}
        <button className="cart">Add to cart</button>
        <button
          className="cart"
          onClick={() => {
            history.goBack();
          }}
        >
          Go Back
        </button>
        <Route path={match.path} exact>
          <div className="centered">
            <Link to={`${match.url}/comments?${queryParams.toString()}`}>
              Load Comments
            </Link>
          </div>
        </Route>
        <Route path={`${match.path}/comments`} exact>
          <Comments />
        </Route>
      </div>
    </div>
  );
}

export default ProductDetail;
