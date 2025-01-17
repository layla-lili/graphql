"use client"; // Ensure this directive is here

import axios, { AxiosError } from "axios"; // Import Axios and AxiosError
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Make sure to import from next/navigation
 import { useAuth } from "@/context/authContext"; // Import the context

export default function LoginForm() {
  const [message, setMessage] = useState<string>("");
  const router = useRouter(); // Use the router hook
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
        if (token) {
          setToken(token); // Set token in context and cookie
          router.push("/");
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-[18px] h-[18px] absolute right-2"
              viewBox="0 0 682.667 682.667"
            >
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                </clipPath>
              </defs>
              <g
                clipPath="url(#a)"
                transform="matrix(1.33 0 0 -1.33 0 682.667)"
              >
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="40"
                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  data-original="#000000"
                ></path>
                <path
                  d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
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

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
              viewBox="0 0 128 128"
            >
              <path
                d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                data-original="#000000"
              ></path>
            </svg>
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
