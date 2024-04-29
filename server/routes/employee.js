import express from "express";
import Order from "../../server/models/Order.js";
import Appointment from "../../server/models/Appointment.js";
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

    return res
      .status(200)
      .json({ message: "Appointment updated successfully", order: appointments });
  } catch (error) {
    console.error("Error occurred while updating appointment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
