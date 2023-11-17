/* eslint-disable react/prop-types */
import Input from "../../components/Input";
import "./Price.css";

const Price = (props) => {
  return (
    <>
      <div className="ml">
        <h2 className="sidebar-title price-title">Price</h2>

        {/* <label className="sidebar-label-container">
          <input
            onChange={props.handleChange}
            type="radio"
            value=""
            name="test2"
          />
          <span className="checkmark"></span>All
        </label> */}

        <Input
          handleChange={props.handleChange}
          value=""
          title="All"
          name="test2"
          filterType="price"
        />
        <Input
          handleChange={props.handleChange}
          value={50}
          title="$0 - 50"
          name="test2"
          filterType="price"
        />

        <Input
          handleChange={props.handleChange}
          value={100}
          title="$50 - $100"
          name="test2"
          filterType="price"
        />

        <Input
          handleChange={props.handleChange}
          value={150}
          title="$100 - $150"
          name="test2"
          filterType="price"
        />

        <Input
          handleChange={props.handleChange}
          value={200}
          title="Over $150"
          name="test2"
          filterType="price"
        />
      </div>
    </>
  );
};

export default Price;
