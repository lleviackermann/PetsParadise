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