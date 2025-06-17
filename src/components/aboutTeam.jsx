"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  Code,
  Sparkle,
} from "@phosphor-icons/react";
import teamData from "../lib/teamData";

export default function AboutTeam() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full mb-6">
            <Code size={16} weight="fill" className="text-[#7B68EE]" />
            <span className="text-sm font-medium text-[#7B68EE]">
              Meet the Team
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            The{" "}
            <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
              Experts
            </span>{" "}
            Behind Actinova
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Our diverse team of developers, engineers, and strategists brings
            decades of combined experience in building scalable software
            solutions.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamData.map((member, index) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B68EE]/10 via-[#9333EA]/5 to-[#7B68EE]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

              <div className="relative bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 rounded-3xl p-6 backdrop-blur-sm group-hover:border-[#7B68EE]/30 transition-all duration-500 h-full">
                {/* Top Border Gradient */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#7B68EE] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-[#7B68EE]/30 group-hover:border-[#7B68EE]/60 transition-all duration-300">
                    <Image
                      src={`/${member.image}`}
                      width={96}
                      height={96}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-2 border-[#0F172A] rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#7B68EE] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-[#7B68EE] font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                    {member.bio}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-lg text-xs text-[#7B68EE] group-hover:bg-[#7B68EE]/20 group-hover:border-[#7B68EE]/40 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <motion.a
                    href={member.social.github}
                    className="w-8 h-8 bg-zinc-800/50 border border-zinc-700/50 rounded-lg flex items-center justify-center hover:bg-[#7B68EE] hover:border-[#7B68EE] transition-all duration-300 group/social"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GithubLogo
                      size={16}
                      className="text-zinc-400 group-hover/social:text-white transition-colors duration-300"
                    />
                  </motion.a>
                  <motion.a
                    href={member.social.linkedin}
                    className="w-8 h-8 bg-zinc-800/50 border border-zinc-700/50 rounded-lg flex items-center justify-center hover:bg-[#7B68EE] hover:border-[#7B68EE] transition-all duration-300 group/social"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LinkedinLogo
                      size={16}
                      className="text-zinc-400 group-hover/social:text-white transition-colors duration-300"
                    />
                  </motion.a>
                  <motion.a
                    href={member.social.twitter}
                    className="w-8 h-8 bg-zinc-800/50 border border-zinc-700/50 rounded-lg flex items-center justify-center hover:bg-[#7B68EE] hover:border-[#7B68EE] transition-all duration-300 group/social"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TwitterLogo
                      size={16}
                      className="text-zinc-400 group-hover/social:text-white transition-colors duration-300"
                    />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-gradient-to-r from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkle size={20} className="text-[#7B68EE]" weight="fill" />
              <h3 className="text-2xl font-bold text-white">Join Our Team</h3>
            </div>
            <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
              We're always looking for talented developers and tech enthusiasts
              who share our passion for building amazing software solutions.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#7B68EE]/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Open Positions
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
