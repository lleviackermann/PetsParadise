import express from 'express'
import { 
    addExpenses,
    deleteOrder,
    getAllAnnouncements, 
    getAllEmployee, 
    getAllFeedbacks, 
    getAllOrders, 
    getAllProducts, 
    getAllUsers, 
    getDashboardContents, 
    makeAnnouncement, 
    sendFeedback
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
router.post("/deleteOrders", deleteOrder);

export default router;