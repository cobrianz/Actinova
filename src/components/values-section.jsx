"use client";
import { motion } from "framer-motion";
import { companyValues } from "../lib/careers-data";

const ValuesSection = () => {
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
          Our Values
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-zinc-300 max-w-3xl mx-auto"
        >
          These core values guide everything we do and shape our company
          culture.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {companyValues.map((value, index) => (
          <motion.div
            key={value.title}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-[#1a1b2e]/30 backdrop-blur-sm border border-[#7B68EE]/10 rounded-xl p-6 text-center hover:border-[#7B68EE]/30 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{value.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {value.title}
            </h3>
            <p className="text-zinc-300 leading-relaxed">{value.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ValuesSection;
