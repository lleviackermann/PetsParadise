import express from "express";
import Product from "../models/Product.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Accessory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         src:
 *           type: string
 *         productType:
 *           type: string
 *           enum: [Accessory]
 *         petType:
 *           type: string
 *           enum: [dog, cat] # Specify the allowed pet types here
 *         rating:
 *           type: number
 *         breed_group:
 *           type: string
 *         reviews:
 *           type: array
 *           items:
 *             type: string
 *         index:
 *           type: number
 *       required:
 *         - name
 *         - price
 *         - src
 *         - productType
 *         - petType
 *         - index
 */

/**
 * @swagger
 * /accessory:
 *   get:
 *     summary: Get all accessories
 *     description: Retrieve a list of all accessories.
 *     responses:
 *       '200':
 *         description: A list of accessories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Accessory'
 */

router.get("/", async (req, res) => {
  const pets = await Product.find({ productType: "Accessory" });
  return res.status(201).send(pets);
});
export default router;
