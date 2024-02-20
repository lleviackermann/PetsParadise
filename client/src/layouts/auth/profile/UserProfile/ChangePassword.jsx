import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { resetPassword } from "../../../../store/auth-actions";
import classes from "./AccountSettings.module.css";

const ChangePassword = () => {
  const [oldpass, setOldpass] = useState("");
  const [newpass, setNewpass] = useState("");

  const changeOldpass = (event) => {
    setOldpass(event.target.value);
  };

  const changeNewpass = (event) => {
    setNewpass(event.target.value);
  };
  const dispatch = useDispatch();
  let userInfo = useSelector((state) => state.auth.userInfo);

  const changePassword = (event) => {
    event.preventDefault();
    if (oldpass === newpass) {
      alert("Both the passwords match");
    } else if (oldpass === "" || newpass === "") {
      alert("Please enter both the passwords");
    } else {
      dispatch(resetPassword(userInfo.email, oldpass, newpass));
      setNewpass("");
      setOldpass("");
    }
  };

  return (
    <div className={classes.accountsettings}>
      <h1 className={classes.mainhead1}>Change Password</h1>

      <div className={classes.form}>
        <div className={classes.formGroup}>
          <label htmlFor="oldpass">
            Old Password <span>*</span>
          </label>
          <input type="password" onChange={changeOldpass} value={oldpass} />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="newpass">
            New Password <span>*</span>
          </label>
          <input type="password" onChange={changeNewpass} value={newpass} />
        </div>
      </div>

      <Button variant="contained" onClick={changePassword}>
        Save
      </Button>
    </div>
  );
};

export default ChangePassword;
