import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AccountSettings from "./AccountSettings";
import "./UserProfile.css";
import ChangePassword from "./ChangePassword";
import YourOrders from "./YourOrders";
import YourAppointments from './YourAppointments';
import Notifications from "./Notifications";
import UserSidebar from "./UserSidebar";
import { RecoilRoot } from "recoil";

const UserProfile = () => {
  const { activepage } = useParams();

  
  const [user, setUser] = useState({
    name: "John Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
  });

  return (
    <div className="userprofile">
      <div className="userprofilein">
        <div className="left">
          <UserSidebar activepage={activepage} />
        </div>
        <div className="right">
          {activepage === "accountsettings" && (
            <AccountSettings user={user} />
          )}
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
