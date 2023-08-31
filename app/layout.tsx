import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./navbar/Navbar";
import Footer from "./footer";
import SessionProvider  from "@/app/SessionProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Logi-Tech",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {/* @ts-expect-error Async Server Component */}
          <Navbar />
          <main className="p-4 max-w-7xl m-auto min-w-min">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
