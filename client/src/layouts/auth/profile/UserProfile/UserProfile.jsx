import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AccountSettings from "./AccountSettings";
import "./UserProfile.css";
import ChangePassword from "./ChangePassword";
import YourOrders from "./YourOrders";
import YourAppointments from "./YourAppointments";
import Notifications from "./Notifications";
import UserSidebar from "./UserSidebar";
import { RecoilRoot } from "recoil";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { activepage } = useParams();
  const userInfo = useSelector((state) => state.auth.userInfo);
  // console.log(userInfo);

  const [user, setUser] = useState({
    name: userInfo.firstName + " " + userInfo.lastName,
    email: userInfo.email,
  });

  return (
    <div className="userprofile">
      <div className="userprofilein">
        <div className="left">
          <UserSidebar activepage={activepage} />
        </div>
        <div className="right">
          {activepage === "accountsettings" && <AccountSettings user={user} />}
          {activepage === "changepassword" && <ChangePassword />}
          <RecoilRoot>
            {activepage === "orders" && <YourOrders />}
            {activepage === "appointments" && <YourAppointments />}
            {activepage === "notifications" && <Notifications />}
          </RecoilRoot>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
