import { Jost } from "next/font/google"; 
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CursorFollower from "@/components/CursorFollower";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Actinova – API Integration SaaS",
  description: "Software advice & integrations to grow your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"`${jost.variable} antialiased` 'animated-gradient min-h-screen text-white'"}>
        <CursorFollower />
        {children}
        <Footer />
      </body>
    </html>
  );
}
