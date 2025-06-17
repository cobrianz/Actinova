"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quotes } from "@phosphor-icons/react";
import testimonialsData from "../lib/testimonialsData";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const total = testimonialsData.length;

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 px-4 bg-[#0D0F20] text-white overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#0F172A] rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between px-6 py-10 md:py-16 md:px-12 min-h-[300px]"
        >
          <div className="md:w-3/5 text-left">
            <Quotes size={32} weight="fill" className="mb-4 text-[#7B68EE]" />
            <h3 className="text-xl font-semibold mb-3">
              {testimonialsData[current].title}
            </h3>
            <p className="text-zinc-300 text-sm mb-4">
              {testimonialsData[current].description}
            </p>
            <div className="text-sm text-zinc-400">
              <strong className="text-white">
                {testimonialsData[current].name}
              </strong>
              <br />
              {testimonialsData[current].position}
            </div>
          </div>
          <div className="md:w-2/5 flex justify-center mt-8 md:mt-0">
            <img
              src={`/${testimonialsData[current].image}`}
              alt={testimonialsData[current].name}
              className="w-40 h-40 rounded-full object-cover border-4 border-[#7B68EE]"
            />
          </div>
        </motion.div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-600 hover:border-[#7B68EE] transition"
            aria-label="Previous"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-600 hover:border-[#7B68EE] transition"
            aria-label="Next"
          >
            <ArrowRight size={20} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
