import { Router } from "express";

import { dashboard } from "../controllers/dealer/dashboard";
import { createCustomer } from "../controllers/dealer/createCustomer";
import { getCustomers } from "../controllers/dealer/getCustomers";

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

export default router;