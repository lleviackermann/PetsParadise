import Employee from "../models/Employee.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

export const topUsersHelper = async () => {
    try {
        const users = await User.find().populate('orders');
        const usersDataFormatted = users.map((user) => {
            let moneySpent = 0;
            for (let i = 0; i < user.orders.length; i++) {
                moneySpent += user.orders[i].amount;
            };
            return {
                id: user._id,
                name: user.firstName + " " + user.lastName,
                email: user.email,
                moneyspent: moneySpent,
            }
        })
        const topUsers = usersDataFormatted.sort((first, second) => {
            return second.moneyspent - first.moneyspent;
        })
        console.log(topUsers);
        return topUsers;
    } catch (err) {
        return err;
    }
}

export const topVetsHelper = async () => {
    try {
        const employees = await Employee.find();
        const formattedEmployeesData = employees.map((employee) => {
            return {
                name: employee.name,
                email: employee.email,
                appointments: employee.appointments.length,
            }
        })
        const topVets = formattedEmployeesData.sort((first, second) => {
            return second.appointments - first.appointments;
        })
        return topVets;
    } catch (err) {
        return err;
    }
}

export const lineChartDataGenerator = async () => {
    try {
        const today = new Date();
        const last7Days = [];
        let lastDay;
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            console.log(date);
            last7Days.push(date.toDateString().substring(4));
        }

        console.log(last7Days);
        const last7DaysOrders = [];
        const orders = await Order.find().sort({ createdAt: -1});
        for(let i = 0; i < orders.length; i++) {
            const order = orders[i];
            console.log(order.createdAt);
            const date = order.createdAt.toDateString().substring(4);

            // console.log(date);
        }
    } catch (err) {
        return err;
    }
}