"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import NProgress from "nprogress";

const TopLoader = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Configure NProgress with custom settings
    NProgress.configure({
      minimum: 0.3,
      easing: "ease",
      speed: 800,
      showSpinner: false,
      trickleSpeed: 200,
    });

    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 400);

    return () => {
      clearTimeout(timeout);
      NProgress.done();
    };
  }, [pathname]);

  return (
    <>
      {/* Custom NProgress Styles */}
      <style jsx global>{`
        /* NProgress Bar */
        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          background: linear-gradient(
            90deg,
            #7b68ee 0%,
            #9333ea 50%,
            #7b68ee 100%
          );
          position: fixed;
          z-index: 9999;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          border-radius: 0 0 2px 2px;
          box-shadow: 0 0 10px rgba(123, 104, 238, 0.5),
            0 0 20px rgba(123, 104, 238, 0.3);
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }

        /* Peg (the moving part) */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(123, 104, 238, 0.8) 100%
          );
          border-radius: 0 2px 2px 0;
          transform: rotate(3deg) translate(0px, -4px);
          animation: shimmer 1.5s ease-in-out infinite;
        }

        /* Spinner (if enabled) */
        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 9999;
          top: 20px;
          right: 20px;
        }

        #nprogress .spinner-icon {
          width: 24px;
          height: 24px;
          box-sizing: border-box;
          border: solid 3px transparent;
          border-top-color: #7b68ee;
          border-left-color: #7b68ee;
          border-radius: 50%;
          animation: nprogress-spinner 400ms linear infinite;
        }

        /* Custom Animations */
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 10px rgba(123, 104, 238, 0.5),
              0 0 20px rgba(123, 104, 238, 0.3);
          }
          100% {
            box-shadow: 0 0 15px rgba(123, 104, 238, 0.8),
              0 0 30px rgba(123, 104, 238, 0.5),
              0 0 40px rgba(147, 51, 234, 0.3);
          }
        }

        @keyframes shimmer {
          0% {
            opacity: 0.6;
            transform: rotate(3deg) translate(0px, -4px) scaleX(1);
          }
          50% {
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px) scaleX(1.2);
          }
          100% {
            opacity: 0.6;
            transform: rotate(3deg) translate(0px, -4px) scaleX(1);
          }
        }

        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Smooth transitions */
        #nprogress .bar {
          transition: width 0.4s ease-out;
        }

        /* Remove default styles */
        #nprogress .bar,
        #nprogress .peg {
          -webkit-transition: none !important;
          -moz-transition: none !important;
          -o-transition: none !important;
          transition: none !important;
        }

        /* Enhanced mobile styles */
        @media (max-width: 768px) {
          #nprogress .bar {
            height: 2px;
          }

          #nprogress .spinner {
            top: 15px;
            right: 15px;
          }

          #nprogress .spinner-icon {
            width: 20px;
            height: 20px;
            border-width: 2px;
          }
        }

        /* Dark mode compatibility */
        @media (prefers-color-scheme: dark) {
          #nprogress .bar {
            background: linear-gradient(
              90deg,
              #7b68ee 0%,
              #9333ea 50%,
              #7b68ee 100%
            );
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          #nprogress .bar {
            background: #7b68ee;
            box-shadow: none;
          }

          #nprogress .peg {
            background: linear-gradient(90deg, transparent 0%, #ffffff 100%);
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          #nprogress .bar {
            animation: none;
          }

          #nprogress .peg {
            animation: none;
          }

          #nprogress .spinner-icon {
            animation: nprogress-spinner 800ms linear infinite;
          }
        }
      `}</style>

      {/* Loading Indicator Overlay */}
      <AnimatePresence>
        <motion.div
          className="fixed top-0 left-0 w-full h-1 z-[9998] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#7B68EE]/10 to-transparent blur-sm" />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default TopLoader;
