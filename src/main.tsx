import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AlertProvider } from "./Context/AlertContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { HeadProvider } from "./Context/HeadContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertProvider>
      <HeadProvider>
        <App />
      </HeadProvider>
    </AlertProvider>
  </StrictMode>
);
