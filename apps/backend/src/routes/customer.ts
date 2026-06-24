import { Router } from "express";

import { dashboard } from "../controllers/customer/dashboard";
import { profile } from "../controllers/customer/profile";

import { getLoans } from "../controllers/customer/getLoans";
import { getEmis } from "../controllers/customer/getEmis";
import { payCustomerEmi } from "../controllers/customer/payCustomerEmi";

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

router.get(
  "/loans",
  authMiddleware,
  customerMiddleware,
  getLoans
);

router.get(
  "/emis",
  authMiddleware,
  customerMiddleware,
  getEmis
);

router.post(
  "/emis/:id/pay",
  authMiddleware,
  customerMiddleware,
  payCustomerEmi
);

export default router;