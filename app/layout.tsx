"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/authContext";
import { ApolloWrapper } from "./ApolloWrapper";
// import { Metadata } from "next";
import { usePathname } from "next/navigation"; // Import useRouter
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//  const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter(); // Get router to access the current path
  const pathname = usePathname()

  // Check if we are on the login page
  const isLoginPage = pathname === "/login"; 

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {/* Conditionally wrap with ApolloWrapper based on the route */}
          {!isLoginPage ? (
            <ApolloWrapper>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <div className="md:container md:mx-auto">
                  <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    {children}
                  </main>
                </div>
              </ThemeProvider>
            </ApolloWrapper>
          ) : (
            <ThemeProvider>
            <div className="md:container md:mx-auto">
              <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                {children}
              </main>
            </div>
            </ThemeProvider>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
