/* eslint-disable react/prop-types */
import Category from "./Category/Category";
import Price from "./Price/Price";
import Rating from "./Rating/Rating";
import "./Sidebar.css";
import PriceSlider from "./Price/PriceSlider";

const Sidebar = (props) => {
  const ratingList = [
    {
      id: 1,
      value: "1",
      label: "1⭐",
    },
    {
      id: 2,
      value: "2",
      label: "2⭐",
    },
    {
      id: 3,
      value: "3",
      label: "3⭐",
    },
    {
      id: 4,
      value: "4",
      label: "4⭐",
    },
    {
      id: 5,
      value: "5",
      label: "5⭐",
    },
  ];

  return (
    <>
      <section className="sidebar">
        <Category
          category={props.category}
          changeChecked={props.changeChecked}
        />
        <h2 className="price-filter">Price Filter</h2>
        <div className="priceSlider">
          <PriceSlider
            value={props.priceValue}
            changePrice={props.handlePriceChange}
          />
        </div>

        <h2 className="price-filter">Star Rating</h2>
        <Rating
          options={ratingList}
          value={props.selectedRating}
          selectToggle={props.selectRating}
        />
      </section>
    </>
  );
};

export default Sidebar;
