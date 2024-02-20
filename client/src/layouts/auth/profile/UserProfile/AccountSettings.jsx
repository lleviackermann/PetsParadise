import React from "react";
import classes from "./AccountSettings.module.css";

const AccountSettings = ({ user }) => {
  return (
    <div className={classes.accountsettings}>
      <h1 className={classes.mainhead1}>Personal Information</h1>

      <div className={classes.form}>
        <div className={classes.formGroup} style={{ fontSize: "1.5rem" }}>
          <strong>Name:</strong>
          <span>{user.name}</span>
        </div>
        <div className={classes.formGroup} style={{ fontSize: "1.5rem" }}>
          <strong>Email:</strong>
          <span>{user.email}</span>
        </div>
        {/* <div className='form-group' style={{fontSize:'1.5rem'}}>
          <strong>Phone/Mobile:</strong>
          <span>{user.phone}</span>
        </div> */}
      </div>
    </div>
  );
};

export default AccountSettings;
