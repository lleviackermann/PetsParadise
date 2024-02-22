import React, { useEffect, useState } from "react";
import classes from "./EmployeeOrders.module.css";
import OrderSuccessful from "./Order/OrderSuccessful";
import { orderSuccessfulProvider } from "./Providers/OrderSuccessfulProvider";
import { useRecoilState } from "recoil";
import { useSelector, useDispatch } from "react-redux";
import { changeAppointmentStatus } from "../../../../store/auth-actions";

const EmployeeAppointments = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8000/auth/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const appointments = await response.json();
      console.log(appointments);
      setData(appointments);
      setFilteredData(appointments);
      // handleStatusFilter("Pending");
    };
    sendRequest();
  }, []);

  // useEffect(() => {
  //   handleStatusFilter("Pending");
  // }, [data]);

  const [selectedappointment, setselectedappointmentid] = useState(0);
  const [appointmentsuccesscount, setappointmentsuccesscount] = useRecoilState(
    orderSuccessfulProvider
  );

  const handleTypeFilter = (type) => {
    if (type === "All") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (appointment) => appointment.appointmentType === type
      );
      setFilteredData(filtered);
    }
  };

  const handleDateFilter = (sortOrder) => {
    let sortedData;
    if (sortOrder === "Ascending") {
      sortedData = [...filteredData].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    } else {
      sortedData = [...filteredData].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }
    setFilteredData(sortedData);
  };

  const handleTimeFilter = (sortOrder) => {
    let sortedData;
    if (sortOrder === "Ascending") {
      sortedData = [...filteredData].sort((a, b) => {
        const [aHours, aMinutes] = a.time.split(":").map(Number);
        const [bHours, bMinutes] = b.time.split(":").map(Number);
        const aDate = new Date(0, 0, 0, aHours, aMinutes);
        const bDate = new Date(0, 0, 0, bHours, bMinutes);
        return aDate - bDate;
      });
    } else {
      sortedData = [...filteredData].sort((a, b) => {
        const [aHours, aMinutes] = a.time.split(":").map(Number);
        const [bHours, bMinutes] = b.time.split(":").map(Number);
        const aDate = new Date(0, 0, 0, aHours, aMinutes);
        const bDate = new Date(0, 0, 0, bHours, bMinutes);
        return bDate - aDate;
      });
    }
    setFilteredData(sortedData);
  };

  const handleNumPetsFilter = (sortOrder) => {
    let sortedData;
    if (sortOrder === "Ascending") {
      sortedData = [...filteredData].sort((a, b) => a.number - b.number);
    } else {
      sortedData = [...filteredData].sort((a, b) => b.number - a.number);
    }
    setFilteredData(sortedData);
  };

  const handleStatusFilter = (status) => {
    if (status === "All") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((appointment) => {
        console.log(appointment.status, status);
        return appointment.status === status;
      });
      setFilteredData(filtered);
    }
  };

  const handleTotalFilter = (sortOrder) => {
    let sortedData;
    if (sortOrder === "Ascending") {
      sortedData = [...filteredData].sort((a, b) => a.package - b.package);
    } else {
      sortedData = [...filteredData].sort((a, b) => b.package - a.package);
    }
    setFilteredData(sortedData);
  };

  const AppointmentHandler = (option, index) => {
    const selectedAppointment = data[index];
    dispatch(changeAppointmentStatus(option, selectedAppointment._id, token));
    setData((prevData) =>
      prevData.map((appointment) =>
        appointment._id === selectedAppointment._id
          ? {
              ...appointment,
              status: option,
            }
          : appointment
      )
    );
    setFilteredData((prevData) =>
      prevData.map((appointment) =>
        appointment._id === selectedAppointment._id
          ? {
              ...appointment,
              status: option,
            }
          : appointment
      )
    );
  };

  return (
    <div className={classes.yourorders}>
      <h1 className={classes.mainhead1}>Your Appointments</h1>
      {appointmentsuccesscount && (
        <OrderSuccessful
          orderid={selectedappointment}
          message={`Order ID: ${selectedappointment}`}
        />
      )}
      <div className={classes.filterButtons}>
        <div className={classes.filterButton}>
          <span>Type:</span>
          <select onChange={(e) => handleTypeFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="services">Services</option>
            <option value="vetCare">Vet Care</option>
          </select>
        </div>
        <div className={classes.filterButton}>
          <span>Status:</span>
          <select onChange={(e) => handleStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <table className={classes.yourorderstable}>
        <thead>
          <tr>
            {/* <th scope="col" className={classes.tableHeaderCell}>Sno.</th> */}
            <th scope="col" className={classes.tableHeaderCell}>
              User Name
            </th>
            <th scope="col" className={classes.tableHeaderCell}>
              Type
            </th>
            <th scope="col" className={classes.tableHeaderCell}>
              <span
                onClick={() => handleDateFilter("Descending")}
                className={classes.arrowIcon}
              >
                &#9650;
              </span>
              &nbsp; Date &nbsp;
              <span
                onClick={() => handleDateFilter("Ascending")}
                className={classes.arrowIcon}
              >
                &#9660;
              </span>
            </th>
            <th scope="col" className={classes.tableHeaderCell}>
              <span
                onClick={() => handleTimeFilter("Descending")}
                className={classes.arrowIcon}
              >
                &#9650;
              </span>
              &nbsp; Time &nbsp;
              <span
                onClick={() => handleTimeFilter("Ascending")}
                className={classes.arrowIcon}
              >
                &#9660;
              </span>
            </th>
            <th scope="col" className={classes.tableHeaderCell}>
              <span
                onClick={() => handleNumPetsFilter("Descending")}
                className={classes.arrowIcon}
              >
                &#9650;
              </span>
              &nbsp; Pets &nbsp;
              <span
                onClick={() => handleNumPetsFilter("Ascending")}
                className={classes.arrowIcon}
              >
                &#9660;
              </span>
            </th>
            <th scope="col" className={classes.tableHeaderCell}>
              <span
                onClick={() => handleTotalFilter("Descending")}
                className={classes.arrowIcon}
              >
                &#9650;
              </span>
              &nbsp; Total &nbsp;
              <span
                onClick={() => handleTotalFilter("Ascending")}
                className={classes.arrowIcon}
              >
                &#9660;
              </span>
            </th>
            <th scope="col" className={classes.tableHeaderCell}>
              Operation
            </th>
            {/* <th scope="col" className={classes.tableHeaderCell}>Accept</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {/* <td data-label="Sno">{index + 1}</td> */}
              <td data-label="Name">{item.userName}</td>
              <td data-label="Type">{item.appointmentType}</td>
              <td data-label="Date">{item.date}</td>
              <td data-label="Time">{item.time}</td>
              <td data-label="Pets">{item.number}</td>
              {/* <td data-label="Status">
                <div>
                  {item.status}
                  {item.status === "Pending" && (
                    <span className={classes.yellowdot}></span>
                  )}
                  {item.status === "Cancelled" && (
                    <span className={classes.reddot}></span>
                  )}
                </div>
              </td> */}
              <td data-label="Total">Rs.{item.package}</td>

              <td data-label="Operation">
                {item.status === "Pending" && (
                  <>
                    <button
                      onClick={() => AppointmentHandler("Scheduled", index)}
                    >
                      Accept
                    </button>
                    &nbsp;
                    <button
                      onClick={() => AppointmentHandler("Cancelled", index)}
                    >
                      Cancel
                    </button>
                  </>
                )}
                {item.status !== "Pending" && item.status}
              </td>

              {/* <td data-label="Total"></td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAppointments;
