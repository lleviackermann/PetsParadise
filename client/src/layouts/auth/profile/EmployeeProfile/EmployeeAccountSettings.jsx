import React from "react";
import classes from "./EmployeeAccountSettings.module.css";

const EmployeeAccountSettings = ({ employee }) => {
  console.log(employee);
  return (
    <div className={classes.accountsettings}>
      <h1 className={classes.mainhead1}>Personal Information</h1>

      <div className={classes.form}>
        <div className={classes.formGroup} style={{ fontSize: "1.5rem" }}>
          <strong>Name:</strong>
          <span>{employee.name}</span>
        </div>
        <div className={classes.formGroup} style={{ fontSize: "1.5rem" }}>
          <strong>Email:</strong>
          <span>{employee.email}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAccountSettings;
