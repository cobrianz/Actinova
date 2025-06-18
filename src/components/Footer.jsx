"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  GithubLogo,
  TwitterLogo,
  LinkedinLogo,
  ArrowRight,
  Sparkle,
  Heart,
} from "@phosphor-icons/react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
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

  const socialLinks = [
    { icon: GithubLogo, href: "#", label: "GitHub" },
    { icon: TwitterLogo, href: "#", label: "Twitter" },
    { icon: LinkedinLogo, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B68EE]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9333EA]/5 rounded-full blur-3xl"></div>

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#7B68EE]/20 rounded-full"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7B68EE] to-transparent"></div>

      <motion.div
        className="relative z-10 px-6 md:px-12 pt-20 pb-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
          {/* Brand & Newsletter */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="mb-6 flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Actinova logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-[#7B68EE]/20 rounded-lg blur-lg"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
                Actinova
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Sparkle size={16} className="text-[#7B68EE]" />
                Join the newsletter
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Subscribe for weekly updates, exclusive insights, and early
                access to new features. No spam ever!
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-xl bg-[#0f172a]/50 border border-zinc-700/50 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#7B68EE]/50 focus:border-[#7B68EE] hover:border-[#7B68EE]/50 transition-all duration-300"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#7B68EE]/25 transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <>
                      <span>✓ Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Product */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              {[
                { name: "Services", href: "/services" },
                { name: "Testimonials", href: "/testimonials" },
                { name: "Highlights", href: "/highlights" },
                { name: "Pricing", href: "/pricing" },
                { name: "FAQs", href: "/faq" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-[#7B68EE] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span>{item.name}</span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About us", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Press", href: "/press" },
                { name: "Blog", href: "/blog" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-[#7B68EE] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span>{item.name}</span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal & Support */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Legal & Support
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Contact Support", href: "/contact" },
                { name: "Documentation", href: "/docs" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-[#7B68EE] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span>{item.name}</span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="border-gradient-to-r from-transparent via-zinc-700 to-transparent mt-16 pt-8"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-8"></div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-zinc-400">
              <p className="flex items-center gap-2">
                
Actinova
              </p>
              <span className="hidden sm:block">•</span>
              <p>© 2025 All rights reserved</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-500 mr-2">Follow us:</span>
              {socialLinks.map((social) => (
                <motion.div
                  key={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={social.href}
                    className="w-10 h-10 bg-zinc-800/50 border border-zinc-700/50 rounded-xl flex items-center justify-center hover:bg-[#7B68EE] hover:border-[#7B68EE] transition-all duration-300 group backdrop-blur-sm"
                    aria-label={social.label}
                  >
                    <social.icon
                      size={18}
                      className="text-zinc-400 group-hover:text-white transition-colors duration-300"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-zinc-800/50"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-1500"></div>
                <span>GDPR Ready</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
