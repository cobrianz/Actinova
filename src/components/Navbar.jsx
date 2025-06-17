"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { List, X, ArrowRight, Sparkle } from "@phosphor-icons/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.nav
      className="w-full z-50 fixed pt-4 sm:pt-6 lg:pt-8"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top navigation bar */}
      <motion.div
        className={`
          mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-4
          flex items-center justify-between rounded-2xl transition-all duration-500
          ${
            scrolled
              ? "bg-[#0F172A]/90 backdrop-blur-xl shadow-2xl border border-zinc-700/50"
              : "md:bg-white/5 md:backdrop-blur-md md:shadow-lg md:border md:border-white/10"
          }
        `}
        animate={{
          backgroundColor: scrolled
            ? "rgba(15, 23, 42, 0.9)"
            : "rgba(255, 255, 255, 0.05)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/logo.png"
              alt="Actinova logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-[#7B68EE]/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
          <span className="text-2xl font-bold hidden sm:inline bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent group-hover:from-[#7B68EE] group-hover:to-[#9333EA] transition-all duration-300">
            Actinova
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Link
                href={item.href}
                className="relative text-sm font-medium text-white/90 hover:text-[#7B68EE] transition-colors duration-300 group py-2 px-3 rounded-lg hover:bg-white/5"
              >
                {item.name}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-white/90 hover:text-[#7B68EE] px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300 text-sm font-medium"
          >
            Login
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-[#7B68EE]/25 transition-all duration-300 text-sm font-medium flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        </div>

        {/* Mobile CTA + Toggle (for >500px) */}
        <div className="flex items-center gap-3 md:hidden max-[500px]:hidden">
          <Link
            href="/login"
            className="text-white/90 hover:text-[#7B68EE] py-2 px-3 text-sm font-medium rounded-lg hover:bg-white/5 transition-all duration-300"
          >
            Login
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-[#7B68EE]/25 transition-all duration-300"
            >
              Sign Up
            </Link>
          </motion.div>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} weight="bold" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <List size={24} weight="bold" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Toggle only for ≤500px */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden min-[501px]:hidden text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} weight="bold" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <List size={24} weight="bold" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden w-full absolute left-0 mt-4 px-4"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Top Border */}
              <div className="h-0.5 bg-gradient-to-r from-[#7B68EE] to-[#9333EA]"></div>

              {/* Navigation Items */}
              <div className="p-2">
                {navItems.map((item, index) => (
                  <motion.div key={item.name} variants={mobileItemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-white/90 hover:text-[#7B68EE] hover:bg-white/5 rounded-xl transition-all duration-300 group"
                    >
                      <span className="font-medium">{item.name}</span>
                      <ArrowRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA Section for ≤500px */}
              <motion.div
                variants={mobileItemVariants}
                className="px-4 pb-4 pt-2 border-t border-zinc-700/50 min-[501px]:hidden space-y-3"
              >
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-center text-white/90 border border-zinc-600 rounded-xl hover:bg-white/5 hover:border-[#7B68EE] hover:text-[#7B68EE] transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white py-3 rounded-xl hover:shadow-lg hover:shadow-[#7B68EE]/25 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                >
                  <Sparkle size={16} weight="fill" />
                  Get Started Free
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
