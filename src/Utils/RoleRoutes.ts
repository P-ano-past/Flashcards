import axios from "axios";
import type { UserProfile } from "./types/api";

const RoleRoutes = {
  getRole: async (): Promise<UserProfile> => {
    try {
      const response = await axios.get("/api/user/account/role", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error ||
            "An error occurred while fetching the profile role(s)."
        );
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  },
  saveRole: async (roles: string[]): Promise<UserProfile> => {
    try {
      const response = await axios.post(
        "/api/user/account/role",
        { roles },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error ||
            "An error occurred while saving role(s) to profile."
        );
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  },
};
