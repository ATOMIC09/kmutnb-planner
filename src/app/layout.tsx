import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Navbar from '../app/components/Navbar';
import Footer from '../app/components/Footer';
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

export const metadata: Metadata = {
  title: "KMUTNB Planner",
  description: "Simple course planner before registration for KMUTNB students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Analytics/>
        <Footer />
        </body>
    </html>
  );
}
