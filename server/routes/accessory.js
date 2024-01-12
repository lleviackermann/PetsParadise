import express from "express";
import Product from "../models/Product.js";
const router = express.Router();
router.get("/", async (req, res) => {
  const pets = await Product.find({ productType: "Accessory" });
  return res.status(201).send(pets);
});
export default router;
