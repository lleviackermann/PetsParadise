import express from "express";
import Order from "../../server/models/Order.js";
import Appointment from "../../server/models/Appointment.js";
import Employee from "../models/Employee.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { getOrSetCache } from "../lib/db.js";
// import { client } from "../lib/db.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         prodId:
 *           type: string
 *           description: The ID of the product.
 *         userId:
 *           type: string
 *           description: The ID of the user.
 *         status:
 *           type: string
 *           description: The status of the order.
 *           enum: [Pending, Completed, Cancelled]
 *         assigned:
 *           type: string
 *           description: The assigned status of the order.
 *           default: Pending
 *         amount:
 *           type: number
 *           description: The amount of the order.
 *         quantity:
 *           type: number
 *           description: The quantity of the product.
 *       required:
 *         - prodId
 *         - userId
 *         - status
 *         - amount
 *     Employee:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the employee.
 *         employeeId:
 *           type: string
 *           description: The unique ID of the employee.
 *         email:
 *           type: string
 *           description: The email address of the employee.
 *         password:
 *           type: string
 *           description: The password of the employee.
 *         role:
 *           type: string
 *           description: The role of the employee.
 *         appointments:
 *           type: array
 *           description: Array of appointment IDs assigned to the employee.
 *           items:
 *             type: string
 *             format: uuid
 *         orders:
 *           type: array
 *           description: Array of order IDs assigned to the employee.
 *           items:
 *             type: string
 *             format: uuid
 *       required:
 *         - name
 *         - employeeId
 *         - email
 *         - password
 *         - role
 */

/**
 * @swagger
 * /employee/updateOrder:
 *   post:
 *     summary: Update an order status
 *     description: Update the status of an order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Pending, Completed, Cancelled]
 *     responses:
 *       '200':
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Invalid request, orderId is required
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal Server Error
 *
 * /employee/updateAppointment:
 *   post:
 *     summary: Update an appointment status
 *     description: Update the status of an appointment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Pending, Completed, Cancelled]
 *     responses:
 *       '200':
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       '400':
 *         description: Invalid request, appId is required
 *       '404':
 *         description: Appointment not found
 *       '500':
 *         description: Internal Server Error
 */

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
      .json({ message: "Appointment updated successfully", order: orders });
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
      return res.status(404).json({ error: "Appointment not found." });
    }

    return res.status(200).json({
      message: "Appointment updated successfully",
      order: appointments,
    });
  } catch (error) {
    console.error("Error occurred while updating appointment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:employeeId/orders", async (req, res) => {
  const { employeeId } = req.params;
  getOrSetCache(`employee:${employeeId}:orders`, 30, async () => {
    try {
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
      const orders = employee.ordersge.map((order) => ({
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
      return orders;
    } catch (err) {
      console.log(err);
    }
  }).then((data) => {
    res.json(data);
  });
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

router.get("/:employeeId/statistics", async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId)
      .populate("orders")
      .populate("appointments");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    let statistics = {};

    if (employee.role === "orders") {
      const countOrdersByStatus = employee.orders.reduce(
        (acc, order) => {
          if (order.status === "Pending") {
            acc.pending++;
          } else if (order.status === "Delivered") {
            acc.delivered++;
          }
          return acc;
        },
        { pending: 0, delivered: 0 }
      );

      statistics = {
        orderStatistics: [
          {
            data: [
              {
                id: 0,
                value: countOrdersByStatus.delivered,
                label: "delivered",
                color: "#ffe4c1",
              },
              {
                id: 1,
                value: countOrdersByStatus.pending,
                label: "pending",
                color: "#c1d1ff",
              },
            ],
          },
        ],
      };
    } else if (employee.role === "appointments") {
      console.log(employee.appointments);
      const countAppointmentsByStatus = employee.appointments.reduce(
        (acc, appointment) => {
          if (appointment.status === "Scheduled") {
            acc.scheduled++;
          } else if (appointment.status === "Pending") {
            acc.pending++;
          } else if (appointment.status === "Cancelled") {
            acc.cancelled++;
          }
          return acc;
        },
        { scheduled: 0, cancelled: 0, pending: 0 }
      );

      // Format statistics
      statistics = {
        appointmentStatistics: [
          {
            data: [
              {
                id: 0,
                value: countAppointmentsByStatus.scheduled,
                label: "Scheduled",
                color: "#ffe4c1",
              },
              {
                id: 1,
                value: countAppointmentsByStatus.cancelled,
                label: "Cancelled",
                color: "#c1d1ff",
              },
              {
                id: 2,
                value: countAppointmentsByStatus.pending,
                label: "Pending",
                color: "#c1ffc1",
              },
            ],
          },
        ],
      };
    }

    res.json(statistics);
  } catch (error) {
    console.error("Error fetching employee statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
