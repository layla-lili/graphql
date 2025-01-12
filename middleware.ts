import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



// Define the middleware function
export function middleware(req: NextRequest) {
  // console.log("Middleware is running", req);
  // Check if the token is present in cookies
  const token = req.cookies.get("JWT");


  // console.log("Token from middleware:", token);  // Check if the token is being captured

  // If no token exists, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Otherwise, allow the request to proceed (keep user on the current page)
  return NextResponse.next();
}

// Apply the middleware to the homepage and any other protected routes
export const config = {
  matcher: ["/"],  // Apply middleware to the homepage and any protected pages
};
