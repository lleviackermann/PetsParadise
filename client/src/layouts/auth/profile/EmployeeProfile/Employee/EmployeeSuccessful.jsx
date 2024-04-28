import React, { useState, useEffect } from "react";
import "./EmployeeSuccessful.css";
import { useRecoilState } from "recoil";
import { EmployeeSuccesfulProvider } from "../Providers/EmployeeSuccesfulProvider";
import { useSelector } from "react-redux";

const EmployeeSuccessful = ({ employee, redirecto }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [employeeSuccessCont, setEmployeeSuccesscont] = useRecoilState(
    EmployeeSuccesfulProvider
  );
  console.log(employee);

  return (
    // <div className="OrdersSuccessful">
    //   <button
    //     className="popup__close-btn"
    //     onClick={() => {
    //       if (redirecto == "userorders") {
    //         window.location.href = "/user/yourorders";
    //       }
    //       setordersuccesscont(false);
    //     }}
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-6 h-6"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M6 18L18 6M6 6l12 12"
    //       />
    //     </svg>
    //   </button>

    //   <div className="confirmationcont">
    //     <div className="c1">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         strokeWidth={1.5}
    //         stroke="currentColor"
    //         className="w-6 h-6"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
    //         />
    //       </svg>
    //       <h2>{"Order Confirmation"}</h2>
    //     </div>

    //     {/* Order Summary Table */}
    //     <div className="c2 input-container">
    //       <h2>Order Summary</h2>
    //       <table>
    //         <tbody>
    //           <tr>
    //             <td>
    //               <strong>Order Id</strong>
    //             </td>
    //             {/* <td>{order._id}</td> */}
    //             <td>order</td>
    //           </tr>
    //           <tr>
    //             <td>
    //               <strong>Order Date</strong>
    //             </td>
    //             {/* <td>{new Date(order.createdAt).toLocaleDateString()}</td> */}
    //             <td>Hello</td>
    //           </tr>
    //           <tr>
    //             <td>
    //               <strong>Name</strong>
    //             </td>
    //             {/* <td>{userInfo.firstName + " " + userInfo.lastName}</td> */}
    //             <td>UserInfo</td>
    //           </tr>
    //           <tr>
    //             <td>
    //               <strong>Email</strong>
    //             </td>
    //             {/* <td>{userInfo.email}</td> */}
    //             <td>Email</td>
    //           </tr>
    //           <tr>
    //             <td>
    //               <strong>Order Subtotal</strong>
    //             </td>
    //             <td>$Amiunt</td>
    //             {/* <td>${order.amount}</td> */}
    //           </tr>
    //           <tr>
    //             <td>
    //               <strong>Order Quantity</strong>
    //             </td>
    //             {/* <td>{order.quantity}</td> */}
    //             <td>quantity</td>
    //           </tr>
    //           <tr>
    //             <td>
    //               <strong>Total</strong>
    //             </td>
    //             {/* <td>${order.amount * order.quantity}</td> */}
    //             <td>$amount </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //       <div className="review-container">
    //         <h2>Enter Review:</h2>
    //         <input
    //           className="input-field"
    //           id="review"
    //           type="text"
    //           placeholder="Enter your review"
    //         />
    //         <div className="submit-btn-container">
    //           <button type="submit">Submit review</button>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Product Details Table */}
    //     <div className="c3">
    //       <h2>Product Details</h2>
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>Sno.</th>
    //             <th>Product</th>
    //             <th>Price</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <td>
    //               Hello
    //               {/* {data.productType === "pet" && (
    //                 <img
    //                   width={"60px"}
    //                   height={"60px"}
    //                   className="pets"
    //                   src={data.src}
    //                   alt="nope"
    //                 />
    //               )}
    //               {data.productType === "food" && (
    //                 <img
    //                   width={"60px"}
    //                   height={"60px"}
    //                   src={
    //                     "/src/layouts/pets/petsFood/" +
    //                     data.src.replace(
    //                       "../../img/foodservicesLandingPage/",
    //                       "foodservicesLandingPage/"
    //                     )
    //                   }
    //                   alt="nope"
    //                 />
    //               )}
    //               {data.productType === "Accessory" && (
    //                 <img
    //                   width={"60px"}
    //                   height={"60px"}
    //                   src={
    //                     "/src/layouts/pets/Products/" +
    //                     data.src.replace("./../img/images/", "images/")
    //                   }
    //                   alt="nope"
    //                 />
    //               )} */}
    //             </td>
    //             <td>{data.name}</td>
    //             <td>${data.price}</td>
    //             <td>name</td>
    //             <td>$price</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>

    <div className="OrdersSuccessful" style={{ zIndex: 1 }}>
      <button
        className="popup__close-btn"
        onClick={() => {
          if (redirecto == "userorders") {
            window.location.href = "/user/yourorders";
          }
          setEmployeeSuccesscont(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="OrdersSuccessful">
        <div className="confirmationcont">
          <div className="c1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
            <h2>Order Confirmation</h2>
          </div>
          Order Summary Table
          <div className="c2">
            <h2>Employee Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Order Date</th>
                  {/* <th>Product Name</th>
                <th>User Name</th> */}
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employee.role === "orders"
                  ? employee.orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td>{order.status}</td>
                      </tr>
                    ))
                  : employee.role === "appointments"
                  ? employee.appointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td>{appointment._id}</td>
                        <td>
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td>{appointment.status}</td>
                      </tr>
                    ))
                  : []}

                {employee.orders.length
                  ? employee.orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        {/* <td>{order.productName}</td>
                      <td>{order.userName}</td> */}
                        <td>{order.status}</td>
                      </tr>
                    ))
                  : []}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSuccessful;
