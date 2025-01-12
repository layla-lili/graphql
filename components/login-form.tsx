// app/components/LoginForm.tsx
"use client"; // Ensure this directive is here

import axios from "axios"; // Import Axios
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Make sure to import from next/navigation
import { useAuth } from "@/context/authContext"; // Import the context


export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [message, setMessage] = useState<string>("");
  const router = useRouter(); // Use the router hook
  const { setToken } = useAuth(); // Access setToken from context


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
    const form = event.currentTarget;
    const identifier = form.username.value; // This will handle both username and email
    const password = form.password.value;

    try {
      const response = await axios.post(
        "https://learn.reboot01.com/api/auth/signin",
        {},
        {
          headers: {
            Authorization: "Basic " + btoa(`${identifier}:${password}`),
          },
        }
      );

      console.log("API Response:", response.data); // Log the entire response data

      // Check if the response contains a token
      if (response.status === 200) {
        const token = response.data;
        if (token) {
          setToken(token); // This will handle both state and cookie storage
          localStorage.setItem("JWT", token); // Save token in localStorage
          router.push("/");
        } else {
          throw new Error("Token not found in response");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      console.error("Login error:", error); // Log the error for debugging
      setMessage(error?.response?.data?.message || error?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-1/2 ", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username or email to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username or Email</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username or email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              {message && <p className="text-red-500">{message}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}