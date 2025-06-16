import { Jost } from "next/font/google";
import "./globals.css";
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
    <html lang="en" className={jost.variable}>
      <body className="animated-gradient antialiased text-white min-h-screen relative">
        <CursorFollower />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
