"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  User,
  Calendar,
  FileText,
  MessageCircle,
  Download,
  Eye,
  EyeOff,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  X,
  Phone,
} from "lucide-react"
import { myServices, serviceCategories } from "../../lib/actinova-account-data"
import { toast } from "sonner"

const ServicesManagement = () => {
  const [services, setServices] = useState(myServices)
  const [selectedService, setSelectedService] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showTimeline, setShowTimeline] = useState({})

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || service.status === statusFilter
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status) => {
    const variants = {
      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      in_progress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      delivered: "bg-green-500/10 text-green-500 border-green-500/20",
      on_hold: "bg-red-500/10 text-red-500 border-red-500/20",
    }

    const labels = {
      pending: "Pending",
      in_progress: "In Progress",
      delivered: "Delivered",
      on_hold: "On Hold",
    }

    return (
      <Badge variant="outline" className={variants[status] || variants.pending}>
        {labels[status] || status}
      </Badge>
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock size={16} className="text-yellow-500" />
      case "in_progress":
        return <Play size={16} className="text-blue-500" />
      case "delivered":
        return <CheckCircle size={16} className="text-green-500" />
      case "on_hold":
        return <Pause size={16} className="text-red-500" />
      default:
        return <AlertCircle size={16} className="text-gray-500" />
    }
  }

  const getTimelineIcon = (type) => {
    switch (type) {
      case "start":
        return <Play size={12} className="text-green-500" />
      case "milestone":
        return <CheckCircle size={12} className="text-blue-500" />
      case "progress":
        return <Clock size={12} className="text-yellow-500" />
      case "completed":
        return <CheckCircle size={12} className="text-green-500" />
      default:
        return <AlertCircle size={12} className="text-gray-500" />
    }
  }

  const handleRequestUpdate = (serviceId) => {
    toast.success("Update request sent to assigned developer")
  }

  const handleCancelService = (serviceId) => {
    toast.success("Service cancellation request submitted")
  }

  const handleBookReviewCall = (serviceId) => {
    toast.success("Review call booking request sent")
  }

  const handleDownloadAttachment = (attachment) => {
    toast.success(`Downloading ${attachment.name}`)
  }

  const toggleTimeline = (serviceId) => {
    setShowTimeline((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }))
  }

  // Service Detail Modal
  const ServiceDetailModal = ({ service, onClose }) => (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#0a0b1a] border border-[#7B68EE]/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[#7B68EE]/20">
              <div>
                <h2 className="text-2xl font-bold text-white">{service.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  {getStatusBadge(service.status)}
                  <Badge variant="outline" className="border-[#7B68EE]/30 text-[#7B68EE]">
                    {service.category}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-zinc-400 hover:text-white">
                <X size={20} />
              </Button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Service Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Service Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Assigned Developer</span>
                        <span className="text-white">{service.assignedDev || "Not assigned"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Start Date</span>
                        <span className="text-white">
                          {service.startDate ? new Date(service.startDate).toLocaleDateString() : "TBD"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Delivery Date</span>
                        <span className="text-white">
                          {service.deliveryDate ? new Date(service.deliveryDate).toLocaleDateString() : "TBD"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Progress</span>
                        <span className="text-white">{service.progress}%</span>
                      </div>
                    </div>

                    {service.progress > 0 && (
                      <div className="mt-4">
                        <Progress value={service.progress} className="h-2" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
                    <div className="p-4 bg-[#1a1b2e]/50 rounded-lg border border-[#7B68EE]/20">
                      <p className="text-zinc-300 text-sm">{service.notes}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Deliverables</h3>
                    <ul className="space-y-2">
                      {service.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-zinc-300">
                          <CheckCircle size={16} className="text-green-500" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Attachments & Timeline */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Attachments</h3>
                    <div className="space-y-3">
                      {service.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-[#1a1b2e]/50 rounded-lg border border-[#7B68EE]/10"
                        >
                          <div className="flex items-center gap-3">
                            <FileText size={20} className="text-[#7B68EE]" />
                            <div>
                              <p className="text-white text-sm font-medium">{attachment.name}</p>
                              <p className="text-zinc-400 text-xs">
                                {attachment.size} • {new Date(attachment.uploadDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadAttachment(attachment)}
                            className="text-[#7B68EE] hover:text-white"
                          >
                            <Download size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Timeline</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTimeline(service.id)}
                        className="text-[#7B68EE] hover:text-white"
                      >
                        {showTimeline[service.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>

                    {showTimeline[service.id] && (
                      <div className="space-y-3">
                        {service.timeline.map((event, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="p-1 bg-[#7B68EE]/10 rounded-full mt-1">{getTimelineIcon(event.type)}</div>
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">{event.event}</p>
                              <p className="text-zinc-400 text-xs">{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-[#7B68EE]/20">
                <Button
                  onClick={() => handleRequestUpdate(service.id)}
                  className="bg-[#7B68EE] text-white hover:bg-[#6B58DE]"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Request Update
                </Button>
                <Button
                  onClick={() => handleBookReviewCall(service.id)}
                  variant="outline"
                  className="border-[#7B68EE]/30 text-[#7B68EE] hover:bg-[#7B68EE]/10"
                >
                  <Phone size={16} className="mr-2" />
                  Book Review Call
                </Button>
                <Button
                  onClick={() => handleCancelService(service.id)}
                  variant="outline"
                  className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                >
                  Cancel Service
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Services</h1>
        <p className="text-zinc-400">Track all your client-service engagements and project progress</p>
      </div>

      {/* Filters */}
      <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={16} />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {serviceCategories.map((category) => (
                  <SelectItem key={category.value} value={category.label}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 hover:border-[#7B68EE]/40 transition-colors cursor-pointer"
            onClick={() => setSelectedService(service)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  {getStatusIcon(service.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                      {getStatusBadge(service.status)}
                      <Badge variant="outline" className="border-[#7B68EE]/30 text-[#7B68EE]">
                        {service.category}
                      </Badge>
                    </div>
                    <p className="text-zinc-400 text-sm mb-3">{service.notes}</p>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      {service.assignedDev && (
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {service.assignedDev}
                        </span>
                      )}
                      {service.startDate && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          Started {new Date(service.startDate).toLocaleDateString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <FileText size={12} />
                        {service.attachments.length} attachments
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{service.progress}%</p>
                  <p className="text-xs text-zinc-400">Complete</p>
                </div>
              </div>

              {service.progress > 0 && (
                <div className="mb-4">
                  <Progress value={service.progress} className="h-2" />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {service.deliverables.slice(0, 3).map((deliverable, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-[#7B68EE]/20 text-zinc-400">
                      {deliverable}
                    </Badge>
                  ))}
                  {service.deliverables.length > 3 && (
                    <Badge variant="outline" className="text-xs border-[#7B68EE]/20 text-zinc-400">
                      +{service.deliverables.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRequestUpdate(service.id)
                    }}
                    className="text-[#7B68EE] hover:text-white"
                  >
                    <MessageCircle size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBookReviewCall(service.id)
                    }}
                    className="text-[#7B68EE] hover:text-white"
                  >
                    <Phone size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
          <CardContent className="p-12 text-center">
            <Settings size={48} className="text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Services Found</h3>
            <p className="text-zinc-400 mb-6">
              {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your filters to see more services."
                : "You haven't started any services yet. Contact us to get started!"}
            </p>
            <Button className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6B58DE] hover:to-[#8323D9] text-white">
              Request New Service
            </Button>
          </CardContent>
        </Card>
      )}

      <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} />
    </div>
  )
}

export default ServicesManagement
