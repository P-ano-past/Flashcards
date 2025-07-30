// pages/DonateSuccess.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PaymentRoutes from "../Utils/PaymentRoutes";
import type { DonationDetails } from "../Utils/types/api";
import { Helmet } from "react-helmet-async";

const DonateSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [donationDetails, setDonationDetails] =
    useState<DonationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await PaymentRoutes.getSession(sessionId || "");
        if (!res) {
          throw new Error("No session data found");
        }
        setDonationDetails(res);
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) fetchSession();
  }, [sessionId]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto text-center p-6 rounded-lg bg-white shadow-lg mt-12">
      <Helmet>
        <title>Thanks for Donating!</title>
        <link rel="icon" href="/favicon-thanks.png" />
      </Helmet>
      <h1>Thank You!</h1>
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        Woo!🎉 Thank you {donationDetails?.name}!
      </h1>
      <p className="text-gray-700 mb-4">
        Your donation of{" "}
        <span className="font-semibold">
          {donationDetails?.amount !== undefined
            ? `$${donationDetails.amount / 100}`
            : ""}
        </span>{" "}
        was successful.
      </p>
      <p className="text-sm text-gray-500 mb-4">
        A confirmation email has been sent to {donationDetails?.email}.
      </p>
      <div className="mt-6">
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};

export default DonateSuccess;
