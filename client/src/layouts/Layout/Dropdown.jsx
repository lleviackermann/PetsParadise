import { useState } from "react";
import classes from "./Dropdown.module.css";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Logout from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
const Dropdown = (props) => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const logOut = () => dispatch(authActions.logout());
  return (
    <>
      <ul
        onClick={handleClick}
        className={`${click && classes.clicked} ${
          !click && classes.dropdownMenu
        }`}
      >
        {props.items.map((item, index) => {
          return (
            <li key={index} onClick={item.title === "Log Out" ? logOut : null}>
              <Link
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
                className={classes.link}
                to={item.path}
                onClick={() => {
                  setClick(false);
                }}
              >
                {item.title === "Profile" && <Avatar sx={{ height: "2rem" }} />}
                {item.title === "Log Out" && <Logout />}
                <h3>{item.title}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Dropdown;
