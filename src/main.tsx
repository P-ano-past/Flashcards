import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AlertProvider } from "./Context/AlertContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AlertProvider>
  </StrictMode>
);
