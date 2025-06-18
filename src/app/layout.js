import { Jost } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import CursorFollower from "@/components/CursorFollower";
import Navbar from "@/components/Navbar";
import TopLoader from "./../components/TopLoader";
import { Toaster } from "sonner";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jost.variable} antialiased bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] min-h-screen`}
      >
        <CursorFollower />
        <TopLoader />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <Toaster
          theme="dark"
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "linear-gradient(135deg, #0F172A 0%, #1e293b 100%)",
              border: "1px solid rgba(123, 104, 238, 0.2)",
              color: "#ffffff",
              backdropFilter: "blur(8px)",
            },
            className: "sonner-toast",
          }}
        />
      </body>
    </html>
  );
}
