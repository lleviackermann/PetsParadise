/* eslint-disable react/prop-types */
import classes from "./Rating.module.css";
import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { styled } from "@mui/system";

const Rating = (props) => {
  const [alignment, setAlignment] = React.useState();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.selectToggle(null, newAlignment);
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    // width: "100%",
    justifyContent: "space-between",
  }));
  const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    fontFamily: `'Raleway', sans-serif`,
    fontSize: ".8rem",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "10px",
    "&.MuiToggleButtonGroup-groupedHorizontal": {
      borderRadius: "10px",
      border: "1px solid rgba(0, 0, 0, 0.12)",
    },
    "&.Mui-selected": {
      borderRadius: "10px",
      background: "#000",
      color: "#fff",
    },
    "&.MuiToggleButton-root": {
      "&:hover": {
        background: "#000",
        color: "#fff",
      },
    },
  }));

  return (
    <>
      <StyledToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        {props.options.map(({ label, id, value }) => (
          <StyledToggleButton
            /*className={classes.toggle}*/ key={id}
            value={value}
          >
            {label}
          </StyledToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </>
  );
};

export default Rating;
