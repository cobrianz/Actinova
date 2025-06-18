// Login Page Configuration
export const loginData = {
  hero: {
    badge: {
      icon: "SignIn",
      text: "Welcome Back",
    },
    title: {
      main: "Sign in to ",
      highlight: "Actinova",
    },
    description:
      "Access your dashboard and continue building amazing software solutions.",
  },
  form: {
    title: "Sign In",
    fields: [
      {
        id: "email",
        label: "Email Address",
        type: "email",
        icon: "EnvelopeSimple",
        placeholder: "john@company.com",
        required: true,
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        icon: "Lock",
        placeholder: "Enter your password",
        required: true,
      },
    ],
    submitButton: {
      text: "Sign In",
      icon: "SignIn",
    },
    forgotPassword: {
      text: "Forgot your password?",
      link: "/forgot-password",
    },
    socialLogin: {
      title: "Or continue with",
      providers: [
        {
          name: "Google",
          icon: "GoogleLogo",
          color:
            "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300",
        },
        {
          name: "GitHub",
          icon: "GithubLogo",
          color: "bg-gray-900 hover:bg-gray-800 text-white",
        },
      ],
    },
    footer: {
      text: "Don't have an account?",
      linkText: "Sign up here",
      link: "/signup",
    },
  },
};

// Sign Up Page Configuration
export const signupData = {
  hero: {
    title: {
      main: "Start your ",
      highlight: "journey",
      end: "today",
    },
    description:
      "Join thousands of developers and founders accelerating their software success.",
  },
  form: {
    title: "Create Account",
    fields: [
      {
        id: "firstName",
        label: "First Name",
        type: "text",
        icon: "User",
        placeholder: "John",
        required: true,
        gridCol: "md:col-span-1",
      },
      {
        id: "lastName",
        label: "Last Name",
        type: "text",
        icon: "User",
        placeholder: "Doe",
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
        gridCol: "md:col-span-2",
      },
      {
        id: "company",
        label: "Company/Organization",
        type: "text",
        icon: "Briefcase",
        placeholder: "Your Company (Optional)",
        required: false,
        gridCol: "md:col-span-2",
      },
      {
        id: "role",
        label: "Your Role",
        type: "select",
        icon: "UserCircle",
        placeholder: "Select your role",
        required: true,
        gridCol: "md:col-span-1",
        options: [
          { value: "founder", label: "Founder/CEO" },
          { value: "developer", label: "Developer" },
          { value: "product-manager", label: "Product Manager" },
          { value: "designer", label: "Designer" },
          { value: "student", label: "Student" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "teamSize",
        label: "Team Size",
        type: "select",
        icon: "Users",
        placeholder: "Select team size",
        required: true,
        gridCol: "md:col-span-1",
        options: [
          { value: "solo", label: "Just me" },
          { value: "2-5", label: "2-5 people" },
          { value: "6-20", label: "6-20 people" },
          { value: "21-50", label: "21-50 people" },
          { value: "50+", label: "50+ people" },
        ],
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        icon: "Lock",
        placeholder: "Create a strong password",
        required: true,
        gridCol: "md:col-span-1",
      },
      {
        id: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        icon: "Lock",
        placeholder: "Confirm your password",
        required: true,
        gridCol: "md:col-span-1",
      },
    ],
    submitButton: {
      text: "Create Account",
      icon: "UserPlus",
    },
    socialLogin: {
      title: "Or sign up with",
      providers: [
        {
          name: "Google",
          icon: "GoogleLogo",
          color:
            "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300",
        },
        {
          name: "GitHub",
          icon: "GithubLogo",
          color: "bg-gray-900 hover:bg-gray-800 text-white",
        },
      ],
    },
    terms: {
      text: "By creating an account, you agree to our",
      termsLink: "/terms",
      termsText: "Terms of Service",
      and: "and",
      privacyLink: "/privacy",
      privacyText: "Privacy Policy",
    },
    footer: {
      text: "Already have an account?",
      linkText: "Sign in here",
      link: "/login",
    },
  },
};

// Highlight Features for Auth Section
export const authFeatures = [
  {
    icon: "Rocket",
    title: "Fast Setup",
    description: "Get started in minutes with our plug-and-play API templates",
  },
  {
    icon: "Shield",
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee",
  },
  {
    icon: "Users",
    title: "Expert Support",
    description: "Access to our team of experienced developers and consultants",
  },
  {
    icon: "Lightning",
    title: "Lightning Fast",
    description: "Accelerate your development with our automation tools",
  },
];
