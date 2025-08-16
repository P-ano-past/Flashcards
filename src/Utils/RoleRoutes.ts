import axios from "axios";
import type { UserProfile, Role } from "./types/api";

const RoleRoutes = {
  getRole: async (): Promise<UserProfile> => {
    try {
      const response = await axios.get("/api/user/roles/roleAction", {
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
  saveRole: async (roles: Role[]): Promise<UserProfile> => {
    try {
      const response = await axios.post(
        "/api/user/roles/roleAction",
        { roles: roles },
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
  removeAllRoles: async (): Promise<void> => {
    try {
      const response = await axios.put("/api/user/roles/roleAction", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error ||
            "An error occured while removing all roles from user"
        );
      }
    }
  },
};

export default RoleRoutes;
