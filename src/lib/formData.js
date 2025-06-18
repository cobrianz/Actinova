export const formConfig = {
  title: {
    main: "Let's Start a",
    highlight: "Conversation",
  },
  description:
    "Tell us about your project and we'll get back to you within 24 hours",
  fields: [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      icon: "User",
      placeholder: "John Doe",
      required: true,
      gridCol: "md:col-span-1",
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      icon: "EnvelopeSimple",
      placeholder: "john@company.com",
      required: true,
      gridCol: "md:col-span-1",
    },
    {
      id: "company",
      label: "Company/Organization",
      type: "text",
      icon: "Briefcase",
      placeholder: "Your Company",
      required: false,
      gridCol: "md:col-span-1",
    },
    {
      id: "service",
      label: "Service Needed",
      type: "select",
      icon: "ChatCircle",
      placeholder: "Select a service",
      required: true,
      gridCol: "md:col-span-1",
      options: [
        { value: "api-integration", label: "API Integration Services" },
        { value: "software-consulting", label: "Software Consulting" },
        { value: "business-tech-advice", label: "Business Tech Advice" },
        { value: "workflow-automation", label: "Workflow Automation" },
        { value: "custom-development", label: "Custom Software Development" },
        { value: "other", label: "Other / Not Sure" },
      ],
    },
    {
      id: "message",
      label: "Project Details",
      type: "textarea",
      icon: "ChatCircle",
      placeholder:
        "Tell us about your project, timeline, budget, and any specific requirements...",
      required: true,
      gridCol: "md:col-span-2",
    },
  ],
  submitButton: {
    text: "Send Message",
    icon: "PaperPlaneTilt",
  },
  footer: {
    text: "We typically respond within 24 hours. For urgent matters, email us directly at",
    email: "hello@actinova.dev",
  },
};
