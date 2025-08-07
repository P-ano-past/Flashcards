import React from "react";
import { Drawer } from "@mui/material";

type DrawerComponentProps = {
  open: boolean;
  toggleDrawer: () => void;
};

export default function DrawerComponent({
  open,
  toggleDrawer,
}: DrawerComponentProps) {
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
      </Drawer>
    </div>
  );
}
