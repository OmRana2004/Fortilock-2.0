import { Router } from "express";
import { admin } from "../controllers/auth/admin"
import { login } from "../controllers/auth/login"
import { authMiddleware } from "../middlewares/authMiddleware";
import { createCustomer } from "../controllers/customer/createCustomer";
import { createDealer } from "../controllers/dealer/createDealer";


const router = Router();

router.post("/admin", admin);
router.post("/login", login);

router.post("/createCustomer", authMiddleware, createCustomer);
router.post("/createDealer", authMiddleware, createDealer);

export default router;