import axios from "axios";
import type { QueryData, QueryResponse } from "../Utils/types/api";

const QueryRoutes = {
  sendQuery: async (data: QueryData): Promise<QueryResponse> => {
    try {
      const response = await axios.post<QueryResponse>(
        "/api/query/sendQuery/query",
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error ||
            "An error occurred while sending the query."
        );
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  },
};

export default QueryRoutes;
