import React, { useEffect, useState } from "react";
import classes from "../Layout/NavBar.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { DropdownItems, ProfileItems } from "./DropdownItems";

function NavBar(props) {
  const [stickyNav, setStickyNav] = useState(true);
  const [dropdown, setDropdown] = useState({ pets: false, profile: false });
  const [login, setLogin] = useState(true);
  const onMouseLeave = () => {
    setDropdown(() => {
      return { pets: false, profile: false };
    });
  };
  const toggleClick = (component) => {
    setDropdown((prev) => {
      return { ...prev, [component]: !prev[component] };
    });
  };

  const toggleNavBar = () => {
    if (window.scrollY > 100) {
      setStickyNav(false);
    } else {
      setStickyNav(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleNavBar);
    return () => {
      window.removeEventListener("scroll", toggleNavBar);
    };
  }, []);
  return (
    <>
      <header
        style={{ position: stickyNav ? "fixed" : "fixed" }}
        className={`${classes.header} ${!stickyNav && classes.position}`}
        onMouseLeave={onMouseLeave.bind(null, "pets")}
      >
        <h1>Pets Paradise</h1>
        <li>
          <Link className={classes.navLinks}>Home</Link>
        </li>
        <li
          className={classes.navItem}
          onClick={toggleClick.bind(null, "pets")}
        >
          <li className={classes.navLinks}>
            Pets
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
            >
              <path
                style={{ fill: "white" }}
                d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
              />
            </svg>
          </li>
          <li style={{ position: "relative" }}>
            {dropdown.pets && <Dropdown items={DropdownItems} />}
          </li>
        </li>
        <li>
          <Link className={classes.navLinks}>Services</Link>
        </li>
        <li>
          <Link className={classes.navLinks}>Food</Link>
        </li>
        <li>
          <Link className={classes.navLinks}>Accessories</Link>
        </li>

        {login && (
          <li>
            <Link
              to="/auth/login"
              className={`${classes.navLinks} ${classes.link}`}
            >
              Sign Up
            </Link>
          </li>
        )}
        {!login && (
          <div className={classes.profile}>
            <HeaderCartButton onClick={props.showCart} />
            <div onClick={toggleClick.bind(null, "profile")}>
              <Avatar sx={{ bgcolor: deepOrange[100] }}>KC</Avatar>
              <li style={{ position: "relative" }}>
                {dropdown.profile && <Dropdown items={ProfileItems} />}
              </li>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default NavBar;
