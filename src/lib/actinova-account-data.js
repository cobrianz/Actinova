export const userProfile = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  userType: "startup_founder",
  communicationChannel: "email",
  accountType: "individual", // individual or company
  joinDate: "2024-01-15",
  lastLogin: "2024-12-18T10:30:00Z",
  timezone: "America/New_York",
  location: "New York, NY",
}

export const companyProfile = {
  id: 1,
  companyName: "TechCorp Inc.",
  logo: "/placeholder.svg?height=100&width=100",
  businessCategory: "Technology",
  industry: "Software Development",
  location: "New York, NY",
  timezone: "America/New_York",
  teamMembers: [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      role: "admin",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@techcorp.com",
      role: "team_member",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedDate: "2024-02-01",
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      email: "lisa.rodriguez@techcorp.com",
      role: "viewer",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedDate: "2024-02-15",
    },
  ],
  industryTags: ["API Development", "Automation", "CRM Integration", "Cloud Solutions"],
}

export const dashboardStats = {
  activeServices: 3,
  nextConsultation: "2024-12-20T14:00:00Z",
  purchasedDocuments: 8,
  openSupportTickets: 2,
  totalSpent: 2450,
  memberSince: "2024-01-15",
}

export const myServices = [
  {
    id: 1,
    name: "CRM Integration Setup",
    category: "API Development",
    status: "in_progress",
    assignedDev: "John Smith",
    startDate: "2024-12-01",
    deliveryDate: "2024-12-25",
    progress: 75,
    notes: "Integration with Salesforce API completed. Working on data synchronization.",
    deliverables: ["API Documentation", "Integration Code", "Testing Suite"],
    attachments: [
      { name: "crm_config.zip", size: "2.4 MB", uploadDate: "2024-12-15" },
      { name: "api_docs.pdf", size: "1.2 MB", uploadDate: "2024-12-10" },
    ],
    timeline: [
      { date: "2024-12-01", event: "Project started", type: "start" },
      { date: "2024-12-05", event: "Requirements analysis completed", type: "milestone" },
      { date: "2024-12-10", event: "API integration phase completed", type: "milestone" },
      { date: "2024-12-15", event: "Testing phase initiated", type: "progress" },
    ],
  },
  {
    id: 2,
    name: "Automation Workflow Setup",
    category: "Automation",
    status: "delivered",
    assignedDev: "Emma Wilson",
    startDate: "2024-11-15",
    deliveryDate: "2024-12-01",
    progress: 100,
    notes: "Automation workflow successfully implemented and tested.",
    deliverables: ["Workflow Configuration", "User Manual", "Support Documentation"],
    attachments: [
      { name: "automation_setup.zip", size: "3.1 MB", uploadDate: "2024-12-01" },
      { name: "user_manual.pdf", size: "800 KB", uploadDate: "2024-12-01" },
    ],
    timeline: [
      { date: "2024-11-15", event: "Project started", type: "start" },
      { date: "2024-11-20", event: "Workflow design completed", type: "milestone" },
      { date: "2024-11-28", event: "Implementation completed", type: "milestone" },
      { date: "2024-12-01", event: "Project delivered", type: "completed" },
    ],
  },
  {
    id: 3,
    name: "Database Optimization",
    category: "Dev Support",
    status: "pending",
    assignedDev: null,
    startDate: null,
    deliveryDate: "2024-12-30",
    progress: 0,
    notes: "Waiting for project assignment and initial consultation.",
    deliverables: ["Performance Analysis", "Optimization Plan", "Implementation"],
    attachments: [],
    timeline: [{ date: "2024-12-18", event: "Service requested", type: "start" }],
  },
]

export const purchasedResources = [
  {
    id: 1,
    name: "API Integration Best Practices Guide",
    type: "PDF",
    category: "Documentation",
    purchaseDate: "2024-12-10",
    version: "2.1",
    size: "4.2 MB",
    downloadCount: 3,
    licenseType: "Single User",
    hasUpdates: false,
    description: "Comprehensive guide for API integration patterns and best practices.",
  },
  {
    id: 2,
    name: "Automation Starter Kit",
    type: "ZIP",
    category: "Configuration",
    purchaseDate: "2024-11-25",
    version: "1.0",
    size: "12.8 MB",
    downloadCount: 1,
    licenseType: "Team License",
    hasUpdates: true,
    description: "Complete automation setup templates and configuration files.",
  },
  {
    id: 3,
    name: "Database Design Templates",
    type: "DOCX",
    category: "Templates",
    purchaseDate: "2024-11-15",
    version: "3.0",
    size: "2.1 MB",
    downloadCount: 5,
    licenseType: "Single User",
    hasUpdates: false,
    description: "Professional database design templates and schemas.",
  },
]

