"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import servicesData from "../lib/servicesData";
import {
  Lightning,
  PuzzlePiece,
  Code,
  Cpu,
  Briefcase,
  Robot,
  BookOpen,
  Sparkle,
} from "@phosphor-icons/react";

const icons = [Lightning, PuzzlePiece, Code, Cpu, Briefcase, Robot, BookOpen];

export default function Services() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Transform scroll progress to line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxIntersectionRatio = 0;
        let mostVisibleIndex = null;

        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > maxIntersectionRatio
          ) {
            maxIntersectionRatio = entry.intersectionRatio;
            mostVisibleIndex = Number(entry.target.getAttribute("data-index"));
          }
        });

        if (mostVisibleIndex !== null) {
          setActiveIndex(mostVisibleIndex);
        }
      },
      { rootMargin: "0px 0px -30% 0px", threshold: [0.1, 0.5, 0.9] }
    );

    const elements = document.querySelectorAll(".service-block");
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

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
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="max-w-6xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full mb-6">
            <Sparkle size={16} weight="fill" className="text-[#7B68EE]" />
            <span className="text-sm font-medium text-[#7B68EE]">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            We build solutions that{" "}
            <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
              scale with you
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            From powerful APIs and automations to full-stack development and
            consulting, Actinova delivers tech solutions for every stage of your
            business.
          </p>
        </motion.div>

        {/* Services Timeline */}
        <div className="max-w-7xl mx-auto relative">
          {/* Enhanced Vertical Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2">
            {/* Background line */}
            <div className="w-1 h-full bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-800 rounded-full shadow-lg"></div>

            {/* Animated progress line */}
            <motion.div
              className="absolute top-0 left-0 w-1 bg-gradient-to-b from-[#7B68EE] via-[#9333EA] to-[#7B68EE] rounded-full shadow-lg shadow-[#7B68EE]/50"
              style={{ height: lineHeight }}
            />

            {/* Glowing orb at the end of progress */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#7B68EE] rounded-full shadow-lg shadow-[#7B68EE]/50"
              style={{
                top: lineHeight,
                opacity: useTransform(
                  scrollYProgress,
                  [0, 0.1, 0.9, 1],
                  [0, 1, 1, 0]
                ),
              }}
            />
          </div>

          {/* Service Items */}
          <div className="flex flex-col space-y-32">
            {servicesData.map((service, index) => {
              const Icon = icons[index % icons.length];
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={service.title}
                  data-index={index}
                  className={`service-block relative flex flex-col md:flex-row items-center justify-between gap-12 z-10 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  variants={itemVariants}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Enhanced Icon at vertical line - Hidden on mobile */}
                  <motion.div
                    className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      rotate: isActive ? 360 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div
                      className={`relative p-4 rounded-full border-2 transition-all duration-500 ${
                        isActive
                          ? "bg-[#7B68EE] border-[#7B68EE] shadow-lg shadow-[#7B68EE]/50"
                          : "bg-[#0F172A] border-zinc-600"
                      }`}
                    >
                      <Icon
                        size={24}
                        weight="fill"
                        className={`transition-colors duration-500 ${
                          isActive ? "text-white" : "text-[#7B68EE]"
                        }`}
                      />

                      {/* Pulsing ring for active state */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-[#7B68EE]"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Content Section */}
                  <motion.div
                    className="md:w-1/2 text-center md:text-left space-y-6"
                    whileHover={{ x: index % 2 === 0 ? 10 : -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Mobile Icon */}
                    <div className="md:hidden flex justify-center mb-4">
                      <div className="p-3 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full">
                        <Icon
                          size={24}
                          weight="fill"
                          className="text-[#7B68EE]"
                        />
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                      {service.description}
                    </p>

                    {/* CTA Button */}
                    <motion.button
                      className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-[#7B68EE]/30 text-[#7B68EE] font-medium rounded-full hover:bg-[#7B68EE]/10 hover:border-[#7B68EE] transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        →
                      </motion.div>
                    </motion.button>
                  </motion.div>

                  {/* Image Section */}
                  <motion.div
                    className="md:w-1/2 flex items-center justify-center"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative group">
                      {/* Glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>

                      <div className="relative">
                        <Image
                          src={`/${service.image}`}
                          alt={service.title}
                          width={500}
                          height={300}
                          className="rounded-xl border border-zinc-700/50 shadow-2xl transition-all duration-300 group-hover:border-[#7B68EE]/30"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#7B68EE]/10 via-transparent to-[#9333EA]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
