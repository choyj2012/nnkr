import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import Providers from "@/components/Login/Providers";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <Providers>
          <div className="flex flex-col border-8 border-green-700 relative min-h-full">
            <div className="flex flex-col flex-grow w-[95%] md:w-4/5 lg:w-2/3 mx-auto">
              <Header></Header>
              <div className="">
                <ReactQueryProvider>
                  {children}
                  <ReactQueryDevtools/>
                </ReactQueryProvider>
              </div>
              {/* <Footer></Footer> */}
            </div>
          </div>
        </Providers>
        <SpeedInsights/>
      </body>
    </html>
  );
}
