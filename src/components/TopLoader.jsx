"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../styles/nprogress.css"; // Optional override

const TopLoader = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300); // Simulate loading for smooth UX

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
};

export default TopLoader;
