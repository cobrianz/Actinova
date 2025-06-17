"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Lightbulb } from "@phosphor-icons/react";
import missionData from "../lib/missionData";

const iconMap = {
  Target: Target,
  Eye: Eye,
  Heart: Heart,
  Lightbulb: Lightbulb,
};

export default function AboutMission() {
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
              Purpose
            </span>{" "}
            & Values
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Built by developers, for businesses. We understand the challenges of
            modern software development and API integration.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {missionData.map((value, index) => {
            const IconComponent = iconMap[value.icon];
            return (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7B68EE]/10 via-[#9333EA]/5 to-[#7B68EE]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                <div className="relative bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 rounded-2xl p-8 backdrop-blur-sm group-hover:border-[#7B68EE]/30 transition-all duration-500">
                  {/* Top Border Gradient */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#7B68EE] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon */}
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
                    <div className="absolute inset-0 bg-[#7B68EE]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#7B68EE] transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                    {value.description}
                  </p>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7B68EE]/0 via-[#7B68EE]/50 to-[#9333EA]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
