import { Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

type DrawerComponentProps = {
  open: boolean;
  toggleDrawer: () => void;
};

export default function DrawerComponent({
  open,
  toggleDrawer,
}: DrawerComponentProps) {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div>
      <Drawer
        anchor="left"
        PaperProps={{
          sx: {
            backgroundColor: "#171717",
            color: "white",
          },
        }}
        open={open}
        onClose={toggleDrawer}
      >
        <div style={{ width: 250, backgroundColor: "#171717" }}>
          <h2>Drawer Content</h2>
          <p>This is a simple drawer component.</p>
        </div>
        <button
          onClick={() => {
            navigate("/about");
          }}
        >
          About
        </button>
        <button
          onClick={() => {
            navigate("/settings");
          }}
        >
          Settings
        </button>
        <button
          onClick={() => {
            navigate("home");
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            console.log("drawer user", user);
          }}
        >
          User button
        </button>
      </Drawer>
    </div>
  );
}
