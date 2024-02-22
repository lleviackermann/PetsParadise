import React, { useEffect, useState } from "react";
import classes from "./EmployeeOrders.module.css";
import OrderSuccessful from "./Order/OrderSuccessful";
import { orderSuccessfulProvider } from "./Providers/OrderSuccessfulProvider";
import { useRecoilState } from "recoil";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../../store/auth-slice";
import { changeStatus } from "../../../../store/auth-actions";

const YourOrders = () => {
  const token = useSelector((state) => state.auth.userToken);
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [prodData, setProdData] = useState([]);
  const dispatch = useDispatch();

  const handleAcceptOrCancel = async (option, index) => {
    const selectedOrder = data[index];
    dispatch(changeStatus(option, selectedOrder._id, token));
    // console.log(
    setOriginalData((prevData) =>
      originalData.map((order) =>
        order._id === selectedOrder._id
          ? {
              ...order,
              status: "Delivered",
            }
          : order
      )
    );
    // );
    setData((prevData) =>
      prevData.map((order) =>
        order._id === selectedOrder._id
          ? {
              ...order,
              status: "Delivered",
            }
          : order
      )
    );
    // console.log(data[index].status, data[index]._id);

    // try {
    //   const response = await fetch(
    //     "http://localhost:8000/employee/updateOrder",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + token,
    //       },
    //       body: JSON.stringify({
    //         orderId: selectedOrder._id, // Replace with your actual orderId property
    //         status: "Delivered", // or "cancel" based on your logic
    //       }),
    //     }
    //   );
    //   if (response.ok) {
    //     console.log("Order updated successfully");
    //     console.log(data[index]);
    //   } else {
    //     console.error("Failed to update order");
    //   }
    // } catch (error) {
    //   console.error("Error occurred while updating order:", error);
    // }
  };

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8000/auth/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const orderData = await response.json();
      setOriginalData(orderData);
      setData(orderData);
      // setProdData(orderData.products)
    };
    sendRequest();
  }, []);

  const [selectedorder, setselectedorder] = useState(0);
  const [ordersuccesscont, setordersuccesscont] = useRecoilState(
    orderSuccessfulProvider
  );

  const handleStatusFilter = (status) => {
    let filteredOrders;
    if (status === "All") {
      filteredOrders = [...originalData];
    } else {
      filteredOrders = originalData.filter((order) => order.status === status);
    }
    setData(filteredOrders);
  };

  const handleTotalAmountFilter = (sortOrder) => {
    let sortedOrders;
    if (sortOrder === "Ascending") {
      sortedOrders = [...data].sort(
        (a, b) => a.amount * a.quantity - b.amount * b.quantity
      );
    } else {
      sortedOrders = [...data].sort(
        (a, b) => b.amount * b.quantity - a.amount * a.quantity
      );
    }
    setData(sortedOrders);
  };

  const handleDateFilter = (sortOrder) => {
    let sortedOrders;
    if (sortOrder === "Ascending") {
      sortedOrders = [...data].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else {
      sortedOrders = [...data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    setData(sortedOrders);
  };

  const handleCategoryFilter = (category) => {
    let filteredOrders;
    if (category === "All") {
      filteredOrders = [...originalData];
    } else {
      filteredOrders = originalData.filter((order) => {
        const productData = prodData.find(
          (product) => product._id === order.prodId
        );
        return productData && productData.productType === category;
      });
    }
    setData(filteredOrders);
  };

  return (
    <div className={classes.yourorders}>
      <h1 className={classes.mainhead1}>Your Orders</h1>
      {ordersuccesscont && (
        <OrderSuccessful
          order={selectedorder}
          message={`Order ID: ${selectedorder}`}
        />
      )}
      <div className={classes.filterButtons}>
        <div className={classes.filterButton}>
          <span>Status:</span>
          <select onChange={(e) => handleStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div className={classes.filterButton}>
          <span>Order Category:</span>
          <select onChange={(e) => handleCategoryFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="pet">Pets</option>
            <option value="food">Food</option>
            <option value="Accessory">Accessory</option>
          </select>
        </div>
      </div>
      <table className={classes.yourorderstable}>
        <thead>
          <tr>
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
              User Name
            </th>
            <th scope="col" className={classes.tableHeaderCell}>
              Product Name
            </th>
            <th scope="col" className={classes.tableHeaderCell}>
              Product Type
            </th>
            <th scope="col" className={classes.tableHeaderCell}>
              <span
                onClick={() => handleTotalAmountFilter("Descending")}
                className={classes.arrowIcon}
              >
                &#9650;
              </span>
              &nbsp; Total &nbsp;
              <span
                onClick={() => handleTotalAmountFilter("Ascending")}
                className={classes.arrowIcon}
              >
                &#9660;
              </span>
            </th>
            {/* {data.status === "Pending" && ( */}
            <th scope="col" className={classes.tableHeaderCell}>
              Product
            </th>
            {/* )} */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const productData = prodData.find(
              (product) => product._id === item.prodId
            );
            return (
              <tr key={index}>
                {/* <td data-label="Sno">{index+1}</td> */}
                <td data-label="OrderDate">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td data-label="UserName">{item.userName}</td>
                <td data-label="UserName">{item.productName}</td>
                <td data-label="ProductType">{item && item.productType}</td>
                <td data-label="Total">${item.amount * item.quantity}</td>
                <td data-label="Operation">
                  {item.status === "Pending" && (
                    <button
                      onClick={() => handleAcceptOrCancel("accept", index)}
                    >
                      Accept
                    </button>
                  )}
                  {item.status !== "Pending" && "Delivered"}
                  &nbsp;&nbsp;
                  {/* <button onClick={() => handleAcceptOrCancel("cancel", index)}>
                    Cancel
                  </button> */}
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
