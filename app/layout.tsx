import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NNKR",
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
        <div className="border-8 border-green-700 relative min-h-full flex flex-col">
          <Header></Header>
          <div className="flex-grow w-10/12 md:w-4/5 lg:w-2/3 mx-auto">
            {children}
          </div>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
