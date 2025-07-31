// Description: Main API routes file for the backend server
import { Router } from "express";
import usersRouter from "./UserRoutes";
import queryRouter from "./QueryRoutes";
import checkoutRouter from "./checkoutRoutes";

const router = Router();

router.use("/user", usersRouter);
router.use("/query", queryRouter);
router.use("/checkout", checkoutRouter);

router.get("/", (_req, res) => {
  res.send("Route in route/api index.js triggered"); // GET /api
});

export default router;
