"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quotes } from "@phosphor-icons/react";
import testimonialsData from "../lib/testimonialsData";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const total = testimonialsData.length;
  const timeoutRef = useRef(null);

  const clearAuto = () =>
    timeoutRef.current && clearTimeout(timeoutRef.current);

  useEffect(() => {
    clearAuto();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearAuto();
  }, [current, total]);

  const handlePrev = () => {
    clearAuto();
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    clearAuto();
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const getVisibleTestimonials = () => {
    const testimonials = [];
    for (let i = -1; i <= 1; i++) {
      const index = (current + i + total) % total;
      testimonials.push({
        ...testimonialsData[index],
        position: i,
        index: index,
      });
    }
    return testimonials;
  };

  const cardVariants = {
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 2,
    },
    left: {
      x: -200,
      scale: 0.8,
      opacity: 0.4,
      zIndex: 1,
    },
    right: {
      x: 200,
      scale: 0.8,
      opacity: 0.4,
      zIndex: 1,
    },
  };

  const getCardVariant = (position) => {
    if (position === 0) return "center";
    if (position === -1) return "left";
    if (position === 1) return "right";
    return "center";
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#0a0b1a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What our customers say
          </h2>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real customers have to
            say about their experience.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative h-[500px] flex items-center justify-center">
          <div className="relative w-full max-w-6xl">
            {getVisibleTestimonials().map((testimonial) => (
              <motion.div
                key={`${testimonial.index}-${current}`}
                className="absolute top-1/2 left-1/2 w-full max-w-[600px]"
                style={{ transform: "translate(-50%, -50%)" }}
                variants={cardVariants}
                animate={getCardVariant(testimonial.position)}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="bg-[#0F172A] border border-zinc-700/50 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* Content */}
                    <div className="flex-1">
                      <Quotes
                        size={40}
                        weight="fill"
                        className="mb-6 text-[#7B68EE] opacity-80"
                      />

                      <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                        {testimonial.title}
                      </h3>

                      <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                        {testimonial.description}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#7B68EE] to-[#9333EA] flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-zinc-400 text-sm">
                            {testimonial.position}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-[#7B68EE]/30">
                          <img
                            src={`/${testimonial.image}`}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Decorative gradient overlay */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#7B68EE]/10 to-transparent pointer-events-none"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="group w-12 h-12 flex items-center justify-center rounded-full border border-zinc-600 hover:border-[#7B68EE] hover:bg-[#7B68EE]/10 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ArrowLeft
              size={20}
              className="text-zinc-400 group-hover:text-[#7B68EE] transition-colors duration-300"
            />
          </button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  clearAuto();
                  setCurrent(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-[#7B68EE] w-8"
                    : "bg-zinc-600 hover:bg-zinc-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="group w-12 h-12 flex items-center justify-center rounded-full border border-zinc-600 hover:border-[#7B68EE] hover:bg-[#7B68EE]/10 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ArrowRight
              size={20}
              className="text-zinc-400 group-hover:text-[#7B68EE] transition-colors duration-300"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
