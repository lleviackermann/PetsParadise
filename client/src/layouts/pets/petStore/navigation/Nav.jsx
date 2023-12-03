/* eslint-disable react/prop-types */
import "./Nav.css";
import SearchIcon from "@mui/icons-material/Search";

const Nav = (props) => {
  return (
    <nav>
      <div className="input-wrapper">
        <SearchIcon />
        <input
          className="input"
          placeholder="Type to search..."
          onChange={props.handleInputChange}
        />
      </div>
    </nav>
  );
};

export default Nav;
