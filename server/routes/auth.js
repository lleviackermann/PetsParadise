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
} from "../controllers/auth.js";
import {
  validateAndOtpSender,
  changePassword,
  validateOtp,
  resetPassword,
} from "../controllers/passwordReset.js";

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
export default router;
