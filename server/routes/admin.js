import express from 'express'
import { 
    addExpenses,
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
router.post("/sendFeedback", sendFeedback);
router.post("/makeAnnouncement", makeAnnouncement);
router.get("/getAllAnnouncements", getAllAnnouncements);
router.get("/getDashboardContents", getDashboardContents);
router.post("/addExpenses", addExpenses);

export default router;