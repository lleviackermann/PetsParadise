import React, { useState } from "react";
import "./YourOrders.css";
import OrderSuccessful from "./Order/OrderSuccessful";
import { orderSuccessfulProvider } from "./Providers/OrderSuccessfulProvider";
import { useRecoilState } from "recoil";

const YourAppointments = () => {
  const data = [
    {
      id: 112345,
      date: "12/12/2021",
      type: 'salon',
      status: "Delivered",
      total: 1000,
    },
    {
      id: 112346,
      date: "12/12/2021",
      type: 'doctor',
      status: "On the way",
      total: 1600,
    },
    {
      id: 112347,
      date: "12/12/2021",
      type: 'salon',
      status: "Delivered",
      total: 2000,
    },
    {
      id: 112348,
      date: "12/12/2021",
      type: 'doctor',
      status: "Cancelled",
      total: 100,
    },
    {
      id: 112345,
      date: "12/12/2021",
      type: 'salon',
      status: "Delivered",
      total: 1000,
    },
    {
      id: 112346,
      date: "12/12/2021",
      type: 'doctor',
      status: "On the way",
      total: 1600,
    },
    {
      id: 112347,
      date: "12/12/2021",
      type: 'salon',
      status: "Delivered",
      total: 2000,
    },
    {
      id: 112348,
      date: "12/12/2021",
      type: 'doctor',
      status: "Cancelled",
      total: 100,
    },
  ];
  const [selectedappointment, setselectedappointmentid] = useState(0);
  const [appointmentsuccesscount, setappointmentsuccesscount] = useRecoilState(
    orderSuccessfulProvider
  );
  return (
    <div className="yourorders">
        
      <h1 className="mainhead1">Your Appointments</h1>
      {appointmentsuccesscount && (
        <OrderSuccessful
          orderid={selectedappointment}
          message={`Order ID: ${selectedappointment}`}
        />
      )}
      <table className="yourorderstable">
        <thead>
          <tr>
            <th scope="col">Appointment ID</th>
            <th scope="col">Type</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Total</th>
            {/* <th scope="col">Invoice</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td data-label="OrderID">{item.id}</td>
                <td data-label="Type">{item.type}</td>
                <td data-label="OrderDate">{item.date}</td>
                <td data-label="Delivery Status">
                  <div>
                    {item.status === "Delivered" && (
                      <span className="greendot"></span>
                    )}
                    {item.status === "On the way" && (
                      <span className="yellowdot"></span>
                    )}
                    {item.status === "Cancelled" && (
                      <span className="reddot"></span>
                    )}
                    {item.status}
                  </div>
                </td>
                <td data-label="Total">${item.total}</td>
                {/* <td data-label="Invoice">
                  <button
                    className="mainbutton1"
                    onClick={() => {
                      setselectedappointmentid(item.id);
                      setappointmentsuccesscount(true);
                    }}
                  >
                    View
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default YourAppointments;
