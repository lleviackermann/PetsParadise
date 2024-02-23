import React from "react";
import classes from "./Notifications.module.css";

const Notifications = () => {
  const notifications = [
    { id: Math.random(), message: "hello1" },
    { id: Math.random(), message: "hello2" },
    { id: Math.random(), message: "hello3" },
    { id: Math.random(), message: "hello4" },
    { id: Math.random(), message: "hello5" },
  ];

  return (
    <div className={classes.notification}>
      <div className={classes.noti}>
        <h1 className={classes.Hnoti}>MESSAGE FROM US</h1>
        {notifications.map((mess) => (
          <p key={mess.id} className={classes.Pnoti}>
            {mess.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
