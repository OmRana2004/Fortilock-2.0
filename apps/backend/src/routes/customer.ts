import { Router } from "express";

import { profile } from "../controllers/customer/profile";

import { authMiddleware } from "../middlewares/authMiddleware";
import { customerMiddleware } from "../middlewares/customerMiddleware";

const router = Router();

router.get(
  "/profile",
  authMiddleware,
  customerMiddleware,
  profile
);

export default router;