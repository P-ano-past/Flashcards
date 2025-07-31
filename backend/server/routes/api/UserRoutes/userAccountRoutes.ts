import { Router } from "express";
import {
  loginUserAccount,
  logoutUserAccount,
  getUserProfile,
} from "../../../controllers/UserController";
const router = Router();

router.post("/login", loginUserAccount);
router.get("/logout", logoutUserAccount);
router.get("/profile", getUserProfile);

export default router;
