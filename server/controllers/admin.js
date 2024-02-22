import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Announcement from "../models/Announcement.js";
import Message from "../models/Message.js";
import Count from "../models/Count.js";
import Admin from "../models/Admin.js";
import { barChartDataGenerator, lineChartDataGenerator, pieChartDataGenerator, topUsersHelper } from "../helpers/adminHelpers.js";


// Customers Page
export const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find().populate('orders');
        const usersDataFormatted = allUsers.map((user) => {
            let moneySpent = 0;
            for (let i = 0; i < user.orders.length; i++) {
                moneySpent += user.orders[i].amount;
            };
            return {
                id: user._id,
                name: user.firstName + " " + user.lastName,
                email: user.email,
                moneyspent: moneySpent,
                appointments: user.appointments.length,
            }
        })
        return res.status(200).json(usersDataFormatted);
    } catch (err) {
        next(err);
    }
}

// Employee Page
export const getAllEmployee = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        const formattedEmployeesData = employees.map((employee) => {
            return {
                id: employee.employeeId,
                name: employee.name,
                email: employee.email,
                role: employee.role,
                appointments: employee.appointments.length,
                ordersDelievered: employee.orders.length,
            }
        })
        return res.status(200).json(formattedEmployeesData);
    } catch (err) {
        next(err);
    }
}

// Products page
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        const formattedProductsData = products.map((product) => {
            return {
                id: product._id,
                name: product.name,
                price: product.price,
                petType: product.petType,
                rating: product.rating,
                breed: product.breed_group,
            }
        })
        return res.status(200).json(formattedProductsData);
    } catch (err) {
        next(err);
    }
}


// Orders Page
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('userId');
        const formattedOrdersData = orders.map((order) => {
            return {
                id: order._id,
                prodId: order.prodId,
                time: order.createdAt.toLocaleString(),
                customerName: order.userId.firstName + " " + order.userId.lastName,
                amount: order.amount,
                status: order.status,
                quantity: order.quantity,
            }
        });
        return res.status(200).json(formattedOrdersData);
    } catch (err) {
        next(err);
    }
}


// Announcement Page
export const makeAnnouncement = async (req, res, next) => {
    try {
        const { target, message } = req.body;
        let { emailId } = req.body;
        emailId = (emailId === undefined ? "all" : emailId);
        console.log(emailId);
        const newAnnouncement = new Announcement({
            message,
            target,
            emailId,
        });
        if(emailId !== "all") {
            if(target === "Employee") {
                const employee = await Employee.findOne({ email: emailId });
                if(!employee) {
                    return res.status(401).json({ message: "Employee does not exist"});
                }
            } else {
                const user = await User.findOne({ email: emailId });
                if(!user) {
                    return res.status(401).json({ message: "User does not exist"});
                }
            }
        }
        await newAnnouncement.save();
        return res.status(200).json(newAnnouncement);
    } catch (err) {
        next(err);
    }
}

export const getAllAnnouncements = async (req, res, next) => {
    try {
        const announcements = await Announcement.find();
        const formattedAnnouncements = announcements.map((announcement) => {
            return {
                id: announcement._id,
                time: announcement.createdAt.toLocaleString(),
                emailId: announcement.emailId,
                userType: announcement.target,
                message: announcement.message,
            }
        });
        return res.status(200).json(formattedAnnouncements);
    } catch(err) {
        next(err);
    }
}


// Feedback Page
export const getAllFeedbacks = async (req, res, next) => {
    try {
        const messages = await Message.find();
        const formattedMessages = messages.map((message) => {
            let properDate = message.createdAt.toLocaleString();
            return {
                id: message._id,
                time: properDate,
                name: message.name,
                emailId: message.email,
                message: message.message,
            };
        })
        return res.status(200).json(formattedMessages);
    } catch (err) {
        next(err);
    }
}

export const sendFeedback = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new Message({
            name,
            email,
            message
        });
        await newMessage.save();
        res.status(200).json(newMessage);
    } catch (err) {
        next(err);
    }
}


// Dashboard Page
export const getDashboardContents = async (req, res, next) => {
    try {
        const count = await Count.findOne({ countId: 100 });
        const admin = await Admin.findOne({ adminId: "admin101" });
        const topUsers = await topUsersHelper();
        const lineChartSalesData = await lineChartDataGenerator();
        const pieOrdersData = await pieChartDataGenerator();
        const barProductData = await barChartDataGenerator();
        const formattedData = {
            totalViews: count.countViews,
            totalSales: count.countSales,
            totalExpenses: admin.expenses,
            totalProducts: count.countProducts,
            topUsers: topUsers.slice(0,5),
            salesData: lineChartSalesData,
            ordersData: pieOrdersData,
            productsData: barProductData,
        }
        return res.status(200).json(formattedData);
    } catch(err) {
        next(err);
    }
}

export const addExpenses = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const admin = await Admin.findOne({ adminId: "admin101" });
        const updatedExpense = Number(admin.expenses) + Number(amount);
        const updatedAdmin = await Admin.findOneAndUpdate({ adminId: "admin101"}, { expenses: updatedExpense }, { new: true});
        updatedAdmin.password = "";
        return res.status(200).json(updatedAdmin);
    } catch(err) {
        next(err);
    }
}