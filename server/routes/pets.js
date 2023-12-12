import express from "express";
import Product from "../../server/models/Product.js";
const router = express.Router();
router.get("/dog", async (req, res) => {
  const pets = await Product.find({ productType: "pet", petType: "dog" });
  console.log("pets", typeof pets);
  return res.status(201).send(pets);
});
router.get("/cat", async (req, res) => {
  const pets = await Product.find({ productType: "pet", petType: "cat" });
  console.log("pets", typeof pets);
  return res.status(201).send(pets);
});
export default router;
