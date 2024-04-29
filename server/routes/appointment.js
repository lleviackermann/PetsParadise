import express from "express";
import Appointment from "../../server/models/Appointment.js";
import jwt from "jsonwebtoken";
const router = express.Router();
import url from "url";
import User from "../models/User.js";

// Middleware function to check for token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: "You are not authorized to view the content. Please login." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    // Attach decoded token to request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token. Please login again." });
  }
};

// Middleware function to check if user is already logged in
const checkLoggedIn = (req, res, next) => {
  // Check if user is already authenticated
  if (req.headers.authorization) {
    return verifyToken(req, res, next); // If token is present, verify it
  }

  // If user is not authenticated, proceed to next middleware or route handler
  next();
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         package:
 *           type: string
 *         number:
 *           type: string
 *         date:
 *           type: string
 *         time:
 *           type: string
 *         appointmentType:
 *           type: string
 *         status:
 *           type: string
 *           default: Pending
 *         userId:
 *           type: string
 *       required:
 *         - package
 *         - number
 *         - date
 *         - time
 *         - appointmentType
 *         - userId
 */

/**
 * @swagger
 * /appointment:
 *   get:
 *     summary: Get all appointments for the current user
 *     description: Retrieve a list of all appointments associated with the current user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *   post:
 *     summary: Create a new appointment
 *     description: Create a new appointment for the current user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       '201':
 *         description: Appointment created successfully
 */

router.get("/", checkLoggedIn, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "You are not authorized to view the content. Please login." });
    }

    const appointments = await Appointment.find({ userId: req.user.id });
    return res.status(201).json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/services", verifyToken, async (req, res) => {
  try {
    const { pack, number, date, time, appointmentType } = req.body;
    const user = await User.findById(req.user.id);
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
    return res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
