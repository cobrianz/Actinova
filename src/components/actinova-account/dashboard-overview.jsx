"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  FileText,
  MessageCircle,
  Settings,
  Upload,
  BookOpen,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
} from "lucide-react"
import { dashboardStats } from "../../lib/actinova-account-data"

const DashboardOverview = ({ user, accountType }) => {
  const quickActions = [
    {
      title: "Book Service",
      description: "Schedule a new service or consultation",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      action: () => console.log("Book service"),
    },
    {
      title: "Upload Project Brief",
      description: "Share your project requirements",
      icon: Upload,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      action: () => console.log("Upload brief"),
    },
    {
      title: "View Business Guides",
      description: "Access our resource library",
      icon: BookOpen,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      action: () => console.log("View guides"),
    },
    {
      title: "Join Networking Event",
      description: "Connect with other professionals",
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      action: () => console.log("Join event"),
    },
  ]

  const statusCards = [
    {
      title: "Active Services",
      value: dashboardStats.activeServices,
      icon: Settings,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Currently running",
    },
    {
      title: "Next Consultation",
      value: new Date(dashboardStats.nextConsultation).toLocaleDateString(),
      icon: Calendar,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Upcoming session",
    },
    {
      title: "Purchased Documents",
      value: dashboardStats.purchasedDocuments,
      icon: FileText,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Available resources",
    },
    {
      title: "Open Tickets",
      value: dashboardStats.openSupportTickets,
      icon: MessageCircle,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      description: "Support requests",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "service",
      title: "CRM Integration project updated",
      description: "Progress: 75% complete",
      time: "2 hours ago",
      icon: Settings,
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "consultation",
      title: "API Strategy consultation scheduled",
      description: "Dec 20, 2024 at 2:00 PM",
      time: "1 day ago",
      icon: Calendar,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "purchase",
      title: "API Integration Guide purchased",
      description: "New resource available for download",
      time: "3 days ago",
      icon: FileText,
      color: "text-purple-500",
    },
    {
      id: 4,
      type: "support",
      title: "Support ticket created",
      description: "API Integration Issue - High Priority",
      time: "5 days ago",
      icon: MessageCircle,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name?.split(" ")[0]}! 👋</h1>
          <p className="text-zinc-400">
            {accountType === "company"
              ? "Manage your company's services and team collaboration"
              : "Here's an overview of your Actinova account and services"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-400">Member since</p>
          <p className="text-white font-semibold">{new Date(dashboardStats.memberSince).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 hover:border-[#7B68EE]/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">{card.title}</p>
                      <p className="text-2xl font-bold text-white">{card.value}</p>
                      <p className="text-xs text-zinc-500 mt-1">{card.description}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${card.bgColor}`}>
                      <Icon size={24} className={card.color} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-[#7B68EE]" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <motion.button
                  key={action.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.action}
                  className="p-4 bg-[#0a0b1a]/30 border border-[#7B68EE]/10 rounded-lg hover:border-[#7B68EE]/30 transition-colors group text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${action.bgColor}`}>
                      <Icon size={20} className={action.color} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium group-hover:text-[#7B68EE] transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1">{action.description}</p>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Account Summary & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Summary */}
        <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign size={20} className="text-green-500" />
              Account Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Account Type</span>
                <Badge className="bg-[#7B68EE]/20 text-[#7B68EE] border-[#7B68EE]/30">
                  {accountType === "company" ? "Company Account" : "Individual Account"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Total Spent</span>
                <span className="text-white font-semibold">${dashboardStats.totalSpent.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Active Services</span>
                <span className="text-white">{dashboardStats.activeServices}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Account Status</span>
                <span className="text-green-500 font-semibold flex items-center gap-1">
                  <CheckCircle size={16} />
                  Active
                </span>
              </div>

              <div className="pt-4 border-t border-[#7B68EE]/20">
                <Button variant="outline" className="w-full border-[#7B68EE]/30 text-[#7B68EE] hover:bg-[#7B68EE]/10">
                  View Billing Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock size={20} />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-[#0a0b1a]/30 rounded-lg">
                    <div className={`p-2 rounded-lg bg-[#7B68EE]/10`}>
                      <Icon size={16} className={activity.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm">{activity.title}</h4>
                      <p className="text-xs text-zinc-400 mt-1">{activity.description}</p>
                      <p className="text-xs text-zinc-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar size={20} className="text-[#7B68EE]" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-[#0a0b1a]/30 rounded-lg border border-[#7B68EE]/10">
              <div className="w-12 h-12 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] rounded-lg flex items-center justify-center">
                <Calendar size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">API Strategy Consultation</h3>
                <p className="text-sm text-zinc-400">December 20, 2024 at 2:00 PM</p>
                <p className="text-xs text-zinc-500 mt-1">with Dr. Alex Thompson</p>
              </div>
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Scheduled</Badge>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#0a0b1a]/30 rounded-lg border border-[#7B68EE]/10">
              <div className="w-12 h-12 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] rounded-lg flex items-center justify-center">
                <Users size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">API Developers Meetup</h3>
                <p className="text-sm text-zinc-400">December 22, 2024 at 6:00 PM</p>
                <p className="text-xs text-zinc-500 mt-1">Virtual networking event</p>
              </div>
              <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Registered</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardOverview
