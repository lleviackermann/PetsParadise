import React from "react";
import { useParams } from "react-router-dom";
import AccountSettings from "./AccountSettings";
import "./UserProfile.css";
import ChangePassword from "./ChangePassword";
import YourOrders from "./YourOrders";
import UserAddress from "./UserAddress";
import UserSidebar from "./UserSidebar";
import LegalNotice from "./LegalNotice";
import { RecoilRoot } from "recoil";

const UserProfile = () => {
  const { activepage } = useParams();

  // alert(activepage)
  return (
    <div className="userprofile">
      <div className="userprofilein">
        <div className="left">
          <UserSidebar activepage={activepage} />
        </div>
        <div className="right">
          {activepage === "accountsettings" && <AccountSettings />}
          {activepage === "changepassword" && <ChangePassword />}
          <RecoilRoot>
          {activepage === "address" && <UserAddress />}
          {activepage === "legalnotice" && <LegalNotice />}
    {activepage === "yourorders" && <YourOrders />}
          </RecoilRoot>
        </div>
      </div>
      {/* <Footer1/> */}
      {/* <Footer2/> */}
    </div>
  );
};

export default UserProfile;
