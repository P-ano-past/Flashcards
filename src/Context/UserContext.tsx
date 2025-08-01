import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { UserProfile } from "../Utils/types/api";

// Step 1: Define the context type
interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

// Step 2: Create the context with the correct type
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Step 3: Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Step 4: Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Function to check for the access token cookie and fetch user profile
  const checkAuthStatus = async () => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));

      if (accessToken) {
        const token = accessToken.split("=")[1];

        // Fetch user profile with the access token
        const response = await axios.get("/api/user/account/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token to the backend
          },
        });
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

  // Run check on app load
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
