"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo, useEffect } from "react"
import { Search, ArrowUp, FileText, Scale, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { termsData } from "../lib/termsData"

const TermsOfService = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Filter terms based on search query
  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return termsDataa

    const query = searchQuery.toLowerCase()
    return termsData.filter(
      (term) =>
        term.title.toLowerCase().includes(query) ||
        term.content.some((content) => content.toLowerCase().includes(query)),
    )
  }, [searchQuery])

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle scroll detection for scroll-to-top button
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 400)
  }

  // Add scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="relative pt-[8rem] w-full bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#7B68EE]/5 to-transparent rounded-full"></div>

        {/* Floating Icons */}
        <motion.div variants={floatingVariants} animate="animate" className="absolute top-20 left-10 text-[#7B68EE]/30">
          <Scale size={32} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-32 right-16 text-[#9333EA]/30"
          style={{ animationDelay: "2s" }}
        >
          <Shield size={28} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-32 left-20 text-[#7B68EE]/30"
          style={{ animationDelay: "4s" }}
        >
          <FileText size={24} />
        </motion.div>

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #7B68EE 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            backgroundPosition: "0 0, 25px 25px",
          }}
        ></div>
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full backdrop-blur-sm mb-6"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(123, 104, 238, 0.15)",
            }}
          >
            <Scale size={16} className="text-[#7B68EE]" />
            <span className="text-sm font-medium text-[#7B68EE]">Legal Documentation</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Terms{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#7B68EE] via-[#9333EA] to-[#7B68EE] bg-clip-text text-transparent">
                &
              </span>
            </span>{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#9333EA] via-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
                Conditions
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#9333EA] to-[#7B68EE] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </span>
          </h1>

          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Please read these terms carefully before using{" "}
            <span className="text-white font-semibold">Actinova's services</span>. These terms govern your access to and
            use of our platform.
          </p>

          <div className="text-sm text-zinc-400 mb-8">Last Updated: December 18, 2024</div>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-500 z-100" />
            </div>
            <Input
              type="text"
              placeholder="Search terms and conditions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white placeholder-zinc-400 focus:border-[#7B68EE] focus:ring-[#7B68EE]/20 rounded-xl backdrop-blur-sm"
            />
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white transition-colors"
              >
                ×
              </motion.button>
            )}
          </div>

          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-4 text-zinc-400"
            >
              Found {filteredTerms.length} section{filteredTerms.length !== 1 ? "s" : ""} matching "{searchQuery}"
            </motion.div>
          )}
        </motion.div>

        {/* Terms Content */}
        <motion.div variants={itemVariants} className="space-y-8">
          <AnimatePresence mode="wait">
            {filteredTerms.length > 0 ? (
              <motion.div
                key="terms-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {filteredTerms.map((term, index) => (
                  <motion.div
                    key={term.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#1a1b2e]/30 backdrop-blur-sm border border-[#7B68EE]/10 rounded-xl p-6 hover:border-[#7B68EE]/20 transition-all duration-300"
                  >
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] rounded-full"></div>
                      {term.title}
                    </h2>

                    {term.content.length > 0 && (
                      <div className="space-y-3">
                        {term.content.map((content, contentIndex) => (
                          <p
                            key={contentIndex}
                            className="text-zinc-300 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: searchQuery
                                ? content.replace(
                                    new RegExp(`(${searchQuery})`, "gi"),
                                    '<mark class="bg-[#7B68EE]/30 text-white rounded px-1">$1</mark>',
                                  )
                                : content,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
                <p className="text-zinc-400 mb-6">Try adjusting your search terms or browse all sections below.</p>
                <Button
                  onClick={() => setSearchQuery("")}
                  className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6B58DE] hover:to-[#8323D9] text-white"
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-[#7B68EE]/20 text-center">
          <p className="text-zinc-400 mb-4">
            Questions about these terms? Contact us at{" "}
            <a
              href="mailto:legal@actinova.dev"
              className="text-[#7B68EE] hover:text-[#9333EA] transition-colors underline"
            >
              legal@actinova.dev
            </a>
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-zinc-500">
            <span>© 2024 Actinova Technologies Ltd.</span>
            <span>•</span>
            <span>All rights reserved</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TermsOfService
