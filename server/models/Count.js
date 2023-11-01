import mongoose from "mongoose";
const Schema = mongoose.Schema;

const countSchema = new mongoose.Schema({
    countMessage: {
        type: Number,
        required: true
    },
    countViews: {
        type: Number,
        required: true
    },
    countEmployees: {
        type: Number,
        required: true
    },
    countOrders: {
        type: Number,
        required: true
    },
    countProducts: {
        type: Number,
        required: true
    },
    countCustomers: {
        type: Number,
        required: true
    },
    countSales: {
        type: Number,
        required: true
    },
    countId: {
        type: String,
        required: true
    }
});

const Count = mongoose.model("Count", countSchema);

export default Count;