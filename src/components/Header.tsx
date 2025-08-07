import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import UserRoutes from "../Utils/UserRoutes";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

import { useAlert } from "../Context/AlertContext";
import { useUser } from "../Context/UserContext";
import DrawerComponent from "./Drawer/Drawer";

export default function Header() {
  const setToast = useAlert();
  const { user, loading } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box
          onClick={toggleDrawer}
          sx={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
            width: "150px",
            cursor: "pointer",
            overflow: "hidden",
            "&:hover .flashcard-text": {
              opacity: 0,
            },
            "&:hover .menu-icon": {
              opacity: 1,
            },
          }}
        >
          {/* Flashcards text */}
          <Typography
            variant="h6"
            component="span"
            className="flashcard-text"
            sx={{
              position: "absolute",
              opacity: 1,
              transition: "opacity 0.3s",
            }}
          >
            Flashcards
          </Typography>

          {/* Menu icon (hamburger) */}
          <MenuIcon
            className="menu-icon"
            sx={{
              position: "absolute",
              opacity: 0,
              transition: "opacity 0.3s",
            }}
          />
        </Box>
        <DrawerComponent
          open={open}
          setOpen={setOpen}
          toggleDrawer={toggleDrawer}
        />
        <Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="account menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile (Coming soon!)</MenuItem>
            {loading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : user ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={handleLogin}>Login</MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
