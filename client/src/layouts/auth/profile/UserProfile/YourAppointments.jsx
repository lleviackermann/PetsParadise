import React, { useEffect, useState } from "react";
import "./YourOrders.css";
import OrderSuccessful from "./Order/OrderSuccessful";
import { orderSuccessfulProvider } from "./Providers/OrderSuccessfulProvider";
import { useRecoilState } from "recoil";
import { useSelector, useDispatch } from "react-redux";

const YourAppointments = () => {
  const [data, setData] = useState([
    {
      id: 112345,
      date: "12/12/2021",
      type: "salon",
      status: "Delivered",
      total: 1000,
    },
  ]);
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8000/appointment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const appointmentdata = await response.json();
      setData(appointmentdata);
    };
    sendRequest();
  }, []);

  // const dajhta = [appointmentType
  //   :
  //   "services"
  //   date
  //   :
  //   "2023-12-29"
  //   number
  //   :
  //   ""
  //   package
  //   :
  //   "499"
  //   status
  //   :
  //   "Pending"
  //   time
  //   :
  //   "15:45"
  //   userId
  //   :
  //   "6572ffb1d0be4357fbb96b66"
  //   ]

  const appointmentdata = [
    {
      id: 112345,
      date: "12/12/2021",
      type: "salon",
      status: "Delivered",
      total: 1000,
    },
    {
      id: 112346,
      date: "12/12/2021",
      type: "doctor",
      status: "On the way",
      total: 1600,
    },
    {
      id: 112347,
      date: "12/12/2021",
      type: "salon",
      status: "Delivered",
      total: 2000,
    },
    {
      id: 112348,
      date: "12/12/2021",
      type: "doctor",
      status: "Cancelled",
      total: 100,
    },
    {
      id: 112345,
      date: "12/12/2021",
      type: "salon",
      status: "Delivered",
      total: 1000,
    },
    {
      id: 112346,
      date: "12/12/2021",
      type: "doctor",
      status: "On the way",
      total: 1600,
    },
    {
      id: 112347,
      date: "12/12/2021",
      type: "salon",
      status: "Delivered",
      total: 2000,
    },
    {
      id: 112348,
      date: "12/12/2021",
      type: "doctor",
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
            <th scope="col" style={{ width: "300px" }}>
              Appointment ID
            </th>
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
                <td data-label="OrderID" style={{ width: "300px" }}>
                  {item._id}
                </td>
                <td data-label="Type">{item.appointmentType}</td>
                <td data-label="OrderDate">{item.date}</td>
                <td data-label="Delivery Status">
                  <div>
                    {item.status === "Delivered" && (
                      <span className="greendot"></span>
                    )}
                    {item.status === "Pending" && (
                      <span className="yellowdot"></span>
                    )}
                    {item.status === "Cancelled" && (
                      <span className="reddot"></span>
                    )}
                    {item.status}
                  </div>
                </td>
                <td data-label="Total">${item.package}</td>
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
