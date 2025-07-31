import { Router } from "express";
import {
  loginUserAccount,
  handleCallback,
  logoutUserAccount,
  getUserProfile,
} from "../../../controllers/UserController";
const router = Router();

router.post("/login", loginUserAccount);
router.get("/callback", handleCallback);
router.get("/logout", logoutUserAccount);
router.get("/profile", getUserProfile);

export default router;
