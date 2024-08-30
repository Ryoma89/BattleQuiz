import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../components/layouts/Header";
import { Toaster } from "@/components/ui/toaster";
import SideBar from "../components/layouts/SideBar";
import Footer from "../components/layouts/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Battle Quiz",
  description: "Battle quiz app",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mt-[74px] flex flex-col min-h-screen">
        <div className="md:grid md:grid-cols-[250px_1fr] flex-1">
          <div className="hidden md:block md:h-full  md:border-r">
            <div className="md:mx-auto md:max-w-[173px]">
              <SideBar />
            </div>
          </div>
          <div className="md:col-span-1">
            {children}
            <Toaster />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
