"use client"
import { useState } from "react"
import { User, Bell, Shield, Users, Trash2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState("account")
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  })

  const settingsTabs = [
    { id: "account", label: "Account Preferences", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "team", label: "Team Management", icon: Users },
  ]

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!")
  }

  const handleDeleteAccount = () => {
    toast.error("Account deletion requires email confirmation")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 mt-2">Manage your account preferences and security settings</p>
      </div>

      {/* Settings Tabs */}
      <div className="flex space-x-1 bg-[#1a1b2e] p-1 rounded-lg border border-[#7B68EE]/20">
        {settingsTabs.map((tab) => {
          const Icon = tab.icon
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
          )
        })}
      </div>

      {/* Account Preferences */}
      {activeTab === "account" && (
        <div className="space-y-6">
          <Card className="bg-[#1a1b2e] border-[#7B68EE]/20">
            <CardHeader>
              <CardTitle className="text-white">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-5">
                    <SelectTrigger className="bg-[#0a0b1a] border-[#7B68EE]/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc+0">UTC</SelectItem>
                      <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="bg-[#0a0b1a] border-[#7B68EE]/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="communication">Preferred Communication</Label>
                <Select defaultValue="email">
                  <SelectTrigger className="bg-[#0a0b1a] border-[#7B68EE]/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="teams">Microsoft Teams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA]">
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1b2e] border-[#7B68EE]/20">
            <CardHeader>
              <CardTitle className="text-white">Account Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold">Switch Account Type</h4>
                  <p className="text-zinc-400 text-sm">Change between Individual and Company account</p>
                </div>
                <Button variant="outline" className="border-[#7B68EE]/30 text-[#7B68EE]">
                  Switch to Company
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <Card className="bg-[#1a1b2e] border-[#7B68EE]/20">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">Email Notifications</h4>
                    <p className="text-zinc-400 text-sm">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                <Separator className="bg-[#7B68EE]/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">SMS Notifications</h4>
                    <p className="text-zinc-400 text-sm">Receive urgent updates via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>
                <Separator className="bg-[#7B68EE]/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">Push Notifications</h4>
                    <p className="text-zinc-400 text-sm">Browser and mobile push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
                <Separator className="bg-[#7B68EE]/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">Marketing Communications</h4>
                    <p className="text-zinc-400 text-sm">Product updates and promotional content</p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                  />
                </div>
              </div>
              <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA]">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <Card className="bg-[#1a1b2e] border-[#7B68EE]/20">
            <CardHeader>
              <CardTitle className="text-white">Password & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    className="bg-[#0a0b1a] border-[#7B68EE]/30 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-zinc-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="bg-[#0a0b1a] border-[#7B68EE]/30 text-white" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="bg-[#0a0b1a] border-[#7B68EE]/30 text-white" />
              </div>
              <Button className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA]">Update Password</Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1b2e] border-[#7B68EE]/20">
            <CardHeader>
              <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold">Enable 2FA</h4>
                  <p className="text-zinc-400 text-sm">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline" className="border-[#7B68EE]/30 text-[#7B68EE]">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Team Management */}
      {activeTab === "team" && (
        <div className="space-y-6">
          <Card className="bg-[#1a1b2e] border-[#7B68EE]/20">
            <CardHeader>
              <CardTitle className="text-white">Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-zinc-400">Manage team members and their permissions</p>
                <Button className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA]">Invite Member</Button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#0a0b1a] rounded-lg border border-[#7B68EE]/20">
                  <div>
                    <h4 className="text-white font-semibold">John Doe (You)</h4>
                    <p className="text-zinc-400 text-sm">john@company.com • Admin</p>
                  </div>
                  <span className="text-[#7B68EE] text-sm">Owner</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1b2e] border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-400">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold">Delete Account</h4>
                  <p className="text-zinc-400 text-sm">Permanently delete your account and all data</p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleDeleteAccount}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default SettingsManagement
