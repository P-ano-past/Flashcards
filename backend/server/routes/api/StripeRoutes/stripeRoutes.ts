import { Router } from "express";
import { stripeCheckout } from "../../../controllers/Payments/StripeController";
const router = Router();

router.post("/checkout", stripeCheckout);

export default router;
