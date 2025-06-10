// Index file for user account routes
import { Router } from "express";
import userAccountRoutes from "./userAccountRoutes";
const router = Router();

router.use("/account", userAccountRoutes);

router.get("/", (_req, res) => {
  res.send("account router working"); // GET /api
});

export default router;
