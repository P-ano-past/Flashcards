import { Router } from "express";
import stripeRoutes from "./stripeRoutes";

const router = Router();

router.use("/stripe", stripeRoutes);

export default router;
