"use client"
import { useState, useRef, useEffect } from "react"
import {
  MessageSquare,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Search,
  X,
  Check,
  CheckCheck,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { toast } from "sonner"

const MessagingSystem = ({ isOpen, onClose, initialConversation = null, type = "community" }) => {
  const [activeConversation, setActiveConversation] = useState(initialConversation)
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef(null)

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      type: "community",
      participant: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg",
        status: "online",
        role: "Full Stack Developer",
      },
      lastMessage: "Thanks for the collaboration offer! I'd love to discuss the React project.",
      timestamp: "2024-01-20 14:30",
      unread: 2,
      messages: [
        {
          id: 1,
          sender: "other",
          content: "Hi! I saw your profile and I'm interested in collaborating on a React project.",
          timestamp: "2024-01-20 10:15",
          status: "read",
        },
        {
          id: 2,
          sender: "me",
          content: "That sounds great! What kind of project are you working on?",
          timestamp: "2024-01-20 10:45",
          status: "read",
        },
        {
          id: 3,
          sender: "other",
          content:
            "It's a fintech dashboard with real-time data visualization. I need help with the frontend architecture.",
          timestamp: "2024-01-20 14:20",
          status: "delivered",
        },
        {
          id: 4,
          sender: "other",
          content: "Thanks for the collaboration offer! I'd love to discuss the React project.",
          timestamp: "2024-01-20 14:30",
          status: "delivered",
        },
      ],
    },
    {
      id: 2,
      type: "support",
      participant: {
        name: "Support Team",
        avatar: "/placeholder.svg",
        status: "online",
        role: "Technical Support",
      },
      lastMessage: "Your API integration issue has been resolved. Please test and confirm.",
      timestamp: "2024-01-19 16:45",
      unread: 0,
      ticketId: "TICK-001",
      messages: [
        {
          id: 1,
          sender: "me",
          content: "I'm having trouble with the payment gateway API integration. Getting 401 errors consistently.",
          timestamp: "2024-01-19 09:30",
          status: "read",
          attachments: ["error-log.txt"],
        },
        {
          id: 2,
          sender: "other",
          content:
            "Hi! I see the issue. It looks like your API key might be incorrect. Can you double-check the key in your dashboard?",
          timestamp: "2024-01-19 10:15",
          status: "read",
        },
        {
          id: 3,
          sender: "me",
          content: "I checked the API key and it looks correct. Here's a screenshot of my configuration.",
          timestamp: "2024-01-19 14:20",
          status: "read",
          attachments: ["config-screenshot.png"],
        },
        {
          id: 4,
          sender: "other",
          content: "Your API integration issue has been resolved. Please test and confirm.",
          timestamp: "2024-01-19 16:45",
          status: "read",
        },
      ],
    },
    {
      id: 3,
      type: "consultation",
      participant: {
        name: "Dr. Alex Rivera",
        avatar: "/placeholder.svg",
        status: "away",
        role: "Senior Consultant",
      },
      lastMessage: "Looking forward to our session tomorrow at 2 PM.",
      timestamp: "2024-01-18 18:20",
      unread: 0,
      consultationId: "CONS-123",
      messages: [
        {
          id: 1,
          sender: "other",
          content: "Hi! I've reviewed your project brief. I have some great ideas for your API architecture.",
          timestamp: "2024-01-18 15:30",
          status: "read",
        },
        {
          id: 2,
          sender: "me",
          content: "That's excellent! I'm particularly interested in scalability patterns.",
          timestamp: "2024-01-18 16:15",
          status: "read",
        },
        {
          id: 3,
          sender: "other",
          content: "Perfect! We can dive deep into microservices architecture and caching strategies.",
          timestamp: "2024-01-18 17:45",
          status: "read",
        },
        {
          id: 4,
          sender: "other",
          content: "Looking forward to our session tomorrow at 2 PM.",
          timestamp: "2024-01-18 18:20",
          status: "read",
        },
      ],
    },
  ]

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeConversation?.messages])

  const handleSendMessage = () => {
    if (!message.trim() || !activeConversation) return

    const newMessage = {
      id: Date.now(),
      sender: "me",
      content: message,
      timestamp: new Date().toISOString(),
      status: "sending",
    }

    // Update conversation with new message
    setActiveConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }))

    setMessage("")
    toast.success("Message sent!")

    // Simulate message delivery
    setTimeout(() => {
      setActiveConversation((prev) => ({
        ...prev,
        messages: prev.messages.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)),
      }))
    }, 1000)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "sending":
        return <Clock size={12} className="text-zinc-400" />
      case "delivered":
        return <Check size={12} className="text-zinc-400" />
      case "read":
        return <CheckCheck size={12} className="text-[#7B68EE]" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a0b1a] border-[#7B68EE]/20 text-white max-w-6xl max-h-[90vh] p-0">
        <div className="flex h-[80vh]">
          {/* Conversations List */}
          <div className="w-80 border-r border-[#7B68EE]/20 flex flex-col">
            <div className="p-4 border-b border-[#7B68EE]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Messages</h3>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-zinc-400 hover:text-white">
                  <X size={20} />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={16} />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#1a1b2e] border-[#7B68EE]/30 text-white"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setActiveConversation(conversation)}
                  className={`p-4 border-b border-[#7B68EE]/10 cursor-pointer transition-colors ${
                    activeConversation?.id === conversation.id
                      ? "bg-[#7B68EE]/10 border-l-4 border-l-[#7B68EE]"
                      : "hover:bg-[#1a1b2e]/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src={conversation.participant.avatar || "/placeholder.svg"}
                        alt={conversation.participant.name}
                        className="w-12 h-12 rounded-full border-2 border-[#7B68EE]/30"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0a0b1a] ${getStatusColor(conversation.participant.status)}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-white truncate">{conversation.participant.name}</h4>
                        <span className="text-xs text-zinc-400">
                          {new Date(conversation.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 mb-1">{conversation.participant.role}</p>
                      <p className="text-sm text-zinc-300 truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-1">
                          {conversation.type === "support" && (
                            <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">
                              Support
                            </Badge>
                          )}
                          {conversation.type === "consultation" && (
                            <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                              Consultation
                            </Badge>
                          )}
                        </div>
                        {conversation.unread > 0 && (
                          <Badge className="bg-[#7B68EE] text-white text-xs">{conversation.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {activeConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-[#7B68EE]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={activeConversation.participant.avatar || "/placeholder.svg"}
                      alt={activeConversation.participant.name}
                      className="w-10 h-10 rounded-full border-2 border-[#7B68EE]/30"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0b1a] ${getStatusColor(activeConversation.participant.status)}`}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{activeConversation.participant.name}</h4>
                    <p className="text-sm text-zinc-400">{activeConversation.participant.role}</p>
                  </div>
                  {activeConversation.ticketId && (
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      {activeConversation.ticketId}
                    </Badge>
                  )}
                  {activeConversation.consultationId && (
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      {activeConversation.consultationId}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                    <Phone size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                    <Video size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConversation.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === "me"
                          ? "bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white"
                          : "bg-[#1a1b2e] text-white border border-[#7B68EE]/20"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {msg.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs opacity-80">
                              <Paperclip size={12} />
                              <span>{attachment}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div
                        className={`flex items-center justify-between mt-1 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <span className="text-xs opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {msg.sender === "me" && <div className="ml-2">{getStatusIcon(msg.status)}</div>}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-[#7B68EE]/20">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="bg-[#1a1b2e] border-[#7B68EE]/30 text-white resize-none"
                      rows={2}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                      <Paperclip size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                      <Smile size={16} />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6A5ACD] hover:to-[#8A2BE2] disabled:opacity-50"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare size={48} className="mx-auto text-zinc-600 mb-4" />
                <h3 className="text-lg font-semibold text-zinc-400 mb-2">Select a conversation</h3>
                <p className="text-zinc-500">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MessagingSystem
