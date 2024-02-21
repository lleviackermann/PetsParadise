import React, { useEffect, useState } from "react";
import classes from "./YourOrders.module.css";
import OrderSuccessful from "./Order/OrderSuccessful";
import { orderSuccessfulProvider } from "./Providers/OrderSuccessfulProvider";
import { useRecoilState } from "recoil";
import { useSelector, useDispatch } from "react-redux";

const YourOrders = () => {
  const token = useSelector((state) => state.auth.userToken);
  const [data, setData] = useState([]);
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8000/auth/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const orderData = await response.json();
      setData(orderData);
      console.log(orderData);
    };
    sendRequest();
  }, []);

  const [selectedorder, setselectedorder] = useState(0);
  const [ordersuccesscont, setordersuccesscont] = useRecoilState(
    orderSuccessfulProvider
  );
  return (
    <div className={classes.yourorders}>
      <h1 className={classes.mainhead1}>Your Orders</h1>
      {ordersuccesscont && (
        <OrderSuccessful
          order={selectedorder}
          message={`Order ID: ${selectedorder}`}
          
        />
      )}
      <table className={classes.yourorderstable}>
        <thead>
          <tr>
            {/* <th scope="col">Oder ID</th> */}
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Total</th>
            <th scope="col">Product</th> 
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                {/* <td data-label="OrderID">{item._id}</td> */}
                <td data-label="OrderDate">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td data-label="Delivery Status">
                  <div>
                    {item.status === "Delivered" && (
                      <span className={classes.greendot}></span>
                    )}
                    {item.status === "On the way" && (
                      <span className={classes.yellowdot}></span>
                    )}
                    {item.status === "Cancelled" && (
                      <span className={classes.reddot}></span>
                    )}
                    {item.status}
                  </div>
                </td>
                <td data-label="Total">${item.amount * item.quantity}</td>
                <td data-label="Invoice">
                  <button
                    className={classes.mainbutton1}
                    onClick={() => {
                      setselectedorder(item);
                      setordersuccesscont(true);
                    }}
                  >
                    View Product
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default YourOrders;
