"use client"; // Ensures the code runs on the client side

import React, { createContext, useState, useContext, useEffect } from "react";

// Define types for the token and decoded token

interface DecodedTokenType {
  userId: string; // Example property
  // Add other properties that are part of your decoded token
}
export interface AuthContextType {
  token: string | null;
  decodedToken: DecodedTokenType; // You can type this more specifically if needed
  setToken: (token: string) => void;
  clearToken: () => void;
}

// Default values for the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<any>(null);

  // Single useEffect to handle token initialization and updates
  useEffect(() => {
    const getTokenFromCookie = () => {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith("JWT="))
        ?.split("=")[1] || null;
    };

    // Initialize token from cookie
    const savedToken = getTokenFromCookie();
    if (savedToken && !token) {
      setTokenState(savedToken);
    }
  }, []); // Only run on mount

  const setToken = (newToken: string | null) => {
    console.log("Setting token in AuthContext:", newToken);
    if (newToken) {
      // Save to cookie when token is set
      const expiration = new Date(new Date().getTime() + 60 * 60 * 1000).toUTCString();
      document.cookie = `JWT=${newToken}; Path=/; Secure; SameSite=Strict; Expires=${expiration}`;
    } else {
      // Clear cookie when token is null
      document.cookie = "JWT=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    setTokenState(newToken);
  };

  const clearToken = () => {
    setTokenState(null);
    setDecodedToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, decodedToken, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  console.log("AuthContext:", context); // Log the entire context to see the token state
  return context;
};



