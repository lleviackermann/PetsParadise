import Employee from "../models/Employee.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

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

export const lineChartDataGenerator = async () => {
    try {
        const today = new Date();
        const last7Days = [];
        let lastDay;
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            lastDay = date;
            last7Days.push(date.toDateString().substring(4));
        }
        lastDay = new Date(lastDay);
        let last7DaysOrders = [];
        for (let i = 0; i < 7; i++) last7DaysOrders.push(Number(0));
        const orders = await Order.find().sort({ createdAt: -1 });
        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const currDate = new Date(order.createdAt);
            if (currDate < lastDay) break;
            const date = order.createdAt.toDateString().substring(4);
            for (let index = 0; index < 7; index++) {
                if (last7Days[index] === date) last7DaysOrders[index] += order.amount;
            }
        }
        last7Days.reverse();
        last7DaysOrders.reverse();
        return {
            xData: last7Days,
            yData: last7DaysOrders,
        }
    } catch (err) {
        return err;
    }
}

export const pieChartDataGenerator = async () => {
    try {
        const orders = await Order.find();
        const labels = ["Delivered", "Pending", "Cancelled"];
        let values = [];
        for (let i = 0; i < 3; i++) values.push(Number(0));
        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            for (let index = 0; index < 3; index++) {
                if (labels[index] == order.status) values[index] += order.quantity;
            }
        }
        const data = [];
        for (let i = 0; i < 3; i++) {
            const pieObject = {
                id: i,
                value: values[i],
                label: "Orders " + labels[i],
            };
            data.push(pieObject);
        }
        return data;
    } catch (err) {
        return err;
    }
}

export const barChartDataGenerator = async () => {
    try {
        const products = await Product.find();
        const petSets = new Set();
        const productSets = new Set();
        for (let i = 0; i < products.length; i++) {
            petSets.add(products[i].petType);
            productSets.add(products[i].productType);
        }
        const petTypes = [];
        const productTypes = [];

        petSets.forEach((pet) => { petTypes.push(pet) });
        productSets.forEach((product) => {
            if (product !== "pet") productTypes.push(product);
        });

        const labels = [];
        const data = [];
        petTypes.forEach((pet) => {
            labels.push(pet[0].toUpperCase() + pet.slice(1))
        });
        productTypes.forEach((product) => {
            labels.push("Pet " + product[0].toUpperCase() + product.slice(1));
        });

        labels.forEach((label) => { data.push(Number(0)) });
        products.forEach((product) => {
            for (let i = 0; i < petTypes.length; i++) {
                if (product.petType === petTypes[i]) {
                    data[i] += 1;
                    break;
                }
            }
            for (let i = 0; i < productTypes.length; i++) {
                if (product.productType === productTypes[i]) {
                    data[petTypes.length + i] += 1;
                    break;
                }
            }
        });
        return {
            xData: labels,
            yData: data,
        }
    } catch (err) {
        return err;
    }
}