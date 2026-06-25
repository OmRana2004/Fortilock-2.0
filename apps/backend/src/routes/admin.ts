import { Router } from "express";

import { dashboard } from "../controllers/admin/dashboard";
import { createDealer } from "../controllers/admin/createDealer";
import { getDealers } from "../controllers/admin/getDealers";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  dashboard
);

router.post(
  "/dealers",
  authMiddleware,
  adminMiddleware,
  createDealer
);

router.get(
  "/dealers",
  authMiddleware,
  adminMiddleware,
  getDealers
);

export default router;