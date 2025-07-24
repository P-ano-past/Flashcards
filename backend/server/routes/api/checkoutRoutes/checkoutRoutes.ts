import { Router } from "express";
import { stripeCheckout } from "../../../controllers/Payments/StripeController";
const router = Router();

router.post("/stripe", stripeCheckout);

export default router;
