import { Router } from "express";
import userController from "../../../controllers/UserController";
const router = Router();

router.post("/register", userController.createUserAccount);
router.get("/login", userController.loginUserAccount);

export default router;
