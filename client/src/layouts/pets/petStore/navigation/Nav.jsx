/* eslint-disable react/prop-types */
import classes from "./Nav.module.css";
import SearchIcon from "@mui/icons-material/Search";

const Nav = (props) => {
  return (
    <nav>
      <div className={classes.inputWrapper}>
        <SearchIcon />
        <input
          className={classes.input}
          placeholder="Type to search..."
          onChange={props.handleInputChange}
        />
      </div>
    </nav>
  );
};

export default Nav;
