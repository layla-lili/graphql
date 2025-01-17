/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts",'ts','tsx'],
  images: {
    domains: ['avatar.vercel.sh', 'readymadeui.com'], // Add your external hostnames here
  },
};

export default nextConfig;
