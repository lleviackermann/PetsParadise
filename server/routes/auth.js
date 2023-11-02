import express from "express";
import { 
    registerUser, loginUser, 
    loginEmployee, registerEmployee,
    registerAdmin, loginAdmin
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register/user", registerUser);
router.post("/login/user", loginUser);
router.post("/register/employee", registerEmployee);
router.post("/login/employee", loginEmployee);
router.post("/register/admin", registerAdmin);
router.post("/login/admin", loginAdmin);

export default router;