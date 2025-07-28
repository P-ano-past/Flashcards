import { useState } from "react";
import { CircularProgress } from "@mui/material";
import PaymentRoutes from "../../../Utils/PaymentRoutes";

const DonoButtons = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [activeAmount, setActiveAmount] = useState<number | null>(null);

  const donationAmounts = [
    {
      amount: 5,
      label: "☕ Buy me a coffee ($5)",
      styles: "bg-blue-400 hover:bg-blue-500",
    },
    {
      amount: 10,
      label: "💙 Support the dev ($10)",
      styles: "bg-blue-600 hover:bg-blue-700",
    },
    {
      amount: 20,
      label: "🚀 Sponsor a feature ($20)",
      styles: "bg-yellow-500 hover:bg-yellow-600",
    },
  ];

  const handleDonation = async (amount: number, label: string) => {
    setIsRedirecting(true);
    setActiveAmount(amount);

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
    } finally {
      setIsRedirecting(false);
    }
  };

  // render buttons spaced evenly vertically
  return (
    <div className="grid gap-y-4 w-full">
      {donationAmounts.map((donation) => (
        <button
          key={donation.amount}
          className={`w-full text-white font-semibold rounded shadow py-4 px-4 ${donation.styles}`}
          onClick={() => handleDonation(donation.amount, donation.label)}
        >
          {isRedirecting && activeAmount === donation.amount ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            donation.label
          )}
        </button>
      ))}
    </div>
  );
};

export default DonoButtons;
