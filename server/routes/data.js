import express from "express";
import Product from "../../server/models/Product.js";
const router = express.Router();
import foodDetails from "./foodDetail.js";
import accessoryDetails from "./accessoryDetail.js";

router.get("/", (request, response) => {
  Product.insertMany(accessoryDetails);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

export default router;
