"use client";
import { motion } from "framer-motion";
import { benefits } from "../lib/careers-data";

const BenefitsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Why Work With Us?
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-zinc-300 max-w-3xl mx-auto"
        >
          We believe in taking care of our team with comprehensive benefits and
          a supportive work environment.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {benefits.map((category, index) => (
          <motion.div
            key={category.category}
            variants={itemVariants}
            className="bg-[#1a1b2e]/30 backdrop-blur-sm border border-[#7B68EE]/10 rounded-xl p-6 hover:border-[#7B68EE]/30 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {category.category}
            </h3>
            <ul className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-start gap-3 text-zinc-300"
                >
                  <div className="w-2 h-2 bg-[#7B68EE] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BenefitsSection;
