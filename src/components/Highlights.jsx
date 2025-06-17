"use client";

import { motion } from "framer-motion";
import highlightData from "../lib/highlightData";
import {
  Lightning,
  MagicWand,
  ChatCenteredDots,
  PuzzlePiece,
  Brain,
  ShieldCheck,
  Sparkle,
  Star,
} from "@phosphor-icons/react";

const icons = {
  Lightning: Lightning,
  PuzzlePiece: PuzzlePiece,
  ChatCenteredDots: ChatCenteredDots,
  MagicWand: MagicWand,
  Brain: Brain,
  ShieldCheck: ShieldCheck,
};

export default function Highlights() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#7B68EE]/3 to-transparent rounded-full"></div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#7B68EE]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div
          variants={headerVariants}
          className="max-w-5xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full mb-6">
            <Star size={16} weight="fill" className="text-[#7B68EE]" />
            <span className="text-sm font-medium text-[#7B68EE]">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Platform{" "}
            <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
              Highlights
            </span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Why businesses trust Actinova: speed, flexibility, modern design,
            and expert support—delivered securely.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {highlightData.map((item, index) => {
            const IconComponent = icons[item.icon];

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7B68EE]/10 via-[#9333EA]/5 to-[#7B68EE]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                {/* Card */}
                <div className="relative bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 rounded-2xl p-8 backdrop-blur-sm group-hover:border-[#7B68EE]/30 transition-all duration-500 overflow-hidden">
                  {/* Top Border Gradient */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#7B68EE] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating Sparkles */}
                  <motion.div
                    className="absolute top-4 right-4 text-[#7B68EE]/20 group-hover:text-[#7B68EE]/60"
                    animate={{
                      rotate: [0, 360],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkle size={16} weight="fill" />
                  </motion.div>

                  {/* Icon Container */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#7B68EE]/20 to-[#9333EA]/20 border border-[#7B68EE]/30 rounded-2xl flex items-center justify-center group-hover:from-[#7B68EE]/30 group-hover:to-[#9333EA]/30 group-hover:border-[#7B68EE]/50 transition-all duration-500">
                      <IconComponent
                        size={28}
                        className="text-[#7B68EE] group-hover:text-white transition-colors duration-300"
                      />
                    </div>

                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-[#7B68EE]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#7B68EE] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7B68EE]/0 via-[#7B68EE]/50 to-[#9333EA]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Corner Decoration */}
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#7B68EE]/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 rounded-full backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-zinc-400">
                All features included
              </span>
            </div>
            <div className="w-px h-4 bg-zinc-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
              <span className="text-sm text-zinc-400">24/7 support</span>
            </div>
            <div className="w-px h-4 bg-zinc-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
              <span className="text-sm text-zinc-400">99.9% uptime</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
