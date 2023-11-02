import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Admin from "../models/Admin.js";

// User Register
export const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });

        const savedUser = await newUser.save();
        savedUser.password = "";
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// User Login
export const loginUser = async (req, res) => {
    try {
        const { userId, password } = req.body;
        console.log(userId);
        const user = await User.findOne({ email: userId });
        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        const matched = bcrypt.compareSync(password, user.password);
        if (!matched) return res.status(401).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        user.password = ""
        return res.status(200).json({ token, user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Register Employee
export const registerEmployee = async (req, res) => {
    try {
        const {
            name,
            employeeId,
            email,
            password,
            role,
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newEmployee = new Employee({
            name,
            employeeId,
            email,
            password: passwordHash,
            role,
        });

        const savedEmployee = await newEmployee.save();
        savedEmployee.password = ""
        return res.status(201).json(savedEmployee);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Employee Login
export const loginEmployee = async (req, res) => {
    try {
        const { employeeId, password } = req.body;
        console.log(employeeId);
        const employee = await Employee.findOne({ employeeId: employeeId });
        if (!employee) return res.status(400).json({ msg: "Employee does not exist. " });

        const matched = bcrypt.compareSync(password, employee.password);
        if (!matched) return res.status(401).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET);
        employee.password = ""
        return res.status(200).json({ token, employee });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

// Admin SignUp
export const registerAdmin = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            adminId,
            email,
            password,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            firstName,
            lastName,
            adminId,
            email,
            password: passwordHash,
        });

        const savedAdmin = await newAdmin.save();
        savedAdmin.password = ""
        return res.status(201).json(savedAdmin);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Admin Login 
export const loginAdmin = async (req, res) => {
    try {
        const { adminId, password } = req.body;
        console.log(adminId);
        const admin = await Admin.findOne({ adminId: adminId });
        if (!admin) return res.status(400).json({ msg: "Admin does not exist. " });

        const matched = bcrypt.compareSync(password, admin.password);
        if (!matched) return res.status(401).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
        admin.password = ""
        return res.status(200).json({ token, admin });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};