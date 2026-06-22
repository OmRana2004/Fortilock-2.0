import { Router } from "express";

import authRoutes from "./auth";
import adminRoutes from "./admin";
import dealerRoutes from "./dealer";
import customerRoutes from "./customer";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/dealer", dealerRoutes);
router.use("/customer", customerRoutes);

export default router;