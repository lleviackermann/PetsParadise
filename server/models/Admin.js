import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        adminId: {
            type: String,
            required: true,
            unique: true,
            max: 30,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        picturePath: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;