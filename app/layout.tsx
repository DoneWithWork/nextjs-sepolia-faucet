import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import GoogleCaptchaWrapper from "./components/GoogleCaptchaWrapper";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "DoneWithWork Faucet",
  description: "Sepolia Eth faucet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-300`}>
        <GoogleCaptchaWrapper>
          <Navbar />
          <main className="max-w-6xl mx-auto p-4 ">{children}</main>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </GoogleCaptchaWrapper>
      </body>
    </html>
  );
}
