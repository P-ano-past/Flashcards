import React, { createContext, useState, useEffect } from "react";
import UserRoutes from "../Utils/UserRoutes";
import type { UserProfile, AuthContextType } from "../Utils/types/api";
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const checkAuthStatus = async () => {
    console.log("checking cookie for access token", document.cookie);
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));

      if (accessToken) {
        const token = accessToken.split("=")[1];

        const response = await UserRoutes.getProfile(token);
        console.log("response from UserContext:", response.data);
        setUserProfile(response.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error checking authentication status", error);
      setIsAuthenticated(false);
      setUserProfile(null);
    }
  };

  // Use effect to run the check on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userProfile,
        setIsAuthenticated,
        setUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
