import React from "react";
import classes from "./EmployeeStatistics.module.css";
import { PieChart } from "@mui/x-charts/PieChart";

const UserStatistics = () => {
  const orders = [
    { id: 0, value: 10, label: "delivered", color: "#ffe4c1" },
    { id: 1, value: 5, label: "pending", color: "#c1d1ff" },
  ];
  const appointments = [
    { id: 0, value: 10, label: "Scheduled", color: "#ffe4c1" },
    { id: 1, value: 5, label: "Cancelled", color: "#c1d1ff" },
  ];
  const orderTypes = [
    { id: 0, value: 5, label: "pets", color: "#ffe4c1" },
    { id: 1, value: 5, label: "food", color: "#c1d1ff" },
    { id: 2, value: 5, label: "accessories", color: "#c1ffc1" },
  ];
  const orderSeriesData = [{ data: orders }];
  const appointmentSeriesData = [{ data: appointments }];
  const orderTypeSeriesData = [{ data: orderTypes }];

  return (
    <div className={classes.statistics}>
      <h1>User Statistics</h1>
      <div className={classes.charts}>
        <div className="chart">
          <span>Order Division</span>
          <PieChart series={orderSeriesData} width={400} height={200} />
        </div>
        <div className="chart">
          <span>Appointment Division</span>
          <PieChart series={appointmentSeriesData} width={400} height={200} />
        </div>
        <div className="chart">
          <span>Order Type Division</span>
          <PieChart series={orderTypeSeriesData} width={400} height={200} />
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;