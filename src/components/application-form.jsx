"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  DollarSign,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ApplicationForm = ({
  job,
  isOpen,
  onClose,
  applicationData,
  onInputChange,
  onFileChange,
  onSubmit,
}) => {
  if (!isOpen || !job) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex  items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#0a0b1a] border border-[#7B68EE]/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b  border-[#7B68EE]/20">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Apply for Position
              </h2>
              <p className="text-[#7B68EE] mt-1">
                {job.title} - {job.department}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-zinc-400 hover:text-white hover:bg-[#7B68EE]/10"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Form Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)] scrollbar-hide">
            <form onSubmit={onSubmit} className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <User size={18} className="text-[#7B68EE]" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={applicationData.firstName}
                      onChange={(e) =>
                        onInputChange("firstName", e.target.value)
                      }
                      className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white focus:border-[#7B68EE]"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={applicationData.lastName}
                      onChange={(e) =>
                        onInputChange("lastName", e.target.value)
                      }
                      className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white focus:border-[#7B68EE]"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-white flex items-center gap-1"
                    >
                      <Mail size={14} />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={applicationData.email}
                      onChange={(e) => onInputChange("email", e.target.value)}
                      className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white focus:border-[#7B68EE]"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-white flex items-center gap-1"
                    >
                      <Phone size={14} />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={applicationData.phone}
                      onChange={(e) => onInputChange("phone", e.target.value)}
                      className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white focus:border-[#7B68EE]"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-white flex items-center gap-1"
                  >
                    <MapPin size={14} />
                    Current Location *
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    required
                    value={applicationData.location}
                    onChange={(e) => onInputChange("location", e.target.value)}
                    className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white focus:border-[#7B68EE]"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FileText size={18} className="text-[#7B68EE]" />
                  Resume & Documents
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-white">
                    Resume/CV *
                  </Label>
                  <div className="relative">
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={onFileChange}
                      className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white focus:border-[#7B68EE] file:bg-[#7B68EE] file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Upload size={16} className="text-zinc-400" />
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                  {applicationData.resume && (
                    <p className="text-sm text-[#7B68EE]">
                      ✓ {applicationData.resume.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio" className="text-white">
                    Portfolio/Website URL
                  </Label>
                  <Input
                    id="portfolio"
                    type="url"
                    value={applicationData.portfolio}
                    onChange={(e) => onInputChange("portfolio", e.target.value)}
                    className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white focus:border-[#7B68EE]"
                    placeholder="https://your-portfolio.com"
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Users size={18} className="text-[#7B68EE]" />
                  Professional Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-white">
                    Years of Experience *
                  </Label>
                  <Select
                    value={applicationData.experience}
                    onValueChange={(value) =>
                      onInputChange("experience", value)
                    }
                  >
                    <SelectTrigger className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-3">2-3 years</SelectItem>
                      <SelectItem value="4-5">4-5 years</SelectItem>
                      <SelectItem value="6-8">6-8 years</SelectItem>
                      <SelectItem value="9-12">9-12 years</SelectItem>
                      <SelectItem value="12+">12+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="availability"
                      className="text-white flex items-center gap-1"
                    >
                      <Calendar size={14} />
                      Availability *
                    </Label>
                    <Select
                      value={applicationData.availability}
                      onValueChange={(value) =>
                        onInputChange("availability", value)
                      }
                    >
                      <SelectTrigger className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white">
                        <SelectValue placeholder="When can you start?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediately">Immediately</SelectItem>
                        <SelectItem value="2-weeks">2 weeks notice</SelectItem>
                        <SelectItem value="1-month">1 month notice</SelectItem>
                        <SelectItem value="2-months">
                          2 months notice
                        </SelectItem>
                        <SelectItem value="3-months">3+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="salary"
                      className="text-white flex items-center gap-1"
                    >
                      <DollarSign size={14} />
                      Expected Salary
                    </Label>
                    <Input
                      id="salary"
                      type="text"
                      value={applicationData.salary}
                      onChange={(e) => onInputChange("salary", e.target.value)}
                      className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white focus:border-[#7B68EE]"
                      placeholder="e.g., $80,000 - $100,000"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Cover Letter
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="coverLetter" className="text-white">
                    Why are you interested in this position? *
                  </Label>
                  <Textarea
                    id="coverLetter"
                    required
                    value={applicationData.coverLetter}
                    onChange={(e) =>
                      onInputChange("coverLetter", e.target.value)
                    }
                    className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white focus:border-[#7B68EE] min-h-[120px]"
                    placeholder="Tell us why you're excited about this role and what makes you a great fit..."
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Additional Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="referral" className="text-white">
                    How did you hear about us?
                  </Label>
                  <Select
                    value={applicationData.referral}
                    onValueChange={(value) => onInputChange("referral", value)}
                  >
                    <SelectTrigger className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Company Website</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="job-board">Job Board</SelectItem>
                      <SelectItem value="referral">
                        Employee Referral
                      </SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="text-white">
                    Additional Comments (Optional)
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    value={applicationData.additionalInfo}
                    onChange={(e) =>
                      onInputChange("additionalInfo", e.target.value)
                    }
                    className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white focus:border-[#7B68EE]"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#7B68EE]/20">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6B58DE] hover:to-[#8323D9] text-white"
                >
                  Submit Application
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-[#7B68EE]/30 text-[#7B68EE] hover:bg-[#7B68EE] hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ApplicationForm;
