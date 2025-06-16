"use client";

import React from "react";

const logos = [
  { name: "Email", src: "gmail.svg" },
  { name: "Stripe", src: "stripe.svg" },
  { name: "PayPal", src: "paypal.svg" },
  { name: "OpenAI", src: "openai.svg" },
  { name: "Slack", src: "slack.svg" },
  { name: "Zoom", src: "zoom.svg" },
];

export default function CompanyLogoSlider() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100px", backgroundColor: "#0D0F20" }}
    >
      {/* Left and right fade overlays */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-[#0D0F20] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-[#0D0F20] to-transparent" />

      {/* Infinite sliding container */}
      <div className="flex items-center gap-[200px] px-24 w-max animate-marquee">
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="inline-block">
            <img
              src={logo.src}
              alt={logo.name}
              className="h-12 w-auto filter grayscale opacity-50 hover:opacity-100 transition duration-300"
            />
          </div>
        ))}
      </div>

      {/* Animation keyframes */}
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
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
