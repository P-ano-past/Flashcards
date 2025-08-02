import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AlertProvider } from "./Context/AlertContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { HeadProvider } from "./Context/HeadContext.tsx";
import { UserProvider } from "./Context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <AlertProvider>
        <HeadProvider>
          <App />
        </HeadProvider>
      </AlertProvider>
    </UserProvider>
  </StrictMode>
);
