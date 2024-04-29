import express from 'express'
import { 
    addEmployee,
    addExpenses,
    addProduct,
    deleteOrder,
    getAllAnnouncements, 
    getAllEmployee, 
    getAllFeedbacks, 
    getAllOrders, 
    getAllProducts, 
    getAllUsers, 
    getDashboardContents, 
    makeAnnouncement,
    removeEmployees, 
} from '../controllers/admin.js';


/**
 * @swagger
 * components:
 *   schemas:
 *     Announcement:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         target:
 *           type: string
 *         emailId:
 *           type: string
 *       required:
 *         - message
 *         - target
 *     Message:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         message:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - message
 *     Review:
 *       type: object
 *       properties:
 *         Name:
 *           type: string
 *         review:
 *           type: string
 *         userId:
 *           type: string
 *       required:
 *         - Name
 *         - review
 *         - userId
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Visit:
 *       type: object
 *       properties:
 *         count:
 *           type: number
 *           default: 0
 *         ip:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * paths:
 *   /getAllUsers:
 *     get:
 *       summary: Get all users
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /getAllEmployee:
 *     get:
 *       summary: Get all employees
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Employee'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /getAllProducts:
 *     get:
 *       summary: Get all products
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Product'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /getAllOrders:
 *     get:
 *       summary: Get all orders
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Order'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /getAllFeedbacks:
 *     get:
 *       summary: Get all feedbacks
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Message'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /makeAnnouncement:
 *     post:
 *       summary: Make an announcement
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       responses:
 *         '200':
 *           description: Announcement made successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Announcement'
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /getAllAnnouncements:
 *     get:
 *       summary: Get all announcements
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Announcement'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /getDashboardContents:
 *     get:
 *       summary: Get dashboard contents
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Dashboard'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /addExpenses:
 *     post:
 *       summary: Add expenses
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: number
 *       responses:
 *         '200':
 *           description: Expenses added successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   expenses:
 *                     type: number
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *   /deleteOrders:
 *     post:
 *       summary: Delete orders
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idToDelete:
 *                   type: array
 *                   items:
 *                     type: string
 *       responses:
 *         '200':
 *           description: Orders deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Order'
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

router.get("/getAllUsers", getAllUsers);
router.get("/getAllEmployee", getAllEmployee);
router.get("/getAllProducts", getAllProducts);
router.get("/getAllOrders", getAllOrders);
router.get("/getAllFeedbacks", getAllFeedbacks);
router.post("/makeAnnouncement", makeAnnouncement);
router.get("/getAllAnnouncements", getAllAnnouncements);
router.get("/getDashboardContents", getDashboardContents);
router.post("/addExpenses", addExpenses);
router.delete("/deleteOrders", deleteOrder);
router.post("/add-product", addProduct);
router.post("/add-employee", addEmployee);
router.delete("/remove-employees", removeEmployees);

export default router;