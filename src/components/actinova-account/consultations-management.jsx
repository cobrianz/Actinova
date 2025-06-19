"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Calendar, Clock, Video, Phone, MessageSquare, Plus, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const ConsultationsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const consultations = [
    {
      id: 1,
      title: "API Integration Strategy",
      consultant: "Sarah Johnson",
      date: "2024-01-15",
      time: "14:00",
      duration: "60 min",
      type: "video",
      status: "upcoming",
      notes: "Discuss REST API implementation for e-commerce platform",
    },
    {
      id: 2,
      title: "Database Optimization Review",
      consultant: "Mike Chen",
      date: "2024-01-10",
      time: "10:00",
      duration: "45 min",
      type: "call",
      status: "completed",
      notes: "Performance tuning for PostgreSQL database",
      summary: "Identified 3 key optimization areas. Provided SQL query improvements.",
    },
    {
      id: 3,
      title: "Cloud Migration Planning",
      consultant: "Alex Rivera",
      date: "2024-01-20",
      time: "16:00",
      duration: "90 min",
      type: "video",
      status: "upcoming",
      notes: "AWS migration strategy for legacy application",
    },
  ]

  const consultants = [
    { id: 1, name: "Sarah Johnson", specialty: "API Development", rating: 4.9 },
    { id: 2, name: "Mike Chen", specialty: "Database Optimization", rating: 4.8 },
    { id: 3, name: "Alex Rivera", specialty: "Cloud Architecture", rating: 4.9 },
    { id: 4, name: "Emma Davis", specialty: "DevOps & Automation", rating: 4.7 },
  ]

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.consultant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || consultation.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleBookConsultation = (formData) => {
    toast.success("Consultation booked successfully!")
    setIsBookingModalOpen(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video size={16} />
      case "call":
        return <Phone size={16} />
      case "chat":
        return <MessageSquare size={16} />
      default:
        return <Calendar size={16} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Consultations & Bookings</h1>
          <p className="text-zinc-400 mt-2">Manage your consultation sessions and book new appointments</p>
        </div>
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6A5ACD] hover:to-[#8A2BE2]">
              <Plus size={20} className="mr-2" />
              Book Consultation
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1b2e] border-[#7B68EE]/20 text-white">
            <DialogHeader>
              <DialogTitle>Book New Consultation</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleBookConsultation(new FormData(e.target))
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="topic">Consultation Topic</Label>
                <Input
                  id="topic"
                  name="topic"
                  placeholder="e.g., API Integration, Database Design"
                  className="bg-[#0a0b1a] border-[#7B68EE]/30"
                  required
                />
              </div>
              <div>
                <Label htmlFor="consultant">Select Consultant</Label>
                <Select name="consultant" required>
                  <SelectTrigger className="bg-[#0a0b1a] border-[#7B68EE]/30">
                    <SelectValue placeholder="Choose a consultant" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
                    {consultants.map((consultant) => (
                      <SelectItem key={consultant.id} value={consultant.id.toString()}>
                        {consultant.name} - {consultant.specialty} (★ {consultant.rating})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" name="date" type="date" className="bg-[#0a0b1a] border-[#7B68EE]/30" required />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <Input id="time" name="time" type="time" className="bg-[#0a0b1a] border-[#7B68EE]/30" required />
                </div>
              </div>
              <div>
                <Label htmlFor="type">Session Type</Label>
                <Select name="type" required>
                  <SelectTrigger className="bg-[#0a0b1a] border-[#7B68EE]/30">
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="chat">Chat Session</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Pre-Consultation Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Describe your project, specific questions, or goals for this consultation..."
                  className="bg-[#0a0b1a] border-[#7B68EE]/30"
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[#7B68EE] to-[#9333EA]">
                Book Consultation
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
          <Input
            placeholder="Search consultations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#1a1b2e] border-[#7B68EE]/30 text-white"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 bg-[#1a1b2e] border-[#7B68EE]/30 text-white">
            <Filter size={16} className="mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Consultations List */}
      <div className="grid gap-4">
        {filteredConsultations.map((consultation) => (
          <motion.div
            key={consultation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-[#1a1b2e] border-[#7B68EE]/20 hover:border-[#7B68EE]/40 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{consultation.title}</h3>
                      <Badge className={`${getStatusColor(consultation.status)} text-white`}>
                        {consultation.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {consultation.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {consultation.time} ({consultation.duration})
                      </div>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(consultation.type)}
                        {consultation.type}
                      </div>
                    </div>
                    <p className="text-zinc-300 mb-2">
                      <strong>Consultant:</strong> {consultation.consultant}
                    </p>
                    <p className="text-zinc-400 text-sm">{consultation.notes}</p>
                    {consultation.summary && (
                      <div className="mt-3 p-3 bg-[#0a0b1a] rounded-lg border border-[#7B68EE]/20">
                        <p className="text-sm text-zinc-300">
                          <strong className="text-[#7B68EE]">Summary:</strong> {consultation.summary}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {consultation.status === "upcoming" && (
                      <>
                        <Button variant="outline" size="sm" className="border-[#7B68EE]/30 text-[#7B68EE]">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-500/30 text-red-400">
                          Cancel
                        </Button>
                      </>
                    )}
                    {consultation.status === "completed" && (
                      <Button variant="outline" size="sm" className="border-[#7B68EE]/30 text-[#7B68EE]">
                        Book Follow-up
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredConsultations.length === 0 && (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-zinc-600 mb-4" />
          <h3 className="text-lg font-semibold text-zinc-400 mb-2">No consultations found</h3>
          <p className="text-zinc-500">Try adjusting your search or book a new consultation</p>
        </div>
      )}
    </div>
  )
}

export default ConsultationsManagement
