import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {ClerkProvider} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: {
    template:"Online shop",
    default:"Shop online",
  },
  description: "Shop from Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>   
        <Header/>
          <div className="flex flex-col ">
            {/* min-h-screen */}
            <main>
              {children}
             </main>
          </div>      
        <Footer/>
    </ClerkProvider>
  );
}
