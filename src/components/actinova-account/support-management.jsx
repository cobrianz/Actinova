"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { MessageSquare, Plus, Search, Filter, Clock, CheckCircle, AlertCircle, User, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import MessagingSystem from "./messaging-system"

const SupportManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isMessagingOpen, setIsMessagingOpen] = useState(false)
  const [selectedTicketConversation, setSelectedTicketConversation] = useState(null)

  const supportTickets = [
    {
      id: "TICK-001",
      title: "API Integration Issue",
      description: "Having trouble with the payment gateway API integration. Getting 401 errors consistently.",
      status: "open",
      priority: "high",
      category: "technical",
      createdDate: "2024-01-15",
      lastUpdate: "2024-01-16",
      assignedTo: "Sarah Johnson",
      messages: [
        {
          id: 1,
          sender: "user",
          message: "I'm getting 401 errors when trying to integrate the payment API. Can you help?",
          timestamp: "2024-01-15 10:30",
          attachments: ["error-log.txt"],
        },
        {
          id: 2,
          sender: "support",
          message:
            "Hi! I see the issue. It looks like your API key might be incorrect. Can you double-check the key in your dashboard?",
          timestamp: "2024-01-15 14:20",
          attachments: [],
        },
      ],
    },
    {
      id: "TICK-002",
      title: "Billing Question",
      description: "Need clarification on the pricing for additional team members.",
      status: "waiting",
      priority: "medium",
      category: "billing",
      createdDate: "2024-01-12",
      lastUpdate: "2024-01-14",
      assignedTo: "Mike Chen",
      messages: [
        {
          id: 1,
          sender: "user",
          message: "What's the cost for adding 3 more team members to our account?",
          timestamp: "2024-01-12 09:15",
          attachments: [],
        },
        {
          id: 2,
          sender: "support",
          message:
            "Each additional team member is $15/month. For 3 members, that would be $45/month added to your current plan.",
          timestamp: "2024-01-12 11:30",
          attachments: [],
        },
      ],
    },
    {
      id: "TICK-003",
      title: "Feature Request - Dark Mode",
      description: "Would love to see a dark mode option in the dashboard.",
      status: "resolved",
      priority: "low",
      category: "feature",
      createdDate: "2024-01-08",
      lastUpdate: "2024-01-10",
      assignedTo: "Alex Rivera",
      messages: [
        {
          id: 1,
          sender: "user",
          message: "Any plans for a dark mode in the dashboard?",
          timestamp: "2024-01-08 16:45",
          attachments: [],
        },
        {
          id: 2,
          sender: "support",
          message: "Great suggestion! Dark mode is actually in our roadmap for Q2 2024.",
          timestamp: "2024-01-10 10:20",
          attachments: [],
        },
      ],
    },
  ]

  const filteredTickets = supportTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateTicket = (formData) => {
    toast.success("Support ticket created successfully!")
    setIsTicketModalOpen(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-blue-500"
      case "waiting":
        return "bg-yellow-500"
      case "resolved":
        return "bg-green-500"
      case "closed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertCircle size={16} />
      case "waiting":
        return <Clock size={16} />
      case "resolved":
        return <CheckCircle size={16} />
      default:
        return <MessageSquare size={16} />
    }
  }

  const handleOpenTicketChat = (ticket) => {
    setSelectedTicketConversation({
      id: ticket.id,
      type: "support",
      participant: {
        name: ticket.assignedTo,
        avatar: "/placeholder.svg",
        status: "online",
        role: "Technical Support",
      },
      lastMessage: ticket.messages[ticket.messages.length - 1]?.message || "",
      timestamp: ticket.lastUpdate,
      unread: 0,
      ticketId: ticket.id,
      messages: ticket.messages.map((msg) => ({
        id: msg.id,
        sender: msg.sender === "user" ? "me" : "other",
        content: msg.message,
        timestamp: msg.timestamp,
        status: "read",
        attachments: msg.attachments || [],
      })),
    })
    setIsMessagingOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Support & Help</h1>
          <p className="text-zinc-400 mt-2">Get help with your account, services, and technical issues</p>
        </div>
        <Dialog open={isTicketModalOpen} onOpenChange={setIsTicketModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6A5ACD] hover:to-[#8A2BE2]">
              <Plus size={20} className="mr-2" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1b2e] border-[#7B68EE]/20 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleCreateTicket(new FormData(e.target))
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="title">Issue Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Brief description of your issue"
                  className="bg-[#0a0b1a] border-[#7B68EE]/30"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger className="bg-[#0a0b1a] border-[#7B68EE]/30">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="account">Account Issue</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select name="priority" required>
                    <SelectTrigger className="bg-[#0a0b1a] border-[#7B68EE]/30">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Please provide as much detail as possible about your issue..."
                  className="bg-[#0a0b1a] border-[#7B68EE]/30"
                  rows={4}
                  required
                />
              </div>
              <div>
                <Label htmlFor="service">Related Service (Optional)</Label>
                <Select name="service">
                  <SelectTrigger className="bg-[#0a0b1a] border-[#7B68EE]/30">
                    <SelectValue placeholder="Select related service" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
                    <SelectItem value="api-integration">API Integration</SelectItem>
                    <SelectItem value="automation">Automation Setup</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="attachments">Attachments (Optional)</Label>
                <Input
                  id="attachments"
                  name="attachments"
                  type="file"
                  multiple
                  className="bg-[#0a0b1a] border-[#7B68EE]/30"
                />
                <p className="text-xs text-zinc-400 mt-1">Screenshots, error logs, or other relevant files</p>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[#7B68EE] to-[#9333EA]">
                Create Ticket
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Help */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1a1b2e] border-[#7B68EE]/20 hover:border-[#7B68EE]/40 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageSquare className="mx-auto mb-3 text-[#7B68EE]" size={32} />
            <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
            <p className="text-zinc-400 text-sm">Get instant help from our support team</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1b2e] border-[#7B68EE]/20 hover:border-[#7B68EE]/40 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <User className="mx-auto mb-3 text-[#7B68EE]" size={32} />
            <h3 className="text-lg font-semibold text-white mb-2">Book Call</h3>
            <p className="text-zinc-400 text-sm">Schedule a call with our experts</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1b2e] border-[#7B68EE]/20 hover:border-[#7B68EE]/40 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageSquare className="mx-auto mb-3 text-[#7B68EE]" size={32} />
            <h3 className="text-lg font-semibold text-white mb-2">Help Center</h3>
            <p className="text-zinc-400 text-sm">Browse our knowledge base and FAQs</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
          <Input
            placeholder="Search tickets..."
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
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="waiting">Waiting</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Support Tickets */}
      <div className="grid gap-4">
        {filteredTickets.map((ticket) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="bg-[#1a1b2e] border-[#7B68EE]/20 hover:border-[#7B68EE]/40 transition-colors cursor-pointer"
              onClick={() => handleOpenTicketChat(ticket)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-zinc-400">{ticket.id}</span>
                      <h3 className="text-lg font-semibold text-white">{ticket.title}</h3>
                      <Badge className={`${getStatusColor(ticket.status)} text-white`}>
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1">{ticket.status}</span>
                      </Badge>
                    </div>
                    <p className="text-zinc-400 mb-3">{ticket.description}</p>
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <span>Created: {ticket.createdDate}</span>
                      <span>Updated: {ticket.lastUpdate}</span>
                      <span>Assigned to: {ticket.assignedTo}</span>
                      <span className={`font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()} Priority
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-[#7B68EE]/30 text-[#7B68EE]">
                      {ticket.category}
                    </Badge>
                    <span className="text-zinc-400 text-sm">{ticket.messages.length} messages</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare size={48} className="mx-auto text-zinc-600 mb-4" />
          <h3 className="text-lg font-semibold text-zinc-400 mb-2">No support tickets found</h3>
          <p className="text-zinc-500">Try adjusting your search or create a new ticket</p>
        </div>
      )}

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent className="bg-[#1a1b2e] border-[#7B68EE]/20 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <span className="font-mono text-sm text-zinc-400">{selectedTicket.id}</span>
                {selectedTicket.title}
                <Badge className={`${getStatusColor(selectedTicket.status)} text-white`}>{selectedTicket.status}</Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <span>
                  Priority: <span className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</span>
                </span>
                <span>Category: {selectedTicket.category}</span>
                <span>Assigned to: {selectedTicket.assignedTo}</span>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Conversation</h4>
                {selectedTicket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.sender === "user"
                        ? "bg-[#7B68EE]/10 border border-[#7B68EE]/20 ml-8"
                        : "bg-[#0a0b1a] border border-zinc-700 mr-8"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-white">
                        {message.sender === "user" ? "You" : "Support Team"}
                      </span>
                      <span className="text-xs text-zinc-400">{message.timestamp}</span>
                    </div>
                    <p className="text-zinc-300">{message.message}</p>
                    {message.attachments.length > 0 && (
                      <div className="mt-2 flex gap-2">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-1 text-xs text-[#7B68EE]">
                            <Paperclip size={12} />
                            {attachment}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {selectedTicket.status !== "resolved" && selectedTicket.status !== "closed" && (
                <div className="space-y-2">
                  <Label htmlFor="reply">Add Reply</Label>
                  <Textarea
                    id="reply"
                    placeholder="Type your message..."
                    className="bg-[#0a0b1a] border-[#7B68EE]/30"
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <Input type="file" multiple className="bg-[#0a0b1a] border-[#7B68EE]/30 max-w-xs" />
                    <Button className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA]">Send Reply</Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
      <MessagingSystem
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        initialConversation={selectedTicketConversation}
        type="support"
      />
    </div>
  )
}

export default SupportManagement
