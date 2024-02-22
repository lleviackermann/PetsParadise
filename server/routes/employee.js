import express from "express";
import Order from "../../server/models/Order.js";
import Appointment from "../../server/models/Appointment.js";
const router = express.Router();

router.post("/updateOrder", async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ error: "Invalid request, orderId is required." });
    }

    const orders = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
    );

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

    const appointments = await Appointment.findByIdAndUpdate(
      appId,
      { status },
    );

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
export default router;
