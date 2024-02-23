import React, { useEffect, useState } from "react";
import classes from "./UserStatistics.module.css";
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector, useDispatch } from "react-redux";

const UserStatistics = () => {
  // const [data, setData] = useState(null);
  const [orders, setOrders] = useState([
    {
      data: [
        { id: 0, value: 10, label: "delivered", color: "#ffe4c1" },
        { id: 1, value: 5, label: "pending", color: "#c1d1ff" },
      ],
    },
  ]);
  const [appointments, setAppointments] = useState([
    {
      data: [
        { id: 0, value: 10, label: "Scheduled", color: "#ffe4c1" },
        { id: 1, value: 5, label: "Cancelled", color: "#c1d1ff" },
      ],
    },
  ]);
  const [orderType, setOrderType] = useState([
    {
      data: [
        { id: 0, value: 5, label: "pets", color: "#ffe4c1" },
        { id: 1, value: 5, label: "food", color: "#c1d1ff" },
        { id: 2, value: 5, label: "accessories", color: "#c1ffc1" },
      ],
    },
  ]);
  const token = useSelector((state) => state.auth.userToken);
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8000/auth/statistics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      setOrders(data.orderStatistics);
      setAppointments(data.appointmentStatistics);
      setOrderType(data.orderTypeStatistics);
    };
    sendRequest();
  }, []);
  return (
    <div className={classes.statistics}>
      <h1>User Statistics</h1>
      <div className={classes.charts}>
        <div className="chart">
          <span>Order Division</span>
          {orders && <PieChart series={orders} width={400} height={200} />}
        </div>
        <div className="chart">
          <span>Appointment Division</span>
          {appointments && (
            <PieChart series={appointments} width={400} height={200} />
          )}
        </div>
        <div className="chart">
          <span>Order Type Division</span>
          {orderType && (
            <PieChart series={orderType} width={400} height={200} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
