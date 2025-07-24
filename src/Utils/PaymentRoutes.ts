import axios from "axios";
import type { PaymentData, PaymentResponse } from "../Utils/types/api";

const PaymentRoutes = {
  stripeCheckout: async (data: PaymentData): Promise<PaymentResponse> => {
    try {
      const response = await axios.post("/api/checkout/stripe", data);
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
};

export default PaymentRoutes;
