/* eslint-disable react/prop-types */
import { FormControlLabel, Checkbox } from "@mui/material";
const Input = (props) => {
  const { id, checked, label } = props.category;
  return (
    <div>
      <FormControlLabel
        control={<Checkbox checked={checked} />}
        label={label}
        onChange={() => props.changeChecked(id)}
        key={id}
      />
    </div>
  );
};

export default Input;
