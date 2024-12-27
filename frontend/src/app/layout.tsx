import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "aixRT - AI Exchange Real-Time",
  description: "Real-time AI-powered monitoring and signals for Virtual Protocol agents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-aixrt-black`}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-gradient-to-br from-aixrt-black via-aixrt-navy/10 to-aixrt-purple/10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
