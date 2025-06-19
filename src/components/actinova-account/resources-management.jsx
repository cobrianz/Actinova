"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Search, Eye, RefreshCw, Package, Shield, AlertCircle } from "lucide-react"
import { purchasedResources } from "../../lib/actinova-account-data"
import { toast } from "sonner"

const ResourcesManagement = () => {
  const [resources, setResources] = useState(purchasedResources)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || resource.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter
    return matchesSearch && matchesType && matchesCategory
  })

  const handleDownload = (resource) => {
    toast.success(`Downloading ${resource.name}`)
    // Update download count
    setResources((prev) => prev.map((r) => (r.id === resource.id ? { ...r, downloadCount: r.downloadCount + 1 } : r)))
  }

  const handlePreview = (resource) => {
    toast.success(`Opening preview for ${resource.name}`)
  }

  const handleCheckUpdates = (resource) => {
    toast.success("Checking for updates...")
    setTimeout(() => {
      if (resource.hasUpdates) {
        toast.success("New version available!")
      } else {
        toast.info("You have the latest version")
      }
    }, 1000)
  }

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText size={20} className="text-red-500" />
      case "zip":
        return <Package size={20} className="text-blue-500" />
      case "docx":
        return <FileText size={20} className="text-blue-600" />
      default:
        return <FileText size={20} className="text-zinc-400" />
    }
  }

  const getLicenseBadge = (licenseType) => {
    const variants = {
      "Single User": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "Team License": "bg-green-500/10 text-green-500 border-green-500/20",
      Enterprise: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    }

    return (
      <Badge variant="outline" className={variants[licenseType] || variants["Single User"]}>
        <Shield size={12} className="mr-1" />
        {licenseType}
      </Badge>
    )
  }

  const categories = [...new Set(resources.map((r) => r.category))]
  const types = [...new Set(resources.map((r) => r.type))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Purchased Resources</h1>
        <p className="text-zinc-400">Access and manage your digital products and resources</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400 mb-1">Total Resources</p>
                <p className="text-2xl font-bold text-white">{resources.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <FileText size={24} className="text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400 mb-1">Total Downloads</p>
                <p className="text-2xl font-bold text-white">
                  {resources.reduce((sum, r) => sum + r.downloadCount, 0)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <Download size={24} className="text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400 mb-1">Available Updates</p>
                <p className="text-2xl font-bold text-white">{resources.filter((r) => r.hasUpdates).length}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/10">
                <RefreshCw size={24} className="text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400 mb-1">Storage Used</p>
                <p className="text-2xl font-bold text-white">
                  {resources.reduce((sum, r) => sum + Number.parseFloat(r.size), 0).toFixed(1)} MB
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Package size={24} className="text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={16} />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-[#0a0b1a]/50 border-[#7B68EE]/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card
            key={resource.id}
            className="bg-[#1a1b2e]/50 border-[#7B68EE]/20 hover:border-[#7B68EE]/40 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-[#0a0b1a]/50 rounded-lg">{getFileIcon(resource.type)}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1 truncate">{resource.name}</h3>
                  <p className="text-sm text-zinc-400 mb-2">{resource.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs border-[#7B68EE]/20 text-zinc-400">
                      {resource.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-[#7B68EE]/20 text-zinc-400">
                      {resource.category}
                    </Badge>
                  </div>
                  {getLicenseBadge(resource.licenseType)}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Version</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{resource.version}</span>
                    {resource.hasUpdates && (
                      <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs">
                        <AlertCircle size={10} className="mr-1" />
                        Update Available
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Size</span>
                  <span className="text-white">{resource.size}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Downloaded</span>
                  <span className="text-white">{resource.downloadCount} times</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Purchased</span>
                  <span className="text-white">{new Date(resource.purchaseDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleDownload(resource)}
                  className="flex-1 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6B58DE] hover:to-[#8323D9] text-white"
                >
                  <Download size={16} className="mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreview(resource)}
                  className="border-[#7B68EE]/30 text-[#7B68EE] hover:bg-[#7B68EE]/10"
                >
                  <Eye size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCheckUpdates(resource)}
                  className="border-[#7B68EE]/30 text-[#7B68EE] hover:bg-[#7B68EE]/10"
                >
                  <RefreshCw size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card className="bg-[#1a1b2e]/50 border-[#7B68EE]/20">
          <CardContent className="p-12 text-center">
            <FileText size={48} className="text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Resources Found</h3>
            <p className="text-zinc-400 mb-6">
              {searchQuery || typeFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your filters to see more resources."
                : "You haven't purchased any resources yet. Browse our resource library to get started!"}
            </p>
            <Button className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6B58DE] hover:to-[#8323D9] text-white">
              Browse Resources
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Updates Available */}
      {resources.some((r) => r.hasUpdates) && (
        <Card className="bg-[#1a1b2e]/50 border-orange-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle size={20} className="text-orange-500" />
              Updates Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resources
                .filter((r) => r.hasUpdates)
                .map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-3 bg-[#0a0b1a]/30 rounded-lg border border-orange-500/10"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(resource.type)}
                      <div>
                        <h4 className="text-white font-medium">{resource.name}</h4>
                        <p className="text-sm text-zinc-400">Current: v{resource.version} • New version available</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-orange-500 text-white hover:bg-orange-600">
                      Update Now
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ResourcesManagement
