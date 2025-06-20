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
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

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

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const deltaX = touchEndX.current - touchStartX.current;
      const swipeThreshold = 50; // Minimum swipe distance in pixels
      if (deltaX > swipeThreshold) {
        handlePrev();
      } else if (deltaX < -swipeThreshold) {
        handleNext();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
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
    <section className="relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-[#7B68EE]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-[#9333EA]/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-10 lg:mb-12"
          variants={itemVariants}
        >
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

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            What our{" "}
            <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
              customers
            </span>{" "}
            say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what real customers have to
            say about their experience.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div className="relative" variants={itemVariants}>
          <div className="relative w-full max-w-4xl mx-auto">
            <div
              className="relative h-[450px] sm:h-[400px] md:h-[420px] lg:h-[450px]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
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
                    <div className="absolute top-4 right-4 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gradient-to-br from-[#7B68EE]/10 to-[#9333EA]/10 rounded-full blur-xl"></div>

                    <div className="relative h-full flex flex-col sm:flex-row items-center p-4 sm:p-6 lg:p-8">
                      {/* Image */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex-shrink-0 mb-6 sm:mb-0 sm:mr-4 lg:mr-6 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                      >
                        <div className="relative w-full h-full">
                          <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-[#7B68EE]/30 shadow-xl">
                            <img
                              src={`/${testimonialsData[current].image}`}
                              alt={testimonialsData[current].name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Decorative gradient overlay */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#7B68EE]/15 via-transparent to-[#9333EA]/15 pointer-events-none"></div>
                          {/* Floating elements */}
                          <div className="absolute -top-2 -right-2 w-3 sm:w-4 h-3 sm:h-4 bg-[#7B68EE] rounded-full shadow-lg animate-pulse"></div>
                          <div className="absolute -bottom-2 -left-2 w-2 sm:w-3 h-2 sm:h-3 bg-[#9333EA] rounded-full shadow-lg animate-pulse delay-1000"></div>
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 text-center sm:text-left">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          className="mb-4 flex justify-center sm:justify-start"
                        >
                          <Quotes
                            size={28}
                            weight="fill"
                            className="text-[#7B68EE] opacity-80"
                          />
                        </motion.div>

                        <motion.h3
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-3 leading-tight"
                        >
                          {testimonialsData[current].title}
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="text-zinc-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4"
                        >
                          {testimonialsData[current].description}
                        </motion.p>

                        {/* Rating Stars */}
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="flex items-center justify-center sm:justify-start gap-1 mb-4"
                        >
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
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
                          className="flex items-center justify-center sm:justify-start gap-3"
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#7B68EE] to-[#9333EA] flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xs sm:text-sm">
                              {testimonialsData[current].name.charAt(0)}
                            </span>
                          </div>
                          <div className="text-center sm:text-left">
                            <div className="text-white font-semibold text-sm sm:text-base">
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

        {/* Navigation - Hidden on small screens */}
        <motion.div
          className="hidden sm:flex mt-6 sm:mt-8 flex-col items-center space-y-4 sm:space-y-0 sm:flex-row justify-center sm:gap-4 lg:gap-6"
          variants={itemVariants}
        >
          <motion.button
            onClick={handlePrev}
            className="group w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#0F172A] border border-zinc-600 hover:border-[#7B68EE] hover:bg-[#7B68EE]/10 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <ArrowLeft
              size={16}
              className="text-zinc-400 group-hover:text-[#7B68EE] transition-colors duration-300"
            />
          </motion.button>

          {/* Enhanced Dots */}
          <div className="flex gap-1 sm:gap-2">
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
                    ? "bg-[#7B68EE] w-6 sm:w-8 shadow-lg shadow-[#7B68EE]/50"
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
            className="group w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#0F172A] border border-zinc-600 hover:border-[#7B68EE] hover:bg-[#7B68EE]/10 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <ArrowRight
              size={16}
              className="text-zinc-400 group-hover:text-[#7B68EE] transition-colors duration-300"
            />
          </motion.button>
        </motion.div>

        {/* Progress Bar - Hidden on small screens */}
        <motion.div
          className="hidden sm:block mt-4 sm:mt-6 max-w-xs mx-auto"
          variants={itemVariants}
        >
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
