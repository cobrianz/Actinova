const pricingData = [
    {
      name: "Starter",
      price: {
        monthly: 0,
        yearly: 0,
      },
      description: "For individuals exploring basic integrations and tools.",
      features: [
        "Up to 2 API integrations",
        "Basic automation tools",
        "Community support",
        "Limited documentation access",
        "Email service setup guide",
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: {
        monthly: 29,
        yearly: 290, // 2 months free
      },
      description: "Best for startups and small teams ready to grow fast.",
      features: [
        "Up to 10 API integrations",
        "Custom automation workflows",
        "Priority email support",
        "Access to full documentation",
        "Free onboarding consultation",
        "Basic AI agent builder",
      ],
      cta: "Upgrade to Pro",
    },
    {
      name: "Business",
      price: {
        monthly: 99,
        yearly: 990, // 2 months free
      },
      description: "For businesses needing advanced integrations and support.",
      features: [
        "Unlimited API integrations",
        "Advanced automation and triggers",
        "Custom-built software solutions",
        "Dedicated support manager",
        "Weekly performance reports",
        "Advanced AI agent capabilities",
      ],
      cta: "Choose Business",
    },
    {
      name: "Enterprise",
      price: {
        monthly: "Custom",
        yearly: "Custom",
      },
      description: "Tailored solutions for large organizations and scale-ups.",
      features: [
        "Dedicated solution architect",
        "On-premise deployment options",
        "API performance optimization",
        "24/7 support & SLAs",
        "Custom data pipelines",
        "Security and compliance consulting",
      ],
      cta: "Contact Sales",
    },
  ]
  
  export default pricingData
  