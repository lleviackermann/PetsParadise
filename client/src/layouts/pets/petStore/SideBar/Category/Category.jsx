/* eslint-disable react/prop-types */
import classes from "./Category.module.css";
import Input from "../../components/Input";

function Category(props) {
  return (
    <div>
      <h2 className={classes.sidebarTitle}>Category</h2>

      <div>
        {props.category.map((category) => (
          <Input
            changeChecked={props.changeChecked}
            category={category}
            key={Math.random()}
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
