"use client";

import { motion } from "framer-motion";
import {
  Code,
  PuzzlePiece,
  Cpu,
  Users,
  ArrowRight,
  Sparkle,
} from "@phosphor-icons/react";
import servicesData from "../lib/ServiceData";

const iconMap = {
  PuzzlePiece: PuzzlePiece,
  Code: Code,
  Cpu: Cpu,
  Users: Users,
};

export default function AboutServices() {
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

        {/* Tech Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 text-[#7B68EE] text-6xl font-mono">
            {"<>"}
          </div>
          <div className="absolute top-40 right-32 text-[#9333EA] text-4xl font-mono">
            {"API"}
          </div>
          <div className="absolute bottom-32 left-40 text-[#7B68EE] text-5xl font-mono">
            {"{ }"}
          </div>
          <div className="absolute bottom-20 right-20 text-[#9333EA] text-3xl font-mono">
            {"fn()"}
          </div>
        </div>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full mb-6">
            <Sparkle size={16} weight="fill" className="text-[#7B68EE]" />
            <span className="text-sm font-medium text-[#7B68EE]">
              Our Expertise
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            What We{" "}
            <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
              Build
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            From simple API integrations to complex enterprise software
            solutions, we deliver technology that scales with your business.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7B68EE]/10 via-[#9333EA]/5 to-[#7B68EE]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                <div className="relative bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 rounded-3xl p-8 backdrop-blur-sm group-hover:border-[#7B68EE]/30 transition-all duration-500 h-full">
                  {/* Top Border Gradient */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  {/* Icon */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-[#7B68EE]/20 to-[#9333EA]/20 border border-[#7B68EE]/30 rounded-3xl flex items-center justify-center group-hover:from-[#7B68EE]/30 group-hover:to-[#9333EA]/30 group-hover:border-[#7B68EE]/50 transition-all duration-500">
                      <IconComponent
                        size={32}
                        className="text-[#7B68EE] group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-[#7B68EE]/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#7B68EE] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300"
                      >
                        <div className="w-1.5 h-1.5 bg-[#7B68EE] rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    className="inline-flex items-center gap-2 text-[#7B68EE] hover:text-white font-medium transition-colors duration-300 group/btn"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-gradient-to-r from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
              Let's discuss how our API integrations and custom software
              development can accelerate your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#7B68EE]/25 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
                <ArrowRight size={16} />
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-[#7B68EE] text-[#7B68EE] font-semibold rounded-full hover:bg-[#7B68EE] hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
