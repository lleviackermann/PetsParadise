import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeAccountSettings from "./EmployeeAccountSettings";
import classes from "./EmployeeProfile.module.css";
import ChangePassword from "./EmployeeChangePassword";
import UserStatistics from "./EmployeeStatistics";
import YourOrders from "./EmployeeOrders";
import EmployeeAppointments from "./EmployeeAppointments";
import Notifications from "./EmployeeNotifications";
import EmployeeSidebar from "./EmployeeSidebar";
import { RecoilRoot } from "recoil";
import { useSelector } from "react-redux";
import MaterialUiOrders from "./MaterialUiOrders";
import ManageEmployee from "./ManageEmployee";

const UserProfile = () => {
  const { activepage } = useParams();
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log(userInfo);
  const [employee, setEmployee] = useState({
    name: userInfo.firstName + " " + userInfo.lastName,
    email: userInfo.email,
  });

  return (
    <div className={classes.userprofile}>
      <div className={classes.userprofilein}>
        <div className={classes.left}>
          <EmployeeSidebar activepage={activepage} />
        </div>
        <div className={classes.right}>
          {activepage === "accountsettings" && (
            <EmployeeAccountSettings employee={employee} />
          )}
          {/* {activepage === "changepassword" && <ChangePassword />} */}
          <RecoilRoot>
            {activepage === "orders" && <YourOrders />}
            {activepage === "appointments" && <EmployeeAppointments />}
            {activepage === "notifications" && <Notifications />}
            {activepage === "statistics" && <UserStatistics />}
            {activepage === "Muiorders" && <MaterialUiOrders />}
            {activepage === "manageEmployees" &&
              userInfo.role === "Manager" && <ManageEmployee />}
          </RecoilRoot>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
