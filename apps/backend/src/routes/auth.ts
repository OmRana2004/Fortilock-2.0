import { Router } from "express";
import { login } from "../controllers/auth/login";
import { me } from "../controllers/auth/me";
import { authMiddleware } from "../middlewares/authMiddleware";
import { logout } from "../controllers/auth/logout";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  me
);

router.post("/login", login);

router.post(
  "/logout",
  logout
);

export default router;