"use client";
import { motion } from "framer-motion";
import { applicationProcess } from "../lib/careers-data";

const ApplicationProcess = () => {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
          Application Process
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-zinc-300 max-w-3xl mx-auto"
        >
          Our streamlined hiring process is designed to be transparent and
          efficient.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        {applicationProcess.map((step, index) => (
          <motion.div
            key={step.step}
            variants={itemVariants}
            className="flex items-start gap-6 mb-8 last:mb-0"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#7B68EE] rounded-full flex items-center justify-center text-white font-bold">
                {step.step}
              </div>
              {index < applicationProcess.length - 1 && (
                <div className="w-0.5 h-16 bg-[#7B68EE]/30 mx-auto mt-4"></div>
              )}
            </div>
            <div className="flex-1 pt-2">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <span className="px-3 py-1 bg-[#7B68EE]/10 text-[#7B68EE] text-sm rounded-full">
                  {step.duration}
                </span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ApplicationProcess;
