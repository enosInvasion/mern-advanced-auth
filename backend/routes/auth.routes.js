import e from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = e.Router();

router.post("/signup", signup);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.get("/check-auth", verifyToken, checkAuth);

router.post("/reset-password/:token", resetPassword);

router.post("/login", login);

router.post("/logout", logout);

export default router;
