"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Users,
  Calendar,
  MessageSquare,
  Star,
  MapPin,
  Building,
  Plus,
  Search,
  Filter,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import MessagingSystem from "./messaging-system";

const Networking = () => {
  const [activeTab, setActiveTab] = useState("community");
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const communityMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Full Stack Developer",
      company: "TechStart Inc",
      industry: "fintech",
      location: "San Francisco, CA",
      rating: 4.9,
      projects: 12,
      avatar: "/placeholder.svg",
      skills: ["React", "Node.js", "AWS"],
      lookingFor: "Frontend collaboration",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "DevOps Engineer",
      company: "CloudScale",
      industry: "saas",
      location: "Austin, TX",
      rating: 4.8,
      projects: 8,
      avatar: "/placeholder.svg",
      skills: ["Docker", "Kubernetes", "CI/CD"],
      lookingFor: "Infrastructure partnerships",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Product Manager",
      company: "InnovateLab",
      industry: "healthcare",
      location: "Boston, MA",
      rating: 4.7,
      projects: 15,
      avatar: "/placeholder.svg",
      skills: ["Product Strategy", "User Research", "Analytics"],
      lookingFor: "Technical co-founder",
    },
  ];

  const networkingEvents = [
    {
      id: 1,
      title: "API Development Masterclass",
      date: "2024-01-25",
      time: "18:00",
      type: "workshop",
      attendees: 45,
      maxAttendees: 50,
      description: "Learn advanced API design patterns and best practices",
      host: "Actinova Team",
    },
    {
      id: 2,
      title: "Startup Pitch Night",
      date: "2024-02-01",
      time: "19:00",
      type: "networking",
      attendees: 32,
      maxAttendees: 40,
      description: "Present your startup idea and get feedback from experts",
      host: "Community",
    },
    {
      id: 3,
      title: "Cloud Architecture Discussion",
      date: "2024-02-08",
      time: "17:30",
      type: "discussion",
      attendees: 28,
      maxAttendees: 35,
      description: "Deep dive into scalable cloud architecture patterns",
      host: "Alex Rivera",
    },
  ];

  const filteredMembers = communityMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      industryFilter === "all" || member.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const handleJoinEvent = (eventId) => {
    toast.success("Successfully registered for the event!");
  };

  const handleSendMessage = (memberId) => {
    const member = communityMembers.find((m) => m.id === memberId);
    if (member) {
      setSelectedConversation({
        id: memberId,
        type: "community",
        participant: {
          name: member.name,
          avatar: member.avatar,
          status: "online",
          role: member.role,
        },
        lastMessage: "",
        timestamp: new Date().toISOString(),
        unread: 0,
        messages: [],
      });
      setIsMessagingOpen(true);
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "workshop":
        return "bg-blue-500";
      case "networking":
        return "bg-green-500";
      case "discussion":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Networking</h1>
          <p className="text-zinc-400 mt-2">
            Connect with developers, startups, and businesses in the Actinova
            community
          </p>
        </div>
        <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6A5ACD] hover:to-[#8A2BE2]">
              <Plus size={20} className="mr-2" />
              Update Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1b2e] border-[#7B68EE]/20 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Update Networking Profile</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="portfolio">Portfolio URL</Label>
                  <Input
                    id="portfolio"
                    placeholder="https://yourportfolio.com"
                    className="bg-[#0a0b1a] border-[#7B68EE]/30"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourname"
                    className="bg-[#0a0b1a] border-[#7B68EE]/30"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell the community about your expertise and what you're working on..."
                  className="bg-[#0a0b1a] border-[#7B68EE]/30"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="skills">Skills & Technologies</Label>
                <Input
                  id="skills"
                  placeholder="React, Node.js, AWS, Python (comma separated)"
                  className="bg-[#0a0b1a] border-[#7B68EE]/30"
                />
              </div>
              <div>
                <Label htmlFor="looking-for">What are you looking for?</Label>
                <Select>
                  <SelectTrigger className="bg-[#0a0b1a] border-[#7B68EE]/30">
                    <SelectValue placeholder="Select your networking goals" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
                    <SelectItem value="collaboration">
                      Project Collaboration
                    </SelectItem>
                    <SelectItem value="cofounder">Co-founder</SelectItem>
                    <SelectItem value="mentorship">Mentorship</SelectItem>
                    <SelectItem value="clients">New Clients</SelectItem>
                    <SelectItem value="learning">
                      Learning Opportunities
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="public-profile" />
                <Label htmlFor="public-profile">
                  Make profile public in community
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#7B68EE] to-[#9333EA]"
              >
                Update Profile
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-[#1a1b2e] p-1 rounded-lg border border-[#7B68EE]/20">
        {[
          { id: "community", label: "Community Members", icon: Users },
          { id: "events", label: "Networking Events", icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Community Members Tab */}
      {activeTab === "community" && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                size={20}
              />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1a1b2e] border-[#7B68EE]/30 text-white"
              />
            </div>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-48 bg-[#1a1b2e] border-[#7B68EE]/30 text-white">
                <Filter size={16} className="mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="fintech">FinTech</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-[#1a1b2e] border-[#7B68EE]/20 hover:border-[#7B68EE]/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-12 h-12 rounded-full border-2 border-[#7B68EE]/30"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">
                          {member.name}
                        </h3>
                        <p className="text-[#7B68EE] text-sm">{member.role}</p>
                        <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                          <Building size={12} />
                          {member.company}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <MapPin size={12} />
                          {member.location}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500" />
                          <span className="text-white">{member.rating}</span>
                        </div>
                        <span className="text-zinc-400">
                          {member.projects} projects
                        </span>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-400 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-[#7B68EE]/30 text-[#7B68EE]"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-400">Looking for:</p>
                        <p className="text-sm text-zinc-300">
                          {member.lookingFor}
                        </p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSendMessage(member.id)}
                          className="flex-1 border-[#7B68EE]/30 text-[#7B68EE] hover:bg-[#7B68EE]/10"
                        >
                          <MessageSquare size={14} className="mr-1" />
                          Message
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6A5ACD] hover:to-[#8A2BE2]"
                        >
                          Connect
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === "events" && (
        <div className="space-y-6">
          <div className="grid gap-4">
            {networkingEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-[#1a1b2e] border-[#7B68EE]/20 hover:border-[#7B68EE]/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {event.title}
                          </h3>
                          <Badge
                            className={`${getEventTypeColor(
                              event.type
                            )} text-white`}
                          >
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={16} />
                            {event.attendees}/{event.maxAttendees} attendees
                          </div>
                        </div>
                        <p className="text-zinc-300 mb-2">
                          {event.description}
                        </p>
                        <p className="text-sm text-zinc-400">
                          <strong>Hosted by:</strong> {event.host}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleJoinEvent(event.id)}
                          className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6A5ACD] hover:to-[#8A2BE2]"
                          disabled={event.attendees >= event.maxAttendees}
                        >
                          {event.attendees >= event.maxAttendees
                            ? "Full"
                            : "Join Event"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      <MessagingSystem
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        initialConversation={selectedConversation}
        type="community"
      />
    </div>
  );
};

export default Networking;
