"use client";

import { motion } from "framer-motion";
import { TrendUp } from "@phosphor-icons/react";

const logos = [
  { name: "Gmail", src: "gmail.svg" },
  { name: "Stripe", src: "stripe.svg" },
  { name: "PayPal", src: "paypal.svg" },
  { name: "OpenAI", src: "openai.svg" },
  { name: "Slack", src: "slack.svg" },
  { name: "Zoom", src: "zoom.svg" },
];

export default function CompanyLogoSlider() {
  return (
    <div className="relative w-full py-8 ">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#7B68EE]/20 rounded-full mb-3">
          <TrendUp size={14} weight="fill" className="text-[#7B68EE]" />
          <span className="text-xs font-medium text-[#7B68EE]">
            Trusted Integrations
          </span>
        </div>
        <p className="text-zinc-400 text-sm">
          Join thousands of companies already using our platform
        </p>
      </div>

      {/* Logo Slider */}
      <div className="relative flex items-center overflow-hidden" style={{ height: "80px" }}>
        {/* Fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0D0F20] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#160D2A] to-transparent z-10 pointer-events-none"></div>

        {/* Sliding logos */}
        <div className="flex items-center gap-12 animate-marquee">
          {[...logos, ...logos].map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="flex-shrink-0">
              <img
                src={`/${logo.src}`}
                alt={logo.name}
                className="h-8 w-auto filter grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-8">
        <p className="text-zinc-400 text-sm mb-4">
          Don't see your favorite tool?
        </p>
        <motion.button
          className="px-6 py-2 bg-transparent border border-zinc-600 text-zinc-300 font-medium rounded-full hover:border-[#7B68EE] hover:text-[#7B68EE] transition-all duration-300 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Request Integration
        </motion.button>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
          padding: 0 4rem;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
