import { Router } from "express";
import {
  loginUserAccount,
  handleCallback,
  logoutUserAccount,
  getUserProfile,
  getUsers,
  getRole,
  saveRole,
} from "../../../controllers/UserController";
const router = Router();

router.post("/login", loginUserAccount);
router.get("/callback", handleCallback);
router.get("/logout", logoutUserAccount);
router.get("/profile", getUserProfile);
router.get("/allUsers", getUsers);
router.route("/role").get(getRole).post(saveRole);

export default router;
