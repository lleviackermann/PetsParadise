import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log("Server Started Successfully!");
    });
}).catch((error) => console.log(error));