"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { User, Building2, Camera, Save, Plus, Trash2, Edit, Users, Tag, RefreshCw } from "lucide-react"
import {
  userProfile,
  companyProfile,
  userTypes,
  businessCategories,
  communicationChannels,
} from "../../lib/actinova-account-data"
import { toast } from "sonner"

const ProfileManagement = ({ accountType, setAccountType }) => {
  const [profile, setProfile] = useState(accountType === "company" ? companyProfile : userProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [newTeamMember, setNewTeamMember] = useState({ name: "", email: "", role: "team_member" })
  const [showAddMember, setShowAddMember] = useState(false)

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast.success("Profile updated successfully")
  }

  const handleAvatarUpload = () => {
    toast.success("Avatar updated successfully")
  }

  const handleSwitchAccountType = () => {
    const newType = accountType === "individual" ? "company" : "individual"
    setAccountType(newType)
    setProfile(newType === "company" ? companyProfile : userProfile)
    toast.success(`Switched to ${newType} account`)
  }

  const handleAddTeamMember = () => {
    if (!newTeamMember.name || !newTeamMember.email) {
      toast.error("Please fill in all required fields")
      return
    }

    const member = {
      id: Date.now(),
      ...newTeamMember,
      avatar: "/placeholder.svg?height=40&width=40",
      joinedDate: new Date().toISOString().split("T")[0],
    }

    setProfile((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, member],
    }))

    setNewTeamMember({ name: "", email: "", role: "team_member" })
    setShowAddMember(false)
    toast.success("Team member added successfully")
  }

  const handleRemoveTeamMember = (memberId) => {
    setProfile((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((member) => member.id !== memberId),
    }))
    toast.success("Team member removed")
  }

  const getRoleBadge = (role) => {
    const variants = {
      admin: "bg-red-500/10 text-red-500 border-red-500/20",
      team_member: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      viewer: "bg-green-500/10 text-green-500 border-green-500/20",
    }

    const labels = {
      admin: "Admin",
      team_member: "Team Member",
      viewer: "Viewer",
    }

    return (
      <Badge variant="outline" className={variants[role] || variants.team_member}>
        {labels[role] || role}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {accountType === "company" ? "Company Information" : "My Profile"}
          </h1>
          <p className="text-zinc-400">
            {accountType === "company"
              ? "Manage your company details and team members"
              : "Manage your personal information and preferences"}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleSwitchAccountType}
            variant="outline"
            className="border-[#7B68EE]/30 text-[#7B68EE] hover:bg-[#7B68EE]/10"
          >
            <RefreshCw size={16} className="mr-2" />
            Switch to {accountType === "individual" ? "Company" : "Individual"}
          </Button>
          <Button
            onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
            className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6B58DE] hover:to-[#8323D9] text-white"
          >
            {isEditing ? (
              <>
                <Save size={16} className="mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit size={16} className="mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Profile Information */}
      <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            {accountType === "company" ? <Building2 size={20} /> : <User size={20} />}
            {accountType === "company" ? "Company Details" : "Personal Information"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Avatar/Logo Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={profile.avatar || profile.logo || "/placeholder.svg"}
                  alt={profile.name || profile.companyName}
                  className="w-32 h-32 rounded-full border-4 border-[#7B68EE]/30 object-cover"
                />
                {isEditing && (
                  <Button
                    onClick={handleAvatarUpload}
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-[#7B68EE] hover:bg-[#6B58DE]"
                  >
                    <Camera size={16} />
                  </Button>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">{profile.name || profile.companyName}</h3>
                <p className="text-sm text-zinc-400">
                  {accountType === "company" ? profile.businessCategory : profile.userType}
                </p>
                <Badge className="mt-2 bg-[#7B68EE]/20 text-[#7B68EE] border-[#7B68EE]/30">
                  {accountType === "company" ? "Company Account" : "Individual Account"}
                </Badge>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              {accountType === "individual" ? (
                // Individual Profile Fields
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing}
                      className="bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white disabled:opacity-60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                      className="bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white disabled:opacity-60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userType" className="text-white">
                      User Type
                    </Label>
                    <Select
                      value={profile.userType}
                      onValueChange={(value) => handleInputChange("userType", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white disabled:opacity-60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {userTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="communication" className="text-white">
                      Preferred Communication
                    </Label>
                    <Select
                      value={profile.communicationChannel}
                      onValueChange={(value) => handleInputChange("communicationChannel", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white disabled:opacity-60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {communicationChannels.map((channel) => (
                          <SelectItem key={channel.value} value={channel.value}>
                            {channel.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      disabled={!isEditing}
                      className="bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white disabled:opacity-60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-white">
                      Timezone
                    </Label>
                    <Input
                      id="timezone"
                      value={profile.timezone}
                      onChange={(e) => handleInputChange("timezone", e.target.value)}
                      disabled={!isEditing}
                      className="bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white disabled:opacity-60"
                    />
                  </div>
                </div>
              ) : (
                // Company Profile Fields
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-white">
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        value={profile.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white disabled:opacity-60"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessCategory" className="text-white">
                        Business Category
                      </Label>
                      <Select
                        value={profile.businessCategory}
                        onValueChange={(value) => handleInputChange("businessCategory", value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white disabled:opacity-60">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {businessCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-white">
                        Industry
                      </Label>
                      <Input
                        id="industry"
                        value={profile.industry}
                        onChange={(e) => handleInputChange("industry", e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white disabled:opacity-60"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-white">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industryTags" className="text-white">
                      Industry Tags
                    </Label>
                    <div className="flex flex-wrap gap-2 p-3 bg-[#0a0b1a]/50 border border-[#7B68EE]/20 rounded-md">
                      {profile.industryTags?.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-[#7B68EE]/30 text-[#7B68EE]">
                          <Tag size={12} className="mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Management (Company Only) */}
      {accountType === "company" && (
        <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users size={20} />
                Team Members
              </span>
              <Button
                onClick={() => setShowAddMember(true)}
                size="sm"
                className="bg-[#7B68EE] text-white hover:bg-[#6B58DE]"
              >
                <Plus size={16} className="mr-1" />
                Add Member
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.teamMembers?.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-[#0a0b1a]/30 rounded-lg border border-[#7B68EE]/10"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-10 h-10 rounded-full border-2 border-[#7B68EE]/30"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{member.name}</span>
                        {getRoleBadge(member.role)}
                      </div>
                      <p className="text-sm text-zinc-400">{member.email}</p>
                      <p className="text-xs text-zinc-500">Joined {new Date(member.joinedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTeamMember(member.id)}
                      className="text-red-400 hover:text-red-300"
                      disabled={member.role === "admin"}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Team Member Form */}
            {showAddMember && (
              <div className="mt-6 p-4 bg-[#0a0b1a]/30 rounded-lg border border-[#7B68EE]/20">
                <h4 className="text-white font-medium mb-4">Add Team Member</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="memberName" className="text-white">
                      Name
                    </Label>
                    <Input
                      id="memberName"
                      value={newTeamMember.name}
                      onChange={(e) => setNewTeamMember((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memberEmail" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="memberEmail"
                      type="email"
                      value={newTeamMember.email}
                      onChange={(e) => setNewTeamMember((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memberRole" className="text-white">
                      Role
                    </Label>
                    <Select
                      value={newTeamMember.role}
                      onValueChange={(value) => setNewTeamMember((prev) => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="team_member">Team Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button onClick={handleAddTeamMember} className="bg-[#7B68EE] text-white hover:bg-[#6B58DE]">
                    Add Member
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddMember(false)}
                    className="border-[#7B68EE]/30 text-[#7B68EE] hover:bg-[#7B68EE]/10"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Account Information */}
      <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
        <CardHeader>
          <CardTitle className="text-white">Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Account ID</span>
                <span className="text-white font-mono text-sm">{profile.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Account Type</span>
                <Badge className="bg-[#7B68EE]/20 text-[#7B68EE] border-[#7B68EE]/30">
                  {accountType === "company" ? "Company" : "Individual"}
                </Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Member Since</span>
                <span className="text-white">
                  {new Date(
                    profile.joinDate || profile.companyName ? "2024-01-15" : profile.joinDate,
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Last Login</span>
                <span className="text-white">{new Date(userProfile.lastLogin).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileManagement
