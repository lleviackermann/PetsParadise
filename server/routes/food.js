import express from "express";
import Product from "../../server/models/Product.js";
const router = express.Router();
router.get("/", async (req, res) => {
  const pets = await Product.find({ productType: "food" });
  console.log("pets", pets.length);
  return res.status(201).send(pets);
});
export default router;
