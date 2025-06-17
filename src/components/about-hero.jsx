"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Lightning,
  Users,
  Sparkle,
} from "@phosphor-icons/react";
import aboutHeroData from "../lib/aboutHeroData";

const iconMap = {
  Users: Users,
  Code: Code,
  Lightning: Lightning,
  Sparkle: Sparkle,
};

export default function AboutHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative bg-gradient-to-br  from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white py-48 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#7B68EE]/5 to-transparent rounded-full"></div>

        {/* Floating Code Elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#7B68EE]/20 text-xs font-mono"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + (i % 4),
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          >
            {["</>", "API", "{}", "[]", "fn()", "=>", "&&", "||"][i % 8]}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Content */}
        <div className="text-center mb-16">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full mb-6">
              <Sparkle size={16} weight="fill" className="text-[#7B68EE]" />
              <span className="text-sm font-medium text-[#7B68EE]">
                {aboutHeroData.badge.text}
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            {aboutHeroData.headline.main}{" "}
            <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
              {aboutHeroData.headline.highlight}
            </span>{" "}
            {aboutHeroData.headline.suffix}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            {aboutHeroData.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              className="group px-8 py-4 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(123, 104, 238, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {aboutHeroData.cta.primary.text}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </motion.button>

            <motion.button
              className="group px-8 py-4 bg-transparent border-2 border-zinc-600 text-white font-semibold rounded-full hover:border-[#7B68EE] hover:bg-[#7B68EE]/10 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code size={20} className="text-[#7B68EE]" />
              {aboutHeroData.cta.secondary.text}
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {aboutHeroData.stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon];
            return (
              <motion.div
                key={stat.label}
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#7B68EE]/20 to-[#9333EA]/20 border border-[#7B68EE]/30 rounded-2xl flex items-center justify-center mx-auto group-hover:from-[#7B68EE]/30 group-hover:to-[#9333EA]/30 group-hover:border-[#7B68EE]/50 transition-all duration-500">
                    <IconComponent
                      size={28}
                      className="text-[#7B68EE] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[#7B68EE]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
