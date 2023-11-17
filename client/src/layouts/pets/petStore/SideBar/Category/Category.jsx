/* eslint-disable react/prop-types */
import "./Category.css";
import Input from "../../components/Input";

function Category(props) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        {props.category.map((category) => (
          <Input
            changeChecked={props.changeChecked}
            category={category}
            key={Math.random()}
          />
        ))}

        {/* <Input
          handleChange={props.handleChange}
          value=""
          title="All"
          name="test"
          filterType="category"
        />
        <Input
          handleChange={props.handleChange}
          value="sneakers"
          title="sneak"
          name="test"
          filterType="category"
        />
        <Input
          handleChange={props.handleChange}
          value="flats"
          title="Flats"
          name="test"
          filterType="category"
        />
        <Input
          handleChange={props.handleChange}
          value="sandals"
          title="Sandals"
          name="test"
          filterType="category"
        />
        <Input
          handleChange={props.handleChange}
          value="heels"
          title="Heels"
          name="test"
          filterType="category"
        /> */}
      </div>
    </div>
  );
}

export default Category;
