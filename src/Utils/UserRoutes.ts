import axios from "axios";
import type { UserProfile } from "./types/api";

const UserRoutes = {
  login: async () => {
    try {
      const response = await axios.post(`api/user/account/login`);
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }

      return response.data.loginUrl;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "An error occurred while logging in."
        );
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  },
  logout: async () => {
    try {
      const response = await axios.get(`api/user/account/logout`);
      console.log(`response`, response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "An error occurred while logging out."
        );
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  },
  getProfile: async (): Promise<UserProfile> => {
    try {
      const response = await axios.get(`api/user/account/profile`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error ||
            "An error occurred while fetching the profile."
        );
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  },
};

export default UserRoutes;
