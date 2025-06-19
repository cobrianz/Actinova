import { Jost } from "next/font/google";
import "./globals.css";
import CursorFollower from "@/components/CursorFollower";
import TopLoader from "@/components/TopLoader";
import  Navbar  from '@/components/Navbar';
import Footer from "@/components/Footer";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Actinova – Technologies ltd",
  description: "Software advice & integrations to grow your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jost.variable} antialiased bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] min-h-screen`}
      >
        <CursorFollower />
        <TopLoader />
       <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
