import express from "express";
import { 
    registerUser, loginUser, 
    loginEmployee, registerEmployee,
    registerAdmin, loginAdmin
} from "../controllers/auth.js";
import { validateAndOtpSender, changePassword, validateOtp } from "../controllers/passwordReset.js";

const router = express.Router();

router.post("/register/user", registerUser);
router.post("/login/user", loginUser);
router.post("/register/employee", registerEmployee);
router.post("/login/employee", loginEmployee);
router.post("/register/admin", registerAdmin);
router.post("/login/admin", loginAdmin);
router.post("/forgotPassword", validateAndOtpSender);
router.post("/validateOtp", validateOtp);
router.put("/changePassword", changePassword);
export default router;