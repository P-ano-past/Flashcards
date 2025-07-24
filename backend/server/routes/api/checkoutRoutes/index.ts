import { Router } from "express";
import checkoutRoutes from "./checkoutRoutes";

const router = Router();

router.use("/method", checkoutRoutes);

export default router;
