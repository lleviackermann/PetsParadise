/* eslint-disable react/prop-types */
import { FormControlLabel, Checkbox } from "@mui/material";
const Input = (props) => {
  // console.log("category is:", props.category);
  const { id, checked, label } = props.category;
  // console.log(props.category.checked);
  return (
    <div>
      <FormControlLabel
        control={<Checkbox checked={checked} />}
        label={label}
        onChange={() => props.changeChecked(id)}
        key={id}
      />
    </div>
    // <label className="sidebar-label-container">
    //   <input
    //     onChange={(event) => props.handleChange(event, props.filterType)}
    //     type="checkbox"
    //     value={props.value}
    //     name={props.name}
    //   />
    //   {/* <span
    //     className="checkmark"
    //     style={{
    //       ...(props.color && { backgroundColor: props.color }),
    //       ...(props.background && { background: props.background }),
    //     }}
    //   ></span> */}
    // </label>
  );
};

export default Input;
