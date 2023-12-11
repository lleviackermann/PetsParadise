import express from "express";
import Appointment from "../../server/models/Appointment.js";
import jwt from "jsonwebtoken";
const router = express.Router();
router.post("/services", async (req, res) => {
  const { pack, number, date, time, appointmentType } = req.body;
  console.log(req.headers.authorization);
  const token = jwt.decode(req.headers.authorization.split(" ")[1]);
  const appointment = await Appointment.create({
    package: pack,
    number: number,
    date: date,
    time: time,
    appointmentType: appointmentType,
    userId: token.id,
  });
  return res.status(201).json("Success");
});

export default router;