export const consultations = [
  {
    id: 1,
    title: "API Strategy Consultation",
    type: "call",
    consultant: "Dr. Alex Thompson",
    consultantAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024-12-20T14:00:00Z",
    duration: 60,
    status: "scheduled",
    topic: "API Architecture Review",
    notes: "Discuss current API structure and scalability improvements.",
    meetingLink: "https://meet.actinova.com/api-strategy-123",
    preConsultationNotes: "Current API handles 10k requests/day, looking to scale to 100k+",
  },
  {
    id: 2,
    title: "Automation Strategy Session",
    type: "chat",
    consultant: "Sarah Mitchell",
    consultantAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024-12-15T10:00:00Z",
    duration: 45,
    status: "completed",
    topic: "Workflow Automation",
    notes: "Discussed automation opportunities and implementation roadmap.",
    summary: "Identified 3 key automation opportunities that could save 20 hours/week.",
    preConsultationNotes: "Looking to automate customer onboarding and support ticket routing.",
  },
  {
    id: 3,
    title: "Technical Architecture Review",
    type: "call",
    consultant: "Dr. Alex Thompson",
    consultantAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024-11-30T16:00:00Z",
    duration: 90,
    status: "completed",
    topic: "System Architecture",
    notes: "Comprehensive review of current system architecture.",
    summary: "Recommended microservices migration and database optimization strategies.",
    preConsultationNotes: "Current monolithic architecture facing scalability challenges.",
  },
]

export const networkingData = {
  memberProfile: {
    isPublic: true,
    portfolio: "https://portfolio.example.com",
    projectBrief: "Building next-generation CRM solutions for SMEs",
    skills: ["API Development", "Database Design", "Cloud Architecture"],
    lookingFor: ["Technical Co-founder", "Investment", "Strategic Partnerships"],
  },
  communityMembers: [
    {
      id: 1,
      name: "Alex Chen",
      company: "DevTools Inc.",
      role: "CTO",
      industry: "Developer Tools",
      skills: ["API Design", "DevOps", "Cloud Infrastructure"],
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      lastActive: "2024-12-18T12:00:00Z",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      company: "AutoFlow Systems",
      role: "Founder",
      industry: "Automation",
      skills: ["Process Automation", "AI/ML", "Business Strategy"],
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
      lastActive: "2024-12-17T15:30:00Z",
    },
    {
      id: 3,
      name: "David Kim",
      company: "DataSync Solutions",
      role: "Lead Developer",
      industry: "Data Integration",
      skills: ["Database Design", "ETL Processes", "API Integration"],
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      lastActive: "2024-12-18T11:45:00Z",
    },
  ],
  upcomingEvents: [
    {
      id: 1,
      title: "API Developers Meetup",
      date: "2024-12-22T18:00:00Z",
      type: "virtual",
      attendees: 45,
      maxAttendees: 100,
      description: "Monthly meetup for API developers to share experiences and best practices.",
      topics: ["REST API Design", "GraphQL Implementation", "API Security"],
      isRegistered: true,
    },
    {
      id: 2,
      title: "Startup Founders Networking",
      date: "2024-12-28T19:00:00Z",
      type: "hybrid",
      attendees: 32,
      maxAttendees: 50,
      description: "Connect with fellow startup founders and share experiences.",
      topics: ["Fundraising", "Product Development", "Team Building"],
      isRegistered: false,
    },
  ],
}

