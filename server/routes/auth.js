import express from "express";
import {
  registerUser,
  registerEmployee,
  registerAdmin,
  login,
  addToCart,
  removeFromCart,
  orderItems,
  getOrderedItems,
  getProductDetails,
  getStatistics,
  submitReview,
  getAllOrders,
  getAllAppointments,
} from "../controllers/auth.js";
import {
  validateAndOtpSender,
  changePassword,
  validateOtp,
  resetPassword,
} from "../controllers/passwordReset.js";


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         picturePath:
 *           type: string
 *         cart:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         appointments:
 *           type: array
 *           items:
 *             type: string
 *         orders:
 *           type: array
 *           items:
 *             type: string
 *     CartItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *         quantity:
 *           type: number
 *     Admin:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         adminId:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         picturePath:
 *           type: string
 *         expenses:
 *           type: number
 *     Otp:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         otpNumber:
 *           type: string
 *         time:
 *           type: string
 *           format: date-time
 *     Product:
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
 *         petType:
 *           type: string
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
 *     Count:
 *       type: object
 *       properties:
 *         countMessage:
 *           type: number
 *         countViews:
 *           type: number
 *         countEmployees:
 *           type: number
 *         countOrders:
 *           type: number
 *         countProducts:
 *           type: number
 *         countCustomers:
 *           type: number
 *         countSales:
 *           type: number
 *         countId:
 *           type: string
 * paths:
 *   /register/user:
 *     post:
 *       summary: Register a new user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '201':
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /register/employee:
 *     post:
 *       summary: Register a new employee
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       responses:
 *         '201':
 *           description: Employee registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /register/admin:
 *     post:
 *       summary: Register a new admin
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       responses:
 *         '201':
 *           description: Admin registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /auth/login:
 *     post:
 *       summary: Login user, employee, or admin
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 flag:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Successful login
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /auth/forgotPassword:
 *     post:
 *       summary: Send OTP for password reset
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Otp'
 *       responses:
 *         '200':
 *           description: OTP sent successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                      type: string
 *   /auth/validateOtp:
 *     post:
 *       summary: Validate OTP for password reset
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Otp'
 *       responses:
 *         '200':
 *           description: OTP validated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /auth/changePassword:
 *     put:
 *       summary: Change user password
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Password changed successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /auth/resetPassword:
 *     put:
 *       summary: Reset user password
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Password reset successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /auth/addToCart:
 *     post:
 *       summary: Add item to user's cart
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 productId:
 *                   type: string
 *                 quantity:
 *                   type: number
 *       responses:
 *         '200':
 *           description: Item added to cart successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /auth/removeFromCart:
 *     post:
 *       summary: Remove item from user's cart
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 productId:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Item removed from cart successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /auth/order:
 *     post:
 *       summary: Place an order
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 prodId:
 *                   type: string
 *                 status:
 *                   type: string
 *                 assigned:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 quantity:
 *                   type: number
 *       responses:
 *         '200':
 *           description: Order placed successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /auth/product/{productId}:
 *     get:
 *       summary: Get product details by ID
 *       parameters:
 *         - in: path
 *           name: productId
 *           required: true
 *           description: ID of the product to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product'
 *         '404':
 *           description: Product not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /auth/review:
 *     post:
 *       summary: Submit a review
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Name:
 *                   type: string
 *                 review:
 *                   type: string
 *                 userId:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Review submitted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /auth/appointments:
 *     get:
 *       summary: Get all appointments
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Appointment'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /auth/statistics:
 *     get:
 *       summary: Get statistics
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Count'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */



const router = express.Router();
router.post("/register/user", registerUser);
router.post("/register/employee", registerEmployee);
router.post("/register/admin", registerAdmin);
router.post("/login", login);
router.post("/forgotPassword", validateAndOtpSender);
router.post("/validateOtp", validateOtp);
router.put("/changePassword", changePassword);
router.put("/resetPassword", resetPassword);
router.post("/addToCart", addToCart);
router.post("/removeFromCart", removeFromCart);
router.post("/order", orderItems);
router.get("/order", getOrderedItems);
router.get("/product/:productId", getProductDetails);
router.post("/review", submitReview);
router.get("/appointments", getAllAppointments);
router.get("/orders", getAllOrders);
router.get("/statistics", getStatistics);

export default router;
