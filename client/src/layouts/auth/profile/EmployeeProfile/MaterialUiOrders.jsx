import React, { useEffect, useState } from "react";
import classes from "./EmployeeOrders.module.css";
import EmployeeSuccessful from "./Employee/EmployeeSuccessful";
import { EmployeeSuccesfulProvider } from "./Providers/EmployeeSuccesfulProvider";
import { useRecoilState } from "recoil";
import { useSelector, useDispatch } from "react-redux";
import { changeOrderStatus } from "../../../../store/auth-actions";
import { DataGrid } from "@mui/x-data-grid";
import { baseURL } from "../../../../api/api";

const MaterialUiOrders = () => {
  const employeeDetails = useSelector((state) => state.auth.userInfo);
  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      width: 150,
      valueGetter: (params) => {
        const createdAt = params.row.createdAt;
        return new Date(createdAt).toLocaleDateString();
      },
    },
    { field: "userName", headerName: "User Name", width: 200 },
    { field: "productName", headerName: "Product Name", width: 250 },
    {
      field: "amount",
      headerName: "Total",
      type: "number",
      width: 100,
      valueGetter: (params) => {
        const row = params.row;
        return row.amount * row.quantity;
      },
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      width: 100,
      renderCell: (params) => {
        const status = params.row.status;
        if (status === "Pending") {
          return (
            <button
              className={classes.button}
              onClick={() => handleAcceptOrCancel("accept", params.row.id)}
            >
              Accept
            </button>
          );
        } else {
          return status;
        }
      },
    },
  ];

  const token = useSelector((state) => state.auth.userToken);
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  console.log(data);

  const handleAcceptOrCancel = async (option, index) => {
    // const selectedOrder = data[index];
    const selectedOrder = data.find((obj) => obj._id === index);
    dispatch(changeOrderStatus(option, selectedOrder._id, token));
    setOriginalData((prevData) =>
      prevData.map((order) =>
        order._id === selectedOrder._id
          ? { ...order, status: "Delivered" }
          : order
      )
    );
    setData((prevData) =>
      prevData.map((order) =>
        order._id === selectedOrder._id
          ? { ...order, status: "Delivered" }
          : order
      )
    );
  };
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `${baseURL}employee/${employeeDetails.id}/orders`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          }
        );
        const orderData = await response.json();
        console.log(orderData);
        const modifiedOrderData = orderData.map((order) => ({
          ...order,
          id: order._id,
        }));
        setOriginalData(modifiedOrderData);
        setData(modifiedOrderData);
      } catch (error) {
        console.error("Error fetching order data:", error);
      } finally {
        setLoading(false);
      }
    };
    sendRequest();
  }, [token]);

  const [selectedorder, setselectedorder] = useState(0);
  const [ordersuccesscont, setordersuccesscont] = useRecoilState(
    EmployeeSuccesfulProvider
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
      filteredOrders = data.filter((order) => {
        console.log("pType", order.productType, category);
        return order.productType === category;
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
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          disableColumnSelector
          //   checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default MaterialUiOrders;