export const documentsData = [
  {
    id: 1,
    name: "Project Brief - CRM Integration",
    type: "project_brief",
    size: "1.2 MB",
    uploadDate: "2024-12-01",
    tags: ["CRM", "Integration", "Requirements"],
    category: "Project Briefs",
    isPrivate: false,
    linkedService: 1,
  },
  {
    id: 2,
    name: "MVP Wireframes",
    type: "mvp_sketch",
    size: "3.4 MB",
    uploadDate: "2024-11-28",
    tags: ["MVP", "Design", "Wireframes"],
    category: "MVP Sketches",
    isPrivate: true,
    linkedService: null,
  },
  {
    id: 3,
    name: "Service Agreement - Automation",
    type: "contract",
    size: "890 KB",
    uploadDate: "2024-11-15",
    tags: ["Contract", "Legal", "Automation"],
    category: "Contracts",
    isPrivate: false,
    linkedService: 2,
  },
  {
    id: 4,
    name: "Invoice - December 2024",
    type: "invoice",
    size: "245 KB",
    uploadDate: "2024-12-15",
    tags: ["Invoice", "Billing", "December"],
    category: "Invoices",
    isPrivate: false,
    linkedService: null,
  },
]

export const supportTickets = [
  {
    id: "TICK-001",
    title: "API Integration Issue",
    status: "open",
    priority: "high",
    category: "technical",
    created: "2024-12-18T09:00:00Z",
    lastUpdate: "2024-12-18T14:30:00Z",
    assignedTo: "John Smith",
    linkedService: 1,
    description: "Experiencing timeout issues with CRM API integration.",
    attachments: [
      { name: "error_logs.txt", size: "45 KB" },
      { name: "api_response.json", size: "12 KB" },
    ],
    messages: 5,
  },
  {
    id: "TICK-002",
    title: "Billing Question",
    status: "waiting",
    priority: "medium",
    category: "billing",
    created: "2024-12-15T11:20:00Z",
    lastUpdate: "2024-12-16T10:15:00Z",
    assignedTo: "Support Team",
    linkedService: null,
    description: "Question about upcoming invoice and service charges.",
    attachments: [],
    messages: 3,
  },
  {
    id: "TICK-003",
    title: "Documentation Request",
    status: "resolved",
    priority: "low",
    category: "general",
    created: "2024-12-10T16:45:00Z",
    lastUpdate: "2024-12-12T09:30:00Z",
    assignedTo: "Emma Wilson",
    linkedService: 2,
    description: "Request for additional documentation on automation workflows.",
    attachments: [],
    messages: 2,
  },
]

export const userTypes = [
  { value: "student", label: "Student" },
  { value: "startup_founder", label: "Startup Founder" },
  { value: "developer", label: "Developer" },
  { value: "business_owner", label: "Business Owner" },
  { value: "consultant", label: "Consultant" },
]

export const businessCategories = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
]

export const communicationChannels = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "slack", label: "Slack" },
  { value: "teams", label: "Microsoft Teams" },
]

export const serviceCategories = [
  { value: "api", label: "API Development" },
  { value: "automation", label: "Automation" },
  { value: "dev_support", label: "Dev Support" },
  { value: "consulting", label: "Consulting" },
  { value: "integration", label: "Integration" },
  { value: "optimization", label: "Optimization" },
]

export const consultantsList = [
  {
    id: 1,
    name: "Dr. Alex Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    specialties: ["API Architecture", "System Design", "Performance Optimization"],
    rating: 4.9,
    experience: "15+ years",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    avatar: "/placeholder.svg?height=40&width=40",
    specialties: ["Automation", "Workflow Design", "Process Optimization"],
    rating: 4.8,
    experience: "12+ years",
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    specialties: ["Database Design", "Data Integration", "Analytics"],
    rating: 4.9,
    experience: "10+ years",
  },
]

export const helpArticles = [
  {
    id: 1,
    title: "Getting Started with Actinova Services",
    category: "Getting Started",
    views: 1250,
    helpful: 45,
    lastUpdated: "2024-12-01",
  },
  {
    id: 2,
    title: "How to Book a Consultation",
    category: "Consultations",
    views: 890,
    helpful: 32,
    lastUpdated: "2024-11-28",
  },
  {
    id: 3,
    title: "Understanding Service Delivery Process",
    category: "Services",
    views: 675,
    helpful: 28,
    lastUpdated: "2024-11-25",
  },
  {
    id: 4,
    title: "Managing Your Account Settings",
    category: "Account",
    views: 543,
    helpful: 21,
    lastUpdated: "2024-11-20",
  },
]
