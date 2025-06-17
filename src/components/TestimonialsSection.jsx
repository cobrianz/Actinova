"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quotes, Star } from "@phosphor-icons/react";
import testimonialsData from "../lib/testimonialsData";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const total = testimonialsData.length;
  const timeoutRef = useRef(null);
  const direction = useRef(0);

  const clearAuto = () =>
    timeoutRef.current && clearTimeout(timeoutRef.current);

  useEffect(() => {
    clearAuto();
    timeoutRef.current = setTimeout(() => {
      direction.current = 1;
      setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearAuto();
  }, [current, total]);

  const handlePrev = () => {
    clearAuto();
    direction.current = -1;
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    clearAuto();
    direction.current = 1;
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-16 px-4 bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7B68EE]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#9333EA]/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="relative max-w-6xl mx-auto p-[8rem]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Star size={14} weight="fill" className="text-[#7B68EE]" />
            <span className="text-xs font-medium text-[#7B68EE]">
              Customer Stories
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            What our{" "}
            <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
              customers
            </span>{" "}
            say
          </h2>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what real customers have to
            say about their experience.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div className="relative" variants={itemVariants}>
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative h-[500px] sm:h-[450px] md:h-[450px]">
              <AnimatePresence
                initial={false}
                custom={direction.current}
                mode="wait"
              >
                <motion.div
                  key={current}
                  custom={direction.current}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className="relative h-full bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#7B68EE] via-[#9333EA] to-[#7B68EE]"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-[#7B68EE]/10 to-[#9333EA]/10 rounded-full blur-xl"></div>

                    <div className="relative h-full flex flex-col md:flex-row items-center p-6 md:p-8 lg:p-10">
                      {/* Image - Mobile First */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex-shrink-0 mb-6 md:mb-0 md:order-2 md:ml-6 lg:ml-8"
                      >
                        <div className="relative">
                          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border-2 border-[#7B68EE]/30 shadow-xl mx-auto">
                            <img
                              src={`/${testimonialsData[current].image}`}
                              alt={testimonialsData[current].name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Decorative gradient overlay */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#7B68EE]/15 via-transparent to-[#9333EA]/15 pointer-events-none"></div>
                          {/* Floating elements */}
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#7B68EE] rounded-full shadow-lg animate-pulse"></div>
                          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#9333EA] rounded-full shadow-lg animate-pulse delay-1000"></div>
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 md:order-1 text-center md:text-left">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          className="mb-4 flex justify-center md:justify-start"
                        >
                          <Quotes
                            size={36}
                            weight="fill"
                            className="text-[#7B68EE] opacity-80"
                          />
                        </motion.div>

                        <motion.h3
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight"
                        >
                          {testimonialsData[current].title}
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed mb-5"
                        >
                          {testimonialsData[current].description}
                        </motion.p>

                        {/* Rating Stars */}
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="flex items-center justify-center md:justify-start gap-1 mb-4"
                        >
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              weight="fill"
                              className="text-yellow-400"
                            />
                          ))}
                          <span className="ml-2 text-zinc-400 text-xs">
                            5.0 out of 5
                          </span>
                        </motion.div>

                        {/* Author Info */}
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                          className="flex items-center justify-center md:justify-start gap-3"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7B68EE] to-[#9333EA] flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">
                              {testimonialsData[current].name.charAt(0)}
                            </span>
                          </div>
                          <div className="text-center md:text-left">
                            <div className="text-white font-semibold text-base">
                              {testimonialsData[current].name}
                            </div>
                            <div className="text-[#7B68EE] text-xs font-medium">
                              {testimonialsData[current].position}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="mt-8 flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row justify-center sm:gap-6"
          variants={itemVariants}
        >
          <motion.button
            onClick={handlePrev}
            className="group w-10 h-10 flex items-center justify-center rounded-full bg-[#0F172A] border border-zinc-600 hover:border-[#7B68EE] hover:bg-[#7B68EE]/10 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <ArrowLeft
              size={18}
              className="text-zinc-400 group-hover:text-[#7B68EE] transition-colors duration-300"
            />
          </motion.button>

          {/* Enhanced Dots */}
          <div className="flex gap-2">
            {testimonialsData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  clearAuto();
                  direction.current = index > current ? 1 : -1;
                  setCurrent(index);
                }}
                className={`relative h-2 rounded-full transition-all duration-500 ${
                  current === index
                    ? "bg-[#7B68EE] w-8 shadow-lg shadow-[#7B68EE]/50"
                    : "bg-zinc-600 hover:bg-zinc-500 w-2"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {current === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={handleNext}
            className="group w-10 h-10 flex items-center justify-center rounded-full bg-[#0F172A] border border-zinc-600 hover:border-[#7B68EE] hover:bg-[#7B68EE]/10 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <ArrowRight
              size={18}
              className="text-zinc-400 group-hover:text-[#7B68EE] transition-colors duration-300"
            />
          </motion.button>
        </motion.div>

        {/* Progress Bar */}
        <motion.div className="mt-6 max-w-xs mx-auto" variants={itemVariants}>
          <div className="h-0.5 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#7B68EE] to-[#9333EA]"
              initial={{ width: "0%" }}
              animate={{ width: `${((current + 1) / total) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-xs text-zinc-500">
            <span>
              {current + 1} of {total}
            </span>
            <span>Stories</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
