import "aos/dist/aos.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/lib/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticateRoute from "@/components/Component/Authentication/Authentication";
import Authentication from "@/lib/Authentication";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gardenia",
  description: "Gardening blog app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Authentication>
        <html data-theme="light" lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <AuthenticateRoute>{children}</AuthenticateRoute>
            <ToastContainer />
          </body>
        </html>
      </Authentication>
    </Providers>
  );
}
