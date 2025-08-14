import { MenuItem } from "@mui/material";
import { useAlert } from "../../Context/AlertContext";
import UserRoutes from "../../Utils/UserRoutes";
import { useUser } from "../../Context/UserContext";

export default function LoginButton() {
  const { isAuthenticated, loading } = useUser();
  const setToast = useAlert();
  const handleLogin = async () => {
    try {
      const response = await UserRoutes.login();

      const loginUrl = response;

      if (loginUrl) {
        window.location.href = loginUrl;
      } else {
        throw new Error("No login URL received from the server.");
      }

      setToast({
        success: true,
        message: "Login successful!",
        show: true,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      setToast({
        success: false,
        message: errorMessage,
        show: true,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await UserRoutes.logout();
      setToast({
        success: true,
        message: "Logout successful!",
        show: true,
      });
      window.location.reload();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      setToast({
        success: false,
        message: errorMessage,
        show: true,
      });
    }
  };

  return (
    <>
      {loading ? (
        <MenuItem disabled>Loading...</MenuItem>
      ) : isAuthenticated ? (
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      ) : (
        <MenuItem onClick={handleLogin}>Login</MenuItem>
      )}
    </>
  );
}
