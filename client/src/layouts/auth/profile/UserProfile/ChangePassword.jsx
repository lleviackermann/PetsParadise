import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../../store/auth-actions";

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
    <div className="accountsettings">
      <h1 className="mainhead1">Change Password</h1>

      <div className="form">
        <div className="form-group">
          <label htmlFor="oldpass">
            Old Password <span>*</span>
          </label>
          <input type="password" onChange={changeOldpass} value={oldpass} />
        </div>

        <div className="form-group">
          <label htmlFor="newpass">
            New Password <span>*</span>
          </label>
          <input type="password" onChange={changeNewpass} value={newpass} />
        </div>
      </div>

      <button className="mainbutton1" onClick={changePassword}>
        Save Changes
      </button>
    </div>
  );
};

export default ChangePassword;
