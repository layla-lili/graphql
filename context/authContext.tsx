"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { decodeJwt } from "@/app/ApolloWrapper";
import Cookies from "js-cookie"; // Using js-cookie for cookie handling
import { useRouter } from "next/navigation"; // Ensure correct import for next/navigation

interface AuthContextType {
  token: string | null;
  UserID: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [UserID, setUserId] = useState<string | null>(null);
  const router = useRouter(); // Next.js router

  // Effect to load the token and user ID on mount
  useEffect(() => {
    const getTokenFromCookie = () => {
      return Cookies.get("JWT") || null; // Read the JWT token from cookies
    };

    const savedToken = getTokenFromCookie();
    if (savedToken && !token) {
      setTokenState(savedToken); // Set the token state
      const userId = decodeJwt(savedToken)?.sub || null; // Decode token and get user ID
      setUserId(userId); // Set user ID
    }
  }, []); // Only run once on mount

  const setToken = (newToken: string | null) => {
    if (newToken) {
      const userId = decodeJwt(newToken)?.sub || null;
      setUserId(userId); // Set the user ID

      // Save token and user ID to cookies
      const expiration = new Date(new Date().getTime() + 60 * 60 * 1000).toUTCString(); // Token expiration (1 hour)
      Cookies.set("JWT", newToken, { expires: new Date(expiration), path: "/", secure: true, sameSite: "Strict" });
      Cookies.set("Id", userId, { expires: new Date(expiration), path: "/", secure: true, sameSite: "Strict" });

      // Navigate to "/" page
      router.push("/");

      
    } else {
      // Clear cookies if no token is provided
      Cookies.remove("JWT");
      Cookies.remove("Id");
    }
    setTokenState(newToken); // Update state with the new token
  };

  const clearToken = () => {
    setTokenState(null);
    setUserId(null);
    Cookies.remove("JWT");
    Cookies.remove("Id");
  };

  return (
    <AuthContext.Provider value={{ token, UserID, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
