import React, { createContext, useState, useContext } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import AlertToast from "../components/AlertToast/AlertToast";

type ToastProps = {
  success: boolean;
  message: string;
  show: boolean;
};

type AlertContextType = Dispatch<SetStateAction<ToastProps>>;

const AlertContext = createContext<AlertContextType | undefined>(undefined);

type AlertProviderProps = {
  children: ReactNode;
};

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [toastProps, setToastProps] = useState<ToastProps>({
    success: false,
    message: "",
    show: false,
  });

  return (
    <AlertContext.Provider value={setToastProps}>
      {children}
      <AlertToast
        success={toastProps.success}
        message={toastProps.message}
        show={toastProps.show}
        onClose={() => setToastProps((prev) => ({ ...prev, show: false }))}
      />
    </AlertContext.Provider>
  );
};

// Hook for using the alert system
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
