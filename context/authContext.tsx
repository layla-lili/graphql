"use client"; // Ensures the code runs on the client side

import React, { createContext, useState, useContext, useEffect } from "react";

// Define types for the token and decoded token
interface AuthContextType {
  token: string | null;
  decodedToken: any; // You can type this more specifically if needed
  setToken: (token: string) => void;
  clearToken: () => void;
}

// Default values for the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<any>(null);

  // Save token to cookies if it changes
  useEffect(() => {
    console.log("Token has changed in context:", token); // Log the token when it changes
    if (token) {
      // Save to cookies or localStorage as needed
      document.cookie = `JWT=${token}; Path=/; Secure; SameSite=Strict; Expires=${new Date(new Date().getTime() + 60 * 60 * 1000).toUTCString()}`;
    } else {
      console.log("No token to save");
    }
  }, [token]);

  const setToken = (token: string | null) => {
    console.log("Setting token in AuthContext:", token); // Log when setting the token
    setTokenState(token);
  };

  useEffect(() => {
    const savedToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("JWT="))
      ?.split("=")[1];
    console.log("Token loaded from cookies:", savedToken); // Log token loading from cookies
    setToken(savedToken || null);
  }, []); // On mount, try loading the token from cookies

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
