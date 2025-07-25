import { Router } from "express";
import {
  stripeCheckout,
  getSession,
} from "../../../controllers/Payments/StripeController";
const router = Router();

router.post("/stripe", stripeCheckout);

router.get("/session", getSession);

export default router;
