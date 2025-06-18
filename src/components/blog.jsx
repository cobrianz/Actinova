
"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo } from "react"
import { Search, ArrowUp, BookOpen, Calendar, Clock, User, Tag, Code, Database, Shield, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { blogData, categories } from "../lib/blog-data";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  // Filter blog posts based on search query and category
  const filteredPosts = useMemo(() => {
    let filtered = blogData

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    return filtered
  }, [searchQuery, selectedCategory])

  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle post click
  const handlePostClick = (post) => {
    setSelectedPost(post)
  }

  // Handle scroll detection for scroll-to-top button
  useState(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })

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

  // Blog Post Modal/Detail View
  if (selectedPost) {
    return (
      <div className="relative w-full bg-gradient-to-br pt-[8rem] from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B68EE]/5 via-transparent to-[#9333EA]/5"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-[#7B68EE] hover:text-white transition-colors mb-8"
          >
            ← Back to Blog
          </motion.button>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-[#7B68EE] text-white">
                {selectedPost.category}
              </Badge>
              {selectedPost.featured && (
                <Badge
                  variant="outline"
                  className="text-[#9333EA] border-[#9333EA]/30"
                >
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-6 text-zinc-400 mb-6">
              <span className="flex items-center gap-2">
                <User size={16} />
                {selectedPost.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(selectedPost.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {selectedPost.readTime}
              </span>
            </div>

            <p className="text-xl text-zinc-300 leading-relaxed mb-8">
              {selectedPost.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {selectedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#7B68EE]/10 text-[#7B68EE] text-sm rounded-full"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Article Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <img
              src={selectedPost.image || "/placeholder.svg"}
              alt={selectedPost.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl"
            />
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <div className="text-zinc-300 leading-relaxed space-y-6">
              <p>
                This is where the full article content would be displayed. In a
                real implementation, you would fetch the complete article
                content from your CMS or database and render it here.
              </p>
              <p>
                The article could include rich text formatting, code blocks,
                images, and other media elements to provide a comprehensive
                reading experience for your users.
              </p>
              <p>
                You could also add features like table of contents, reading
                progress, social sharing, and related articles to enhance the
                user experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-gradient-to-br from-[#0a0b1a] pt-[8rem] via-[#0d0f20] to-[#1a0b2e] text-white min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#7B68EE]/5 to-transparent rounded-full"></div>

        {/* Floating Icons */}
        <motion.div variants={floatingVariants} animate="animate" className="absolute top-20 left-10 text-[#7B68EE]/30">
          <Code size={32} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-32 right-16 text-[#9333EA]/30"
          style={{ animationDelay: "2s" }}
        >
          <Database size={28} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-32 left-20 text-[#7B68EE]/30"
          style={{ animationDelay: "4s" }}
        >
          <Shield size={24} />
        </motion.div>

        {/* Gradient Background instead of dots */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7B68EE]/5 via-transparent to-[#9333EA]/5"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
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
            <BookOpen size={16} className="text-[#7B68EE]" />
            <span className="text-sm font-medium text-[#7B68EE]">Tech Insights & Tutorials</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Our{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#7B68EE] via-[#9333EA] to-[#7B68EE] bg-clip-text text-transparent">
                Tech
              </span>
            </span>{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#9333EA] via-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
                Blog
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
            Discover the latest insights, tutorials, and best practices in{" "}
            <span className="text-white font-semibold">software development</span>, API integration, and modern tech
            stack.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div variants={itemVariants} className="mb-12">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-400" />
            </div>
            <Input
              type="text"
              placeholder="Search articles, authors, or tags..."
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

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-[#7B68EE] text-white shadow-lg"
                    : "bg-[#1a1b2e]/30 text-zinc-400 hover:text-white hover:bg-[#7B68EE]/20 border border-[#7B68EE]/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          {(searchQuery || selectedCategory !== "All") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6 text-zinc-400"
            >
              Found {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
              {searchQuery && ` matching "${searchQuery}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </motion.div>
          )}
        </motion.div>

        {/* Blog Posts */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div
                key="blog-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                {/* Featured Posts - Full Width */}
                {featuredPosts.length > 0 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Featured Articles</h2>
                    {featuredPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-[#1a1b2e]/30 backdrop-blur-sm border border-[#7B68EE]/10 rounded-xl overflow-hidden hover:border-[#7B68EE]/30 transition-all duration-300 cursor-pointer"
                        onClick={() => handlePostClick(post)}
                        whileHover={{ y: -5 }}
                      >
                        <div className="md:flex">
                          {/* Article Image */}
                          <div className="md:w-1/2 relative overflow-hidden">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b1a]/60 to-transparent" />
                            <Badge className="absolute top-4 left-4 bg-[#7B68EE] text-white">Featured</Badge>
                          </div>

                          {/* Article Content */}
                          <div className="md:w-1/2 p-8">
                            {/* Category and Date */}
                            <div className="flex items-center justify-between mb-4">
                              <Badge variant="outline" className="text-[#7B68EE] border-[#7B68EE]/30">
                                {post.category}
                              </Badge>
                              <div className="flex items-center gap-4 text-sm text-zinc-400">
                                <span className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  {new Date(post.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock size={14} />
                                  {post.readTime}
                                </span>
                              </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#7B68EE] transition-colors duration-200">
                              {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-zinc-300 leading-relaxed mb-6">{post.excerpt}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {post.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#7B68EE]/10 text-[#7B68EE] text-sm rounded-full"
                                >
                                  <Tag size={12} />
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Author and Read More */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <User size={18} className="text-zinc-400" />
                                <span className="text-zinc-400">{post.author}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[#7B68EE] group-hover:text-white transition-colors">
                                <span>Read More</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}

                {/* Regular Posts - Grid */}
                {regularPosts.length > 0 && (
                  <div className="space-y-8">
                    {featuredPosts.length > 0 && (
                      <h2 className="text-2xl font-bold text-white mb-6">Latest Articles</h2>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {regularPosts.map((post, index) => (
                        <motion.article
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (index + featuredPosts.length) * 0.1 }}
                          className="group bg-[#1a1b2e]/30 backdrop-blur-sm border border-[#7B68EE]/10 rounded-xl overflow-hidden hover:border-[#7B68EE]/30 transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer"
                          onClick={() => handlePostClick(post)}
                          whileHover={{ y: -5 }}
                        >
                          {/* Article Image */}
                          <div className="relative overflow-hidden">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b1a]/60 to-transparent" />
                          </div>

                          {/* Article Content */}
                          <div className="p-6 ">
                            {/* Category and Date */}
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="outline" className="text-[#7B68EE] border-[#7B68EE]/30">
                                {post.category}
                              </Badge>
                              <div className="flex items-center gap-4 text-xs text-zinc-400">
                                <span className="flex items-center gap-1">
                                  <Calendar size={12} />
                                  {new Date(post.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock size={12} />
                                  {post.readTime}
                                </span>
                              </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#7B68EE] transition-colors duration-200 line-clamp-2">
                              {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-zinc-300 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-[#7B68EE]/10 text-[#7B68EE] text-xs rounded-md"
                                >
                                  <Tag size={10} />
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Author */}
                            <div className="flex items-center justify-between pt-4 border-t border-[#7B68EE]/10">
                              <div className="flex items-center gap-2">
                                <User size={16} className="text-zinc-400" />
                                <span className="text-sm text-zinc-400">{post.author}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[#7B68EE] group-hover:text-white transition-colors text-sm">
                                <span>Read More</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
                <p className="text-zinc-400 mb-6">Try adjusting your search terms or browse different categories.</p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => setSearchQuery("")}
                    className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6B58DE] hover:to-[#8323D9] text-white"
                  >
                    Clear Search
                  </Button>
                  <Button
                    onClick={() => setSelectedCategory("All")}
                    variant="outline"
                    className="border-[#7B68EE]/30 text-[#7B68EE] hover:bg-[#7B68EE] hover:text-white"
                  >
                    Show All Categories
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="bg-[#1a1b2e]/30 backdrop-blur-sm border border-[#7B68EE]/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest tech insights, tutorials, and industry news delivered to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white placeholder-zinc-400 focus:border-[#7B68EE]"
              />
              <Button className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6B58DE] hover:to-[#8323D9] text-white px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-[#7B68EE]/20 text-center">
          <p className="text-zinc-400 mb-4">
            Want to contribute? Contact us at{" "}
            <a
              href="mailto:blog@actinova.dev"
              className="text-[#7B68EE] hover:text-[#9333EA] transition-colors underline"
            >
              blog@actinova.dev
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

export default Blog
