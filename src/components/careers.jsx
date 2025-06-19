"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import {
  Search,
  ArrowUp,
  Briefcase,
  Users,
  MapPin,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import JobCard from "./job-card";
import BenefitsSection from "./benefits-section";
import ValuesSection from "./values-section";
import TestimonialsSection from "./testimonials-section";
import ApplicationProcess from "./application-process";
import FAQSection from "./faq-section";
import ApplicationForm from "./application-form";
import { jobListings, departments, locations, jobTypes } from "../lib/careers-data";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    resume: null,
    coverLetter: "",
    portfolio: "",
    experience: "",
    availability: "",
    salary: "",
    referral: "",
    additionalInfo: "",
  });

  // Handle scroll detection for "scroll-to-top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    let filtered = jobListings;

    // Filter by department
    if (selectedDepartment !== "All Departments") {
      filtered = filtered.filter(
        (job) => job.department === selectedDepartment
      );
    }

    // Filter by location
    if (selectedLocation !== "All Locations") {
      filtered = filtered.filter((job) =>
        job.location.includes(selectedLocation)
      );
    }

    // Filter by type
    if (selectedType !== "All Types") {
      filtered = filtered.filter((job) => job.type === selectedType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.department.toLowerCase().includes(query) ||
          job.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedDepartment, selectedLocation, selectedType]);

  // Separate featured and regular jobs
  const featuredJobs = filteredJobs.filter((job) => job.featured);
  const regularJobs = filteredJobs.filter((job) => !job.featured);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleApplyFromDetails = () => {
    setShowJobDetails(false);
    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();

    // Simulate API call
    try {
      // Show loading toast
      const loadingToast = toast.loading("Submitting your application...");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.3; // 70% success rate

      toast.dismiss(loadingToast);

      if (isSuccess) {
        toast.success("Application submitted successfully!", {
          description: `Thank you for applying for ${selectedJob.title}. We'll review your application and get back to you within 3-5 business days.`,
          duration: 5000,
        });

        // Reset form and close modal
        setApplicationData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          location: "",
          resume: null,
          coverLetter: "",
          portfolio: "",
          experience: "",
          availability: "",
          salary: "",
          referral: "",
          additionalInfo: "",
        });
        setShowApplicationForm(false);
        setSelectedJob(null);
      } else {
        toast.error("Failed to submit application", {
          description:
            "There was an error processing your application. Please try again or contact our support team.",
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Network error", {
        description: "Please check your internet connection and try again.",
        duration: 5000,
      });
    }
  };

  const handleInputChange = (field, value) => {
    setApplicationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("File too large", {
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }
      setApplicationData((prev) => ({
        ...prev,
        resume: file,
      }));
      toast.success("Resume uploaded successfully!");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

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
  };

  // Job Details Modal
  if (showJobDetails && selectedJob) {
    return (
      <div className="relative w-full bg-gradient-to-br from-[#0a0b1a] pt-[8rem] via-[#0d0f20] to-[#1a0b2e] text-white min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B68EE]/5 via-transparent to-[#9333EA]/5"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => {
              setShowJobDetails(false);
              setSelectedJob(null);
            }}
            className="flex items-center gap-2 text-[#7B68EE] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Careers
          </motion.button>

          {/* Job Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-[#1a1b2e]/30 backdrop-blur-sm border border-[#7B68EE]/20 rounded-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold">
                      {selectedJob.title}
                    </h1>
                    {selectedJob.featured && (
                      <Badge className="bg-[#7B68EE] text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-zinc-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {selectedJob.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {selectedJob.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {selectedJob.type} • {selectedJob.experience}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={16} />
                      {selectedJob.salary}
                    </span>
                  </div>
                  <p className="text-xl text-zinc-300 mb-6">
                    {selectedJob.description}
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-zinc-300"
                    >
                      <div className="w-2 h-2 bg-[#7B68EE] rounded-full mt-2 flex-shrink-0"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responsibilities */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Responsibilities
                </h3>
                <ul className="space-y-2">
                  {selectedJob.responsibilities.map((resp, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-zinc-300"
                    >
                      <div className="w-2 h-2 bg-[#9333EA] rounded-full mt-2 flex-shrink-0"></div>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#7B68EE]/10 text-[#7B68EE] rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Job Meta Info */}
              <div className="mb-8 p-4 bg-[#0a0b1a]/30 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Calendar size={14} />
                    <span>
                      Posted:{" "}
                      {new Date(selectedJob.posted).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Clock size={14} />
                    <span>
                      Deadline:{" "}
                      {new Date(
                        selectedJob.applicationDeadline
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex gap-4">
                <Button
                  onClick={handleApplyFromDetails}
                  className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6B58DE] hover:to-[#8323D9] text-white px-8"
                >
                  Apply for this Position
                </Button>
                <Button
                  variant="outline"
                  className="border-[#7B68EE]/30 text-[#7B68EE] hover:bg-[#7B68EE] hover:text-white"
                >
                  Save Job
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1b2e",
              border: "1px solid rgba(123, 104, 238, 0.2)",
              color: "white",
            },
          }}
        />
      </div>
    );
  }

  // Job Application Modal
  if (showApplicationForm && selectedJob) {
    return (
      <div className="relative w-full bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B68EE]/5 via-transparent to-[#9333EA]/5"></div>
        </div>

        <ApplicationForm
          job={selectedJob}
          isOpen={showApplicationForm}
          onClose={() => {
            setShowApplicationForm(false);
            setSelectedJob(null);
          }}
          applicationData={applicationData}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onSubmit={handleApplicationSubmit}
        />

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1b2e",
              border: "1px solid rgba(123, 104, 238, 0.2)",
              color: "white",
            },
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full bg-gradient-to-br  from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden ">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#7B68EE]/5 to-transparent rounded-full"></div>

        {/* Floating Icons */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 text-[#7B68EE]/30"
        >
          <Briefcase size={32} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-32 right-16 text-[#9333EA]/30"
          style={{ animationDelay: "2s" }}
        >
          <Users size={28} />
        </motion.div>

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7B68EE]/5 via-transparent to-[#9333EA]/5"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16 pt-[8rem]">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full backdrop-blur-sm mb-6 "
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(123, 104, 238, 0.15)",
            }}
          >
            <Briefcase size={16} className="text-[#7B68EE]" />
            <span className="text-sm font-medium text-[#7B68EE]">
              Join Our Team
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Build Your{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#7B68EE] via-[#9333EA] to-[#7B68EE] bg-clip-text text-transparent">
                Career
              </span>
            </span>{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#9333EA] via-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
                With Us
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
            Join our mission to revolutionize API integration and help
            businesses build better software. We're looking for passionate
            individuals who want to make a real impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6B58DE] hover:to-[#8323D9] text-white px-8">
              View Open Positions
            </Button>
            <Button
              variant="outline"
              className="border-[#7B68EE]/30 text-[#7B68EE] hover:bg-[#7B68EE] hover:text-white"
            >
              Learn About Our Culture
            </Button>
          </div>
        </motion.div>

        {/* Job Search and Filters */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-[#1a1b2e]/30 backdrop-blur-sm border border-[#7B68EE]/20 rounded-xl p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-zinc-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search jobs, skills, or departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white placeholder-zinc-400 focus:border-[#7B68EE]"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="w-full sm:w-48 bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger className="w-full sm:w-48 bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-48 bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-zinc-400 text-sm">
              Found {filteredJobs.length} position
              {filteredJobs.length !== 1 ? "s" : ""}
              {searchQuery && ` matching "${searchQuery}"`}
            </div>
          </div>
        </motion.div>

        {/* Job Listings */}
        <motion.div variants={itemVariants} className="mb-16">
          <AnimatePresence mode="wait">
            {filteredJobs.length > 0 ? (
              <motion.div
                key="jobs-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                {/* Featured Jobs */}
                {featuredJobs.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Featured Positions
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {featuredJobs.map((job) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          onApply={handleJobClick}
                          featured={true}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Jobs */}
                {regularJobs.length > 0 && (
                  <div>
                    {featuredJobs.length > 0 && (
                      <h2 className="text-2xl font-bold text-white mb-6">
                        All Positions
                      </h2>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {regularJobs.map((job) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          onApply={handleJobClick}
                        />
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
                <div className="text-6xl mb-4">💼</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No positions found
                </h3>
                <p className="text-zinc-400 mb-6">
                  Try adjusting your search criteria or check back later for new
                  openings.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDepartment("All Departments");
                    setSelectedLocation("All Locations");
                    setSelectedType("All Types");
                  }}
                  className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6B58DE] hover:to-[#8323D9] text-white"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Company Values */}
        <ValuesSection />

        {/* Benefits */}
        <BenefitsSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Application Process */}
        <ApplicationProcess />

        {/* FAQ */}
        <FAQSection />

        {/* Contact Section */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="bg-[#1a1b2e]/30 backdrop-blur-sm border border-[#7B68EE]/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
              We're here to help! Reach out to our HR team if you have any
              questions about our open positions or company culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6B58DE] hover:to-[#8323D9] text-white">
                <Mail size={16} className="mr-2" />
                careers@actinova.dev
              </Button>
              <Button
                variant="outline"
                className="border-[#7B68EE]/30 text-[#7B68EE] hover:bg-[#7B68EE] hover:text-white"
              >
                <MessageCircle size={16} className="mr-2" />
                Schedule a Call
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-[#7B68EE]/20 text-center"
        >
          <p className="text-zinc-400 mb-4">
            Follow us on social media to stay updated on new job openings and
            company news.
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-zinc-500">
            <span>© 2024 Actinova Technologies Ltd.</span>
            <span>•</span>
            <span>Equal Opportunity Employer</span>
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
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1b2e",
            border: "1px solid rgba(123, 104, 238, 0.2)",
            color: "white",
          },
        }}
      />
    </div>
  );
};

export default Careers;
