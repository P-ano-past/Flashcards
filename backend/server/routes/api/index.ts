// Description: Main API routes file for the backend server
import { Router } from "express";
import usersRouter from "./UserRoutes";
import queryRouter from "./QueryRoutes";

const router = Router();

router.use("/users", usersRouter);
router.use("/query", queryRouter);

router.get("/", (_req, res) => {
  res.send("Route in route/api index.js triggered"); // GET /api
});

export default router;
