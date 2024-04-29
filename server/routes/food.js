import express from "express";
import Product from "../../server/models/Product.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     FoodItem:
 *       type: object
 *       properties:
 *         productType:
 *           type: string
 *           enum: [food]
 *           description: The type of product (food).
 *         petType:
 *           type: string
 *           description: The type of pet for which the food is intended.
 *         productDetails:
 *           type: object
 *           properties:
 *             Name:
 *               type: string
 *               description: The name of the food product.
 *             price:
 *               type: number
 *               description: The price of the food product.
 *             src:
 *               type: string
 *               description: The image source of the food product.
 *       required:
 *         - productType
 *         - petType
 *         - productDetails
 *         - Name
 *         - price
 *         - src
 * /food:
 *   get:
 *     summary: Get all food products
 *     description: Retrieve a list of all food products available.
 *     responses:
 *       '201=':
 *         description: A list of food products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FoodItem'
 */

router.get("/", async (req, res) => {
  const pets = await Product.find({ productType: "food" });
  return res.status(201).send(pets);
});
export default router;
