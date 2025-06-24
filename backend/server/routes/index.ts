// Entry point for the API routes
import { Router } from "express";
import apiRouter from "./api";

const router = Router();

router.use("/", apiRouter);

router.get("/", (_req, res) => {
  res.send("route for: /routes index.ts triggered"); // GET /api
});

export default router;
