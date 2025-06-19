"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown, Question, Sparkle } from "@phosphor-icons/react";
import faqData from "../lib/faqData";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const answerVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <section className="bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/5 rounded-full blur-3xl"></div>

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, #7B68EE 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full mb-6">
            <Question size={16} weight="fill" className="text-[#7B68EE]" />
            <span className="text-sm font-medium text-[#7B68EE]">FAQ</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
              questions
            </span>
          </h2>

          <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
            Everything you need to know about our platform and services. Can't
            find what you're looking for?{" "}
            <span className="text-[#7B68EE] hover:text-[#9333EA] cursor-pointer transition-colors duration-300">
              Contact our team
            </span>
            .
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div variants={itemVariants} className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                className="group relative"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0  rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

                <div className="relative  border border-zinc-700/50 rounded-2xl overflow-hidden backdrop-blur-sm group-hover:border-[#7B68EE]/30   transition-all duration-300">
                  {/* Top Border Gradient */}
                  <div
                    className={`absolute top-0 left-0 right-0  h-0.5 bg-gradient-to-r from-transparent via-[#7B68EE] to-transparent transition-opacity  duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>

                  {/* Question */}
                  <motion.div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => toggle(index)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-4 flex-1">
                      {/* Question Number */}
                      <div className="flex-shrink-0 w-8 h-8 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full flex items-center justify-center">
                        <span className="text-[#7B68EE] text-sm font-semibold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Question Text */}
                      <h3 className="font-semibold text-white text-base md:text-lg leading-relaxed pr-4">
                        {faq.question}
                      </h3>
                    </div>

                    {/* Caret Icon */}
                    <motion.div
                      className="flex-shrink-0 w-8 h-8 bg-zinc-800/50 border border-zinc-600 rounded-full flex items-center justify-center group-hover:bg-[#7B68EE]/10 group-hover:border-[#7B68EE]/30 transition-all duration-300"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <CaretDown
                        size={18}
                        className="text-zinc-400 group-hover:text-[#7B68EE] transition-colors duration-300"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={answerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="pl-12 pr-4">
                            <div>
                              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-3">
              Still have questions?
            </h3>
            <p className="text-zinc-400 mb-6">
              Our team is here to help you get the most out of our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#7B68EE]/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-transparent border border-zinc-600 text-zinc-300 font-semibold rounded-full hover:border-[#7B68EE] hover:text-[#7B68EE] hover:bg-[#7B68EE]/5 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Documentation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
