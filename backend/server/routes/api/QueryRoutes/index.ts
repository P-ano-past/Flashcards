import { Router } from "express";
import queryRoutes from "./queryRoutes";

const router = Router();

router.use("/sendQuery", queryRoutes);

router.get("/", (_req, res) => {
  res.send("route for /query triggered"); // GET /api
});

export default router;
