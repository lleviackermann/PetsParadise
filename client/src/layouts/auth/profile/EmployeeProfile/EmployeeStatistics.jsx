import React, { useEffect, useState } from "react";
import classes from "./EmployeeStatistics.module.css";
import { PieChart } from "@mui/x-charts/PieChart";
import CircularProgress from "@mui/material/CircularProgress";

const UserStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [orderType, setOrderType] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:8000/auth/statistics", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + null,
          },
        });
        const data = await response.json();
        setOrders(data.orderStatistics);
        setAppointments(data.appointmentStatistics);
        setOrderType(data.orderTypeStatistics);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    sendRequest();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", marginTop: "10rem", marginLeft: "20rem" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classes.statistics}>
      <h1>Employee Statistics</h1>
      <div className={classes.charts}>
        {orders.length > 0 && (
          <div className="chart">
            <span>Order Breakup</span>
            <PieChart series={orders} width={400} height={200} />
          </div>
        )}
        {appointments.length > 0 && (
          <div className="chart">
            <span>Appointment Breakup</span>
            <PieChart series={appointments} width={400} height={200} />
          </div>
        )}
        {orderType.length > 0 && (
          <div className="chart">
            <span>Order Type Breakup</span>
            <PieChart series={orderType} width={400} height={200} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStatistics;
