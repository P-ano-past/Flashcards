import React from "react";
import { Button } from "@mui/material";
import PaymentRoutes from "../../../Utils/PaymentRoutes";

const DonoButtons = () => {
  const donationAmounts = [
    {
      amount: 5,
      label: "☕ Buy me a coffee ($5)",
      currency: "USD",
      styles:
        "bg-blue-300 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded shadow",
    },
    {
      amount: 10,
      label: "💙 Support the dev ($10)",
      currency: "USD",
      styles:
        "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow",
    },
    {
      amount: 20,
      label: "🚀 Sponsor a feature ($20)",
      currency: "USD",
      styles:
        "bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow",
    },
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

  // render buttons spaced evenly vertically
  return (
    <div className="grid gap-y-4 w-full">
      {donationAmounts.map((donation) => (
        <Button
          key={donation.amount}
          variant="contained"
          className={`w-full ${donation.styles} text-white py-8 px-4`}
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
