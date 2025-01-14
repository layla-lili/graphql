"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { useAuth } from "@/context/authContext"; // Import the useAuth hook
import { NextPageContext } from "next";
import React from "react";

interface ApolloWrapperProps {
  children: React.ReactNode;
  context?: NextPageContext;
}

export function decodeJwt(token: string | null | undefined) {
  if (!token) return null;

  const base64Url = token.split('.')[1]; // Get the payload part of the JWT
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64 URL to Base64
  const decoded = atob(base64); // Decode the base64 string

  return JSON.parse(decoded); // Parse it as JSON
}

// function makeClient(context?: NextPageContext, token: string | null = "") {
    
//   const decodedToken = decodeJwt(token);
//   console.log("Decoded JWT:", decodedToken);
//   console.log("context from makeclient", context);

//   const httpLink = new HttpLink({
//     uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql", // Your GraphQL API URL
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "", // Attach token if present
//     },
//     fetchOptions: { cache: "no-store" }, // Disable caching (optional)
//   });

//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: httpLink,
//   });
// }

function makeClient(context?: NextPageContext, token: string | null = null) {
  const decodedToken = decodeJwt(token);
  console.log("Decoded JWT:", decodedToken);
  console.log("context from makeclient", context);

  const httpLink = new HttpLink({
    uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql", // Your GraphQL API URL
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // Attach token if present
    },
    fetchOptions: { cache: "no-store" }, // Disable caching (optional)
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}


export function ApolloWrapper({ children, context }: ApolloWrapperProps) {
  // const { token } = useAuth();
  let token = localStorage.getItem("JWT");
  
  // Create client whenever token changes
  const client = React.useMemo(
    () => makeClient(context, token),
    [context, token]
  );
  
  return (
    <ApolloNextAppProvider makeClient={() => client}>
      {children}
    </ApolloNextAppProvider>
  );
}
