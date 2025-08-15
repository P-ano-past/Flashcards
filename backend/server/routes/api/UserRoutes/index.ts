// Index file for user account routes
import { Router } from "express";
import userAccountRoutes from "./userAccountRoutes";
import userRoles from "./userRoles";

const router = Router();

router.use("/account", userAccountRoutes);
router.use("/roles", userRoles);

router.get("/", (_req, res) => {
  res.send("account router working"); // GET /api
});

export default router;
