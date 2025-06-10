// Entry point for the API routes
import { Router } from "express";
import apiRouter from "./api";

const router = Router();

router.use("/api", apiRouter);

router.get("/", (_req, res) => {
  res.send("API router working"); // GET /api
});

export default router;
