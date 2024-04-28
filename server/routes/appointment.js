import express from "express";
import Appointment from "../../server/models/Appointment.js";
import jwt from "jsonwebtoken";
const router = express.Router();
import url from "url";
import User from "../models/User.js";
import Employee from "../models/Employee.js";

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
  const employees = await Employee.find({ role: "appointments" });
  if (employees.length === 0) {
    return res
      .status(404)
      .json({ message: "No employees found with the role 'appointments'" });
  }
  const randomIndex = Math.floor(Math.random() * employees.length);
  const randomEmployee = employees[randomIndex];

  const appointment = await Appointment.create({
    package: pack,
    number: number,
    date: date,
    time: time,
    appointmentType: appointmentType,
    userId: user._id,
  });
  user.appointments.push(appointment._id);
  randomEmployee.appointments.push(appointment._id);
  console.log(randomEmployee);
  await user.save();
  await randomEmployee.save();
  return res.status(201).json("Success");
});

export default router;
