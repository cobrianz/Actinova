"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { teamTestimonials } from "../lib/careers-data";

const TestimonialsSection = () => {
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
          What Our Team Says
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-zinc-300 max-w-3xl mx-auto"
        >
          Hear from our team members about their experience working at Actinova.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {teamTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            variants={itemVariants}
            className="bg-[#1a1b2e]/30 backdrop-blur-sm border border-[#7B68EE]/10 rounded-xl p-6 hover:border-[#7B68EE]/30 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#7B68EE]/30"
              />
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {testimonial.name}
                </h4>
                <p className="text-[#7B68EE] text-sm">{testimonial.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-[#7B68EE] text-[#7B68EE]"
                />
              ))}
            </div>

            <p className="text-zinc-300 leading-relaxed italic">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
