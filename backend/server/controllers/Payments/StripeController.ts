import { RequestHandler } from "express";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

const clientUrl =
  process.env.NODE_ENV === "development"
    ? process.env.BASE_URL_DEV
    : process.env.BASE_URL;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export const stripeCheckout: RequestHandler = async (req, res) => {
  // console.log(`testing stripe checkout`, req.body);

  const { amount, description, currency } = req.body;
  if (!amount || amount < 100) {
    res.status(400).json({ error: "Invalid donation amount" });
    return;
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "Flashcard App Donation",
              description: description,
            },
            unit_amount: amount, // $9.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${clientUrl}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    res.status(500).json({ error: "Unable to create checkout session" });
  }
};

export const getSession: RequestHandler = async (req, res) => {
  const { session_id } = req.query;
  if (!session_id) {
    res.status(400).json({ error: "Session ID is required" });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(
      session_id as string
    );
    console.log(`session`, session);
    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    const donationDetails = {
      amount: session.amount_total,
      email: session.customer_details?.email || "No email provided",
      name: session.customer_details?.name || "Anonymous",
    };

    res.status(200).json(donationDetails);
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).json({ error: "Failed to retrieve session" });
  }
};
