import { Router } from "express";

import { dashboard } from "../controllers/dealer/dashboard";
import { createCustomer } from "../controllers/dealer/createCustomer";
import { getCustomers } from "../controllers/dealer/getCustomers";

import { createDeviceSale } from "../controllers/dealer/createDeviceSale";
import { getDeviceSales } from "../controllers/dealer/getDeviceSales";
import { getDeviceSaleById } from "../controllers/dealer/getDeviceSaleById";

import { createLoan } from "../controllers/dealer/createLoan";

import { authMiddleware } from "../middlewares/authMiddleware";
import { dealerMiddleware } from "../middlewares/dealerMiddleware";
import { deleteCustomer } from "../controllers/dealer/deleteCustomer";
import { updateCustomer } from "../controllers/dealer/updateCustomer";
import { getCustomerById } from "../controllers/dealer/getCustomerById";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  dealerMiddleware,
  dashboard
);

router.post(
  "/customers",
  authMiddleware,
  dealerMiddleware,
  createCustomer
);

router.get(
  "/customers",
  authMiddleware,
  dealerMiddleware,
  getCustomers
);

router.get(
  "/customers/:id",
  authMiddleware,
  dealerMiddleware,
  getCustomerById
);

router.put(
  "/customers/:id",
  authMiddleware,
  dealerMiddleware,
  updateCustomer
);

router.delete(
  "/customers/:id",
  authMiddleware,
  dealerMiddleware,
  deleteCustomer
);  

router.post(
  "/device-sales",
  authMiddleware,
  dealerMiddleware,
  createDeviceSale
);

router.get(
  "/device-sales",
  authMiddleware,
  dealerMiddleware,
  getDeviceSales
);

router.get(
  "/device-sales/:id",
  authMiddleware,
  dealerMiddleware,
  getDeviceSaleById
);

router.post(
  "/loans",
  authMiddleware,
  dealerMiddleware,
  createLoan
);

export default router;