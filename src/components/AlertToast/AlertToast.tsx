import React, { useEffect, useState } from "react";

type AlertToastProps = {
  success: boolean;
  message: string;
  show: boolean;
  onClose?: () => void;
};

const AlertToast: React.FC<AlertToastProps> = ({
  success,
  message,
  show,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(show);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (show) {
      setIsVisible(true);
      setAnimateOut(false);
      timer = setTimeout(() => {
        setAnimateOut(true);
        setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, 500);
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-6 inset-x-0 flex justify-center z-50">
      <div
        className={`
          max-w-md w-full rounded-lg shadow-lg px-4 py-3
          text-white font-medium
          ${success ? "bg-green-600" : "bg-red-600"}
          ${animateOut ? "animate-toast-out" : "animate-toast-in"}
        `}
      >
        <div className="flex items-start justify-between">
          <span>{message}</span>
          <button
            className="ml-4 text-white hover:text-gray-200"
            onClick={() => {
              setAnimateOut(true);
              setTimeout(() => {
                setIsVisible(false);
                onClose?.();
              }, 500);
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertToast;
