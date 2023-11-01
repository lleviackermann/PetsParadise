import express from "express";
import { registerUser, loginUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register/user", registerUser);
router.post("/login/user", loginUser);

export default router;