import express from "express";
import Appointment from "../../server/models/Appointment.js";
import jwt from "jsonwebtoken";
const router = express.Router();
import url from "url";
import User from "../models/User.js";

router.get("/", async (req, res) => {
  const token = jwt.decode(req.headers.authorization.split(" ")[1]);
  console.log(token);
  let appointments = [];
  appointments = await Appointment.find({ userId: token.id });
  console.log(appointments);
  return res.status(201).send(appointments);
});

router.post("/services", async (req, res) => {
  const { pack, number, date, time, appointmentType } = req.body;
  console.log(req.headers.authorization);
  const token = jwt.decode(req.headers.authorization.split(" ")[1]);
  const user = await User.findById(token.id);
  const appointment = await Appointment.create({
    package: pack,
    number: number,
    date: date,
    time: time,
    appointmentType: appointmentType,
    userId: user._id,
  });
  user.appointments.push(appointment._id);
  await user.save();
  return res.status(201).json("Success");
});

export default router;
