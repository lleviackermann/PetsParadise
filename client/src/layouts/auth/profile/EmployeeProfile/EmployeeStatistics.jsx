import React, { useEffect, useState } from "react";
import classes from "./EmployeeStatistics.module.css";
import { PieChart } from "@mui/x-charts/PieChart";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { baseURL } from "../../../../api/api";

const UserStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [orderType, setOrderType] = useState([]);
  const employeeDetails = useSelector((state) => state.auth.userInfo);
  console.log(employeeDetails);
  console.log(employeeDetails);

  let requestString = "";
  if (
    employeeDetails.specialization === "orders" ||
    employeeDetails.specialization === "appointments"
  ) {
    requestString = `${baseURL}employee/${employeeDetails.id}/statistics`;
  } else {
    requestString = `${baseURL}auth/statistics`;
  }

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(requestString, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + null,
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });
        const data = await response.json();
        console.log(data);
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
        {(employeeDetails.specialization === "orders" ||
          employeeDetails.specialization === "manager") &&
          orders.length > 0 && (
            <div className="chart">
              <span>Order Breakup</span>
              <PieChart series={orders} width={400} height={200} />
            </div>
          )}
        {(employeeDetails.specialization === "appointments" ||
          employeeDetails.specialization === "manager") &&
          appointments.length > 0 && (
            <div className="chart">
              <span>Appointment Breakup</span>
              <PieChart series={appointments} width={400} height={200} />
            </div>
          )}
        {employeeDetails.specialization === "manager" &&
          orderType.length > 0 && (
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
