// Description: Main API routes file for the backend server
import { Router } from "express";
import usersRouter from "./UserRoutes";

const router = Router();

router.use("/users", usersRouter);

router.get("/", (_req, res) => {
  res.send("user router working"); // GET /api
});

export default router;
