import { Router } from "express";

import { dashboard } from "../controllers/customer/dashboard";
import { profile } from "../controllers/customer/profile";

import { authMiddleware } from "../middlewares/authMiddleware";
import { customerMiddleware } from "../middlewares/customerMiddleware";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  customerMiddleware,
  dashboard
);

router.get(
  "/profile",
  authMiddleware,
  customerMiddleware,
  profile
);

export default router;