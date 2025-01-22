"use client"; // Ensure this directive is here

import axios, { AxiosError } from "axios"; // Import Axios and AxiosError
import { useState } from "react";
import Image from "next/image";
// import { useRouter } from "next/navigation"; // Make sure to import from next/navigation
import { useAuth } from "@/context/authContext"; // Import the context

export default function LoginForm() {
  const [message, setMessage] = useState<string>("");
  // const router = useRouter(); // Use the router hook
  const { setToken } = useAuth(); // Access setToken from context

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const identifier = form.username.value;
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

      if (response.status === 200) {
        const token = response.data;
        console.log("Token from login:", token);
        if (token) {
          setToken(token); // Set token and user ID in context and cookie
          // router.push("/");
        
        } else {
          throw new Error("Token not found in response");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      setMessage(
        (axiosError?.response?.data &&
        typeof axiosError.response.data === "object" &&
        "message" in axiosError.response.data
          ? (axiosError.response.data as { message: string }).message
          : null) ||
          axiosError?.message ||
          "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
        <Image
          src="https://readymadeui.com/image-3.webp"
          layout="responsive"
          width={800}
          height={1200}
          objectFit="cover"
          className="w-full min-h-screen object-cover"
          alt="login-image"
        />

        <form className="max-w-xl w-full p-6 mx-auto" onSubmit={handleSubmit}>
          <div className="mb-12">
            <h3 className="text-indigo-500 text-4xl font-extrabold">Sign in</h3>
          </div>

          <div>
            <label className="text-white text-sm block mb-2">Email</label>
            <div className="relative flex items-center">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username or email"
                required
                className="w-full text-sm text-white border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="text-white text-sm block mb-2">Password</label>
            <div className="relative flex items-center">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter password"
                className="w-full text-sm text-white border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
              />
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none"
            >
              Sign in
            </button>
            {message && <p className="text-red-500 text-sm">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
