import axios from "axios";
import type {
  PaymentData,
  PaymentResponse,
  PaymentSession,
} from "../Utils/types/api";

const PaymentRoutes = {
  stripeCheckout: async (data: PaymentData): Promise<PaymentResponse> => {
    try {
      const response = await axios.post("/api/checkout/method/stripe", data);
      console.log(`response`, response);
      return response.data;
    } catch (error) {
      console.log(`error`, error);
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error ||
            "An error occurred while processing the payment."
        );
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  },
  getSession: async (sessionId: string): Promise<PaymentSession> => {
    try {
      const response = await axios.get(
        `/api/checkout/method/session?session_id=${sessionId}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch session:", error);
      throw error;
    }
  },
};

export default PaymentRoutes;
