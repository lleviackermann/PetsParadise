import express from "express";
import Product from "../../server/models/Product.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Dog:
 *       type: object
 *       properties:
 *         productType:
 *           type: string
 *           enum: [pet]
 *           description: The type of product (pet).
 *         petType:
 *           type: string
 *           enum: [dog]
 *           description: The type of pet (dog).
 *         name:
 *           type: string
 *           description: The name of the dog.
 *         breed_group:
 *           type: string
 *           description: The breed group of the dog.
 *         life_span:
 *           type: string
 *           description: The life span of the dog.
 *         price:
 *           type: number
 *           description: The price of the dog.
 *         src:
 *           type: string
 *           format: uri
 *           description: The image source of the dog.
 *         rating:
 *           type: number
 *           description: The rating of the dog.
 *       required:
 *         - productType
 *         - petType
 *         - name
 *         - breed_group
 *         - life_span
 *         - price
 *         - src
 *         - rating
 *     Cat:
 *       type: object
 *       properties:
 *         productType:
 *           type: string
 *           enum: [pet]
 *           description: The type of product (pet).
 *         petType:
 *           type: string
 *           enum: [cat]
 *           description: The type of pet (cat).
 *         name:
 *           type: string
 *           description: The name of the cat.
 *         breed_group:
 *           type: string
 *           description: The breed group of the cat.
 *         life_span:
 *           type: string
 *           description: The life span of the cat.
 *         price:
 *           type: number
 *           description: The price of the cat.
 *         src:
 *           type: string
 *           format: uri
 *           description: The image source of the cat.
 *         rating:
 *           type: number
 *           description: The rating of the cat.
 *       required:
 *         - productType
 *         - petType
 *         - name
 *         - breed_group
 *         - life_span
 *         - price
 *         - src
 *         - rating
 * /dog:
 *   get:
 *     summary: Get all dog products
 *     description: Retrieve a list of all dog products available.
 *     responses:
 *       '200':
 *         description: A list of dog products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dog'
 * /cat:
 *   get:
 *     summary: Get all cat products
 *     description: Retrieve a list of all cat products available.
 *     responses:
 *       '200':
 *         description: A list of cat products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cat'
 */

router.get("/dog", async (req, res) => {
  const pets = await Product.find({ productType: "pet", petType: "dog" });
  return res.status(201).send(pets);
});
router.get("/cat", async (req, res) => {
  const pets = await Product.find({ productType: "pet", petType: "cat" });
  return res.status(201).send(pets);
});
export default router;
