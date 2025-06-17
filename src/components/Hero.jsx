"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkle,
  Lightning,
  Code,
  Gear,
} from "@phosphor-icons/react";
import ApiCodeShowcase from "./ApiCodeShowcase";
import CompanyLogoSlider from "./CompanyLogoSlider";

const Hero = () => {
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

  return (
    <section className="relative w-full bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
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

      <motion.div
        className="relative z-10 py-20 lg:py-32 text-center flex justify-center items-center flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-12 min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <motion.div
            className="inline-flex items-center mt-[4rem] gap-2 px-4 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full backdrop-blur-sm"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(123, 104, 238, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkle size={16} weight="fill" className="text-[#7B68EE]" />
            <span className="text-sm font-medium text-[#7B68EE]">
              Trusted by 500+ Companies
            </span>
            <ArrowRight size={14} className="text-[#7B68EE]" />
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mx-auto leading-tight">
            Seamless{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#7B68EE] via-[#9333EA] to-[#7B68EE] bg-clip-text text-transparent">
                API Integrations
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              />
            </span>{" "}
            &<br />
            Tech Advice for{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#9333EA] via-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
                Your Business
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#9333EA] to-[#7B68EE] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Actinova helps{" "}
            <span className="text-white font-semibold">
              startups and enterprises
            </span>{" "}
            automate workflows, integrate powerful APIs, and make smart software
            decisions — all in one place.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            className="group px-6 py-2 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(123, 104, 238, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Free
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.button>

          <motion.button
            className="group px-6 py-2 bg-transparent border-2 border-zinc-600 text-white font-semibold rounded-full hover:border-[#7B68EE] hover:bg-[#7B68EE]/10 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lightning size={20} className="text-[#7B68EE]" />
            See Demo
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-sm text-zinc-400">Companies Trust Us</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">99.9%</div>
            <div className="text-sm text-zinc-400">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-sm text-zinc-400">Expert Support</div>
          </div>
        </motion.div>

        {/* API Code Showcase */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-6xl mx-auto"
        >
          <div className="relative">
           
              <ApiCodeShowcase />
           
          </div>
        </motion.div>

        {/* Company Logo Slider */}
        <motion.div variants={itemVariants} className="w-full">
          <div className="mb-8">
          </div>
          <div className="relative">
            <CompanyLogoSlider />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="w-1 h-3 bg-[#7B68EE] rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
