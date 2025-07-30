// src/context/HeadContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

interface HeadContextType {
  setTitle: (title: string) => void;
  setMeta: (name: string, content: string) => void;
}

const HeadContext = createContext<HeadContextType | undefined>(undefined);

export const HeadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [title, setTitleState] = useState<string>("");

  const setTitle = (newTitle: string) => {
    setTitleState(newTitle);
    document.title = newTitle;
  };

  const setMeta = (name: string, content: string) => {
    let meta = document.head.querySelector(
      `meta[name="${name}"]`
    ) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return (
    <HeadContext.Provider value={{ setTitle, setMeta }}>
      {children}
    </HeadContext.Provider>
  );
};

export const useHead = (): HeadContextType => {
  const context = useContext(HeadContext);
  if (!context) {
    throw new Error("useHead must be used within a HeadProvider");
  }
  return context;
};
