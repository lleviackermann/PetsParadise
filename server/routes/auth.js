import express from "express";
import {
  registerUser,
  registerEmployee,
  registerAdmin,
  login,
  addToCart,
  removeFromCart,
  orderItems,
  getOrderedItems,
  getProductDetails,
  getStatistics,
  submitReview,
  getAllOrders,
  getAllAppointments,
} from "../controllers/auth.js";
import {
  validateAndOtpSender,
  changePassword,
  validateOtp,
  resetPassword,
} from "../controllers/passwordReset.js";
import { getAllEmployee } from "../controllers/admin.js";

const router = express.Router();

router.post("/register/user", registerUser);
router.post("/register/employee", registerEmployee);
router.post("/register/admin", registerAdmin);
router.post("/login", login);
router.post("/forgotPassword", validateAndOtpSender);
router.post("/validateOtp", validateOtp);
router.put("/changePassword", changePassword);
router.put("/resetPassword", resetPassword);
router.post("/addToCart", addToCart);
router.post("/removeFromCart", removeFromCart);
router.post("/order", orderItems);
router.get("/order", getOrderedItems);
router.get("/getEmployees", getAllEmployee);
router.get("/product/:productId", getProductDetails);
router.post("/review", submitReview);
router.get("/appointments", getAllAppointments);
router.get("/orders", getAllOrders);
router.get("/statistics", getStatistics);

export default router;
