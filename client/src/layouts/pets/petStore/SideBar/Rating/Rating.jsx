/* eslint-disable react/prop-types */
import "./Rating.css";
import Input from "../../components/Input";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { styled } from "@mui/system";

const Rating = (props) => {
  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    // width: "100%",
    justifyContent: "space-between",
  }));
  const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    fontFamily: `'Raleway', sans-serif`,
    fontSize: ".8rem",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "10px",
    // margin: "2rem",

    "&.MuiToggleButtonGroup-groupedHorizontal": {
      // borderRadius: "10px",
    },
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
        value={props.value}
        exclusive
        onChange={props.selectToggle}
        // className={classes.root}
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

      {/* <label className="sidebar-label-container">
          <input
            onChange={props.handleChange}
            type="radio"
            value=""
            name="test1"
          />
          <span className="checkmark all"></span>
          All
        </label> */}

      {/* <Input
          handleChange={props.handleChange}
          value=""
          title="All"
          name="test1"
          background="linear-gradient(blue, crimson)"
          filterType="color"
        />
        <Input
          handleChange={props.handleChange}
          value="black"
          title="Black"
          name="test1"
          color="black"
          filterType="color"
        />

        <Input
          handleChange={props.handleChange}
          value="blue"
          title="Blue"
          name="test1"
          color="blue"
          filterType="color"
        />

        <Input
          handleChange={props.handleChange}
          value="red"
          title="Red"
          name="test1"
          color="red"
          filterType="color"
        />

        <Input
          handleChange={props.handleChange}
          value="green"
          title="Green"
          name="test1"
          color="green"
          filterType="color"
        /> */}

      {/* <label className="sidebar-label-container">
          <input
            onChange={props.handleChange}
            type="radio"
            value="white"
            name="test1"
          />
          <span
            className="checkmark"
            style={{ background: "white", border: "2px solid black" }}
          ></span>
          White
        </label> */}
    </>
  );
};

export default Rating;
