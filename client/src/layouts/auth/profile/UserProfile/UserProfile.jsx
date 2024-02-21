import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AccountSettings from "./AccountSettings";
import classes from "./UserProfile.module.css";
import ChangePassword from "./ChangePassword";
import UserStatistics from "./UserStatistics";
import YourOrders from "./YourOrders";
import YourAppointments from "./YourAppointments";
import Notifications from "./Notifications";
import UserSidebar from "./UserSidebar";
import { RecoilRoot } from "recoil";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { activepage } = useParams();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [user, setUser] = useState({
    name: userInfo.firstName + " " + userInfo.lastName,
    email: userInfo.email,
  });

  return (
    <div className={classes.userprofile}>
      <div className={classes.userprofilein}>
        <div className={classes.left}>
          <UserSidebar activepage={activepage} />
        </div>
        <div className={classes.right}>
          {activepage === "accountsettings" && <AccountSettings user={user} />}
          {activepage === "changepassword" && <ChangePassword />}
          <RecoilRoot>
            {activepage === "orders" && <YourOrders />}
            {activepage === "appointments" && <YourAppointments />}
            {activepage === "notifications" && <Notifications />}
            {activepage === "statistics" && <UserStatistics />}
          </RecoilRoot>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
