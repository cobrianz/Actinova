"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  DollarSign,
  Calendar, 
  Users,
  ArrowRight,
} from "lucide-react";

const JobCard = ({ job, onApply, featured = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`group bg-[#1a1b2e]/30 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 cursor-pointer ${
        featured
          ? "border-[#7B68EE]/30 hover:border-[#7B68EE]/50 shadow-lg shadow-[#7B68EE]/10"
          : "border-[#7B68EE]/10 hover:border-[#7B68EE]/30"
      }`}
      onClick={() => onApply(job)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-white group-hover:text-[#7B68EE] transition-colors">
              {job.title}
            </h3>
            {featured && (
              <Badge className="bg-[#7B68EE] text-white text-xs">
                Featured
              </Badge>
            )}
          </div>
          <p className="text-zinc-400 text-sm mb-3">{job.description}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Users size={14} />
          <span>{job.department}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <MapPin size={14} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Clock size={14} />
          <span>
            {job.type} • {job.experience}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <DollarSign size={14} />
          <span>{job.salary}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-[#7B68EE]/10 text-[#7B68EE] text-xs rounded-md"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="px-2 py-1 bg-zinc-700/30 text-zinc-400 text-xs rounded-md">
            +{job.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#7B68EE]/10">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Calendar size={12} />
          <span>Posted {new Date(job.posted).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-[#7B68EE] group-hover:text-white transition-colors text-sm">
          <span>View Details</span>
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
