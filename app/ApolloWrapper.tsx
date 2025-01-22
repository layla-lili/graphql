"use client";

import { HttpLink } from "@apollo/client";
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from "@apollo/experimental-nextjs-app-support";
import React from "react";
import Cookies from "js-cookie";
import { NextPageContext } from "next";

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

function makeClient(context?: NextPageContext, token: string | null = null) {
  console.log("Creating Apollo client with token:", token);

  const httpLink = new HttpLink({
    uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
    headers: {
      // Only add Authorization header if token is available
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children, context }: ApolloWrapperProps) {
  
  const token = Cookies.get("JWT"); // Get token from cookies
  

  console.log("Retrieved token:", token); // Debugging

  // Create client whenever token changes
  const client = React.useMemo(() => makeClient(context, token), [context, token]);
  

  return <ApolloNextAppProvider makeClient={() => client}>{children}</ApolloNextAppProvider>;
}



// "use client";

// import { HttpLink } from "@apollo/client";
// import {
//   ApolloNextAppProvider,
//   ApolloClient,
//   InMemoryCache,
// } from "@apollo/experimental-nextjs-app-support";
// import { NextPageContext } from "next";
// import React from "react";
// import Cookies from 'js-cookie';

// interface ApolloWrapperProps {
//   children: React.ReactNode;
//   context?: NextPageContext;
// }



// export function decodeJwt(token: string | null | undefined) {
//   if (!token) return null;

//   const base64Url = token.split('.')[1]; // Get the payload part of the JWT
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64 URL to Base64
//   const decoded = atob(base64); // Decode the base64 string

//   return JSON.parse(decoded); // Parse it as JSON
// }



// // function makeClient(context?: NextPageContext, token: string | null = null) {
// //   console.log("Creating Apollo client with token:", token);


// //   const httpLink = new HttpLink({
// //     uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
// //     headers: {
// //       Authorization: token ? `Bearer ${token}` : "", // Attach token if present
// //     },
// //     fetchOptions: { cache: "no-store" },
// //   });

// //   return new ApolloClient({
// //     cache: new InMemoryCache(),
// //     link: httpLink,
// //   });
// // }
// function makeClient(context?: NextPageContext, token: string | null = null) {
//   console.log("Creating Apollo client with token:", token);

//   const httpLink = new HttpLink({
//     uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
//     headers: {
//       // Only set Authorization header if token is available
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//     fetchOptions: { cache: "no-store" },
//   });

//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: httpLink,
//   });
// }


// export function ApolloWrapper({ children, context }: ApolloWrapperProps) {

// //   const token = typeof window !== "undefined" ? localStorage.getItem("JWT") : null;
// // if (!token) {
// //   return <p>No token found. Please log in.</p>;
// // }

// const token = Cookies.get('JWT');
// console.log("Retrieved token:", token); // Log token for debugging

  
//   // Create client whenever token changes
//   const client = React.useMemo(
//     () => makeClient(context, token),
//     [context, token]
//   );
  
//   return (
//     <ApolloNextAppProvider makeClient={() => client}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// }
