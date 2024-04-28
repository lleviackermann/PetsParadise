import express from "express";
import Order from "../../server/models/Order.js";
import Appointment from "../../server/models/Appointment.js";
import Employee from "../models/Employee.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
const router = express.Router();

router.post("/updateOrder", async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ error: "Invalid request, orderId is required." });
    }

    const orders = await Order.findByIdAndUpdate(orderId, { status: status });

    if (!orders) {
      return res.status(404).json({ error: "Order not found." });
    }

    return res
      .status(200)
      .json({ message: "Order updated successfully", order: orders });
  } catch (error) {
    console.error("Error occurred while updating order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/updateAppointment", async (req, res) => {
  try {
    const { appId, status } = req.body;
    console.log(status);
    if (!appId) {
      return res
        .status(400)
        .json({ error: "Invalid request, appId is required." });
    }

    const appointments = await Appointment.findByIdAndUpdate(appId, { status });

    if (!appointments) {
      return res.status(404).json({ error: "Order not found." });
    }

    return res
      .status(200)
      .json({ message: "Order updated successfully", order: appointments });
  } catch (error) {
    console.error("Error occurred while updating order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:employeeId/orders", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findById(employeeId).populate({
      path: "orders",
      populate: [
        { path: "userId", select: "firstName lastName" },
        { path: "prodId", select: "name productType" },
      ],
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const orders = employee.orders.map((order) => ({
      _id: order._id,
      prodId: order.prodId._id,
      userId: order.userId._id,
      status: order.status,
      assigned: order.assigned,
      amount: order.amount,
      quantity: order.quantity,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      userName: `${order.userId.firstName} ${order.userId.lastName}`,
      productName: order.prodId.name,
      productType: order.prodId.productType,
    }));
    console.log("Employee Orders:", orders);
    res.json(orders);
  } catch (error) {
    console.error("Error getting employee orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/:employeeId/appointments", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findById(employeeId).populate({
      path: "appointments",
      populate: [{ path: "userId", select: "firstName lastName" }],
    });
    console.log(employee.appointments);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const appointments = employee.appointments.map((appointment) => ({
      _id: appointment._id,
      userId: appointment.userId._id,
      status: appointment.status,
      appointmentType: appointment.appointmentType,
      time: appointment.time,
      pack: appointment.package,
      number: appointment.number,
      date: appointment.date,
      userName: `${appointment.userId.firstName} ${appointment.userId.lastName}`,
    }));
    res.status(201).send(appointments);
  } catch (error) {
    console.error("Error getting employee orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getEmployees", async (req, res, next) => {
  console.log("Got request");
  try {
    const employees = await Employee.find({
      $or: [{ role: "orders" }, { role: "appointments" }],
    }).populate("orders appointments");
    const formattedEmployeesData = employees.map((employee) => {
      return {
        id: employee.employeeId,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        appointments: employee.appointments,
        orders: employee.orders,
      };
    });
    return res.status(200).json(formattedEmployeesData);
  } catch (err) {
    next(err);
  }
});

export default router;
