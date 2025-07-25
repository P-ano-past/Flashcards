import React from "react";
import { Button } from "@mui/material";
import PaymentRoutes from "../../../Utils/PaymentRoutes";

const DonoButtons = () => {
  // I want to create an array of buttons for different donation amounts and then interate through each button to render them.
  // PaymentRoutes.stripeCheckout is used to handle the payment processing.
  const donationAmounts = [
    { amount: 5, label: "Buy me a coffee ($5)", currency: "USD" },
    { amount: 10, label: "Support the dev ($10)", currency: "USD" },
    { amount: 20, label: "Sponsor a feature ($20)", currency: "USD" },
  ];
  const handleDonation = async (amount: number, label: string) => {
    try {
      const paymentData = {
        amount: amount * 100,
        description: label,
        currency: "USD",
      };

      const response = await PaymentRoutes.stripeCheckout(paymentData);
      if (response?.url) {
        window.location.href = response.url;
      } else {
        console.error("No redirect URL from Stripe:", response);
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };
  return (
    <div className="flex flex-col items-center space-y-4">
      {donationAmounts.map((donation) => (
        <Button
          key={donation.amount}
          variant="contained"
          color="primary"
          onClick={() => handleDonation(donation.amount, donation.label)}
        >
          {donation.label}
        </Button>
      ))}
    </div>
  );
};

export default DonoButtons;
