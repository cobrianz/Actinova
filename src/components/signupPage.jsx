"use client";

import SignupSection from "./SignupSection";
import { motion } from "framer-motion";
import { Code, Lightning, Gear } from "@phosphor-icons/react";

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

export default function SignupPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center pt-[6rem] bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#7B68EE]/5 to-transparent rounded-full"></div>

        {/* Floating Icons */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 text-[#7B68EE]/30"
        >
          <Code size={32} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-32 right-16 text-[#9333EA]/30"
          style={{ animationDelay: "2s" }}
        >
          <Lightning size={28} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-32 left-20 text-[#7B68EE]/30"
          style={{ animationDelay: "4s" }}
        >
          <Gear size={24} />
        </motion.div>

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #7B68EE 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            backgroundPosition: "0 0, 25px 25px",
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full">
        <SignupSection />
      </div>
    </main>
  );
}
