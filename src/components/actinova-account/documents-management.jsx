"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Upload, File, Folder, Download, Trash2, Eye, Search, Filter, FileText, ImageIcon, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

const DocumentsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const documents = [
    {
      id: 1,
      name: "Project Brief - E-commerce Platform.pdf",
      type: "pdf",
      category: "project-brief",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      tags: ["ecommerce", "requirements", "brief"],
      status: "processed",
      downloadCount: 3,
    },
    {
      id: 2,
      name: "API Documentation.docx",
      type: "docx",
      category: "documentation",
      size: "1.8 MB",
      uploadDate: "2024-01-12",
      tags: ["api", "documentation", "technical"],
      status: "processed",
      downloadCount: 7,
    },
    {
      id: 3,
      name: "Database Schema.zip",
      type: "zip",
      category: "deliverable",
      size: "5.2 MB",
      uploadDate: "2024-01-10",
      tags: ["database", "schema", "sql"],
      status: "processed",
      downloadCount: 2,
    },
    {
      id: 4,
      name: "MVP Wireframes.png",
      type: "png",
      category: "design",
      size: "3.1 MB",
      uploadDate: "2024-01-08",
      tags: ["wireframes", "design", "mvp"],
      status: "processing",
      downloadCount: 0,
    },
    {
      id: 5,
      name: "Contract - Development Services.pdf",
      type: "pdf",
      category: "contract",
      size: "890 KB",
      uploadDate: "2024-01-05",
      tags: ["contract", "legal", "services"],
      status: "processed",
      downloadCount: 1,
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "project-brief", label: "Project Briefs" },
    { value: "documentation", label: "Documentation" },
    { value: "deliverable", label: "Deliverables" },
    { value: "design", label: "Design Files" },
    { value: "contract", label: "Contracts" },
    { value: "invoice", label: "Invoices" },
    { value: "report", label: "Reports" },
  ]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleUpload = (files) => {
    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          toast.success("Files uploaded successfully!")
          setIsUploadModalOpen(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleDownload = (docId, docName) => {
    toast.success(`Downloading ${docName}...`)
  }

  const handleDelete = (docId, docName) => {
    toast.success(`${docName} deleted successfully`)
  }

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="text-red-500" size={20} />
      case "docx":
        return <FileText className="text-blue-500" size={20} />
      case "zip":
        return <Archive className="text-yellow-500" size={20} />
      case "png":
      case "jpg":
      case "jpeg":
        return <ImageIcon className="text-green-500" size={20} />
      default:
        return <File className="text-gray-500" size={20} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "processed":
        return "bg-green-500"
      case "processing":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatFileSize = (size) => {
    return size
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Documents & Uploads</h1>
          <p className="text-zinc-400 mt-2">Manage your project files, deliverables, and documentation</p>
        </div>
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:from-[#6A5ACD] hover:to-[#8A2BE2]">
              <Upload size={20} className="mr-2" />
              Upload Files
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1b2e] border-[#7B68EE]/20 text-white">
            <DialogHeader>
              <DialogTitle>Upload Documents</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="files">Select Files</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  className="bg-[#0a0b1a] border-[#7B68EE]/30"
                  onChange={(e) => handleUpload(e.target.files)}
                />
                <p className="text-xs text-zinc-400 mt-1">
                  Supported formats: PDF, DOCX, ZIP, PNG, JPG (Max 10MB per file)
                </p>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger className="bg-[#0a0b1a] border-[#7B68EE]/30">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., project, requirements, api"
                  className="bg-[#0a0b1a] border-[#7B68EE]/30"
                />
              </div>
              {uploadProgress > 0 && (
                <div>
                  <Label>Upload Progress</Label>
                  <Progress value={uploadProgress} className="mt-2" />
                  <p className="text-sm text-zinc-400 mt-1">{uploadProgress}% complete</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Storage Usage */}
      <Card className="bg-[#1a1b2e] border-[#7B68EE]/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Storage Usage</h3>
            <Badge variant="outline" className="border-[#7B68EE]/30 text-[#7B68EE]">
              Pro Plan
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Used</span>
              <span className="text-white">2.8 GB of 10 GB</span>
            </div>
            <Progress value={28} className="h-2" />
            <p className="text-xs text-zinc-500">7.2 GB remaining</p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#1a1b2e] border-[#7B68EE]/30 text-white"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48 bg-[#1a1b2e] border-[#7B68EE]/30 text-white">
            <Filter size={16} className="mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1b2e] border-[#7B68EE]/20">
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Documents List */}
      <div className="grid gap-4">
        {filteredDocuments.map((doc) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-[#1a1b2e] border-[#7B68EE]/20 hover:border-[#7B68EE]/40 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">{getFileIcon(doc.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white truncate">{doc.name}</h3>
                        <Badge className={`${getStatusColor(doc.status)} text-white text-xs`}>{doc.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>Uploaded {formatDate(doc.uploadDate)}</span>
                        <span>{doc.downloadCount} downloads</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {doc.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-[#7B68EE]/30 text-[#7B68EE]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-[#7B68EE]/30 text-[#7B68EE]">
                      <Eye size={16} className="mr-1" />
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc.id, doc.name)}
                      className="border-green-500/30 text-green-400"
                    >
                      <Download size={16} className="mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(doc.id, doc.name)}
                      className="border-red-500/30 text-red-400"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <Folder size={48} className="mx-auto text-zinc-600 mb-4" />
          <h3 className="text-lg font-semibold text-zinc-400 mb-2">No documents found</h3>
          <p className="text-zinc-500">Try adjusting your search or upload some files</p>
        </div>
      )}
    </div>
  )
}

export default DocumentsManagement
