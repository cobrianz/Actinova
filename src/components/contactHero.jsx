"use client";

import { motion } from "framer-motion";
import { Sparkle, Star, Code, Lightning } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { heroData } from "../lib/contactData";

const iconMap = {
  Lightning,
  Code,
  Star,
  Sparkle,
};

export default function ContactHero() {
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

  const BadgeIcon = iconMap[heroData.badge.icon];

  return (
    <section className="bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#7B68EE]/3 to-transparent rounded-full"></div>

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#7B68EE]/20 rounded-full"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + (i % 2),
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full mb-6">
              <BadgeIcon size={16} weight="fill" className="text-[#7B68EE]" />
              <span className="text-sm font-medium text-[#7B68EE]">
                {heroData.badge.text}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {heroData.title.main}{" "}
              <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
                {heroData.title.highlight}
              </span>{" "}
              {heroData.title.end}
            </h1>

            <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              {heroData.description}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {heroData.services.map((service, index) => {
              const ServiceIcon = iconMap[service.icon];
              return (
                <Badge
                  key={index}
                  className="bg-gradient-to-r from-[#7B68EE]/20 to-[#9333EA]/20 text-[#7B68EE] border border-[#7B68EE]/30 px-4 py-2"
                >
                  <ServiceIcon size={16} className="mr-2" />
                  {service.text}
                </Badge>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <p className="text-lg text-zinc-400 mb-2">
              {heroData.contact.location}
            </p>
            <p className="text-lg text-zinc-400">{heroData.contact.email}</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
