export interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  features: string[]
  popular?: boolean
  cta: string
  ctaVariant?: "default" | "outline" | "secondary"
  variantId?: {
    monthly: string
    yearly: string
  }
}

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
}

export const siteConfig = {
  name: "ZeroToSaas",
  description:
    "The modern, open-source Next.js SaaS boilerplate. Everything you need to build, launch, and scale your SaaS in record time.",
  url: "https://launchstack.dev",
  ogImage: "https://launchstack.dev/og.jpg",
  links: {
    twitter: "https://twitter.com/launchstack",
    github: "https://github.com/launchstack/launchstack",
    docs: "/docs",
  },
  mainNav: [
    { title: "Features", href: "#features" },
    { title: "Pricing", href: "/pricing" },
    { title: "Dashboard", href: "/dashboard" },
    { title: "Docs", href: "https://github.com/launchstack/launchstack", external: true },
  ] as NavItem[],
  dashboardNav: [
    { title: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
    { title: "Billing & Plans", href: "/dashboard/billing", icon: "CreditCard" },
    { title: "Settings", href: "/dashboard/settings", icon: "Settings" },
  ],
  pricingPlans: [
    {
      id: "free",
      name: "Hobby",
      description: "Ideal for indie hackers and side projects looking to get off the ground.",
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        "Up to 3 active projects",
        "Community Discord support",
        "Basic analytics & logging",
        "1 team member",
        "Standard API rate limits (1k req/day)",
        "Self-hosted documentation",
      ],
      popular: false,
      cta: "Get Started Free",
      ctaVariant: "outline" as const,
    },
    {
      id: "pro",
      name: "Pro",
      description: "For startups and fast-growing products requiring power and scale.",
      price: {
        monthly: 29,
        yearly: 24, // $24/mo billed annually
      },
      features: [
        "Unlimited active projects",
        "Priority 24/7 email support",
        "Advanced real-time analytics",
        "Up to 10 team seats",
        "High-performance API limits (100k req/day)",
        "Custom domains & branding",
        "Audit logs & compliance alerts",
        "Automatic backups & snapshots",
      ],
      popular: true,
      cta: "Start 14-Day Free Trial",
      ctaVariant: "default" as const,
      variantId: {
        monthly: process.env.NEXT_PUBLIC_LS_PRO_MONTHLY_VARIANT_ID || "",
        yearly: process.env.NEXT_PUBLIC_LS_PRO_YEARLY_VARIANT_ID || "",
      },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Dedicated infrastructure, security, and white-glove custom integrations.",
      price: {
        monthly: 99,
        yearly: 79,
      },
      features: [
        "Unlimited everything",
        "Dedicated account manager & SLA",
        "SAML SSO & Okta integration",
        "Custom database hosting & tenancy",
        "Unlimited seats & role permissions",
        "Custom contracts & invoicing",
        "SOC2 Type II compliance reports",
        "99.99% uptime guarantee",
      ],
      popular: false,
      cta: "Contact Sales",
      ctaVariant: "outline" as const,
    },
  ] as PricingPlan[],
  features: [
    {
      title: "Next.js 15+ App Router",
      description:
        "Built on the cutting edge with React 19, Server Components, Turbopack, and Partial Prerendering for unmatched speed.",
      icon: "Zap",
      tag: "Core Engine",
    },
    {
      title: "Bulletproof Authentication",
      description:
        "Ready for OAuth providers, Magic Links, Passkeys, Session Cookies, and role-based permissions without vendor lock-in.",
      icon: "Shield",
      tag: "Security",
    },
    {
      title: "Prisma & PostgreSQL Ready",
      description:
        "Pre-configured relational schema with instant migrations, seeders, and type-safe database queries out of the box.",
      icon: "Database",
      tag: "Data Layer",
    },
    {
      title: "Stripe & LemonSqueezy UI",
      description:
        "Modern checkout flows, customer portal integrations, webhook handlers, and plan management interfaces.",
      icon: "CreditCard",
      tag: "Monetization",
    },
    {
      title: "Transactional Emails",
      description:
        "Beautiful React-Email templates, automated welcome journeys, reset password flows, and webhook event tracking.",
      icon: "Mail",
      tag: "Messaging",
    },
    {
      title: "shadcn/ui & Dark Mode",
      description:
        "Crafted with Tailwind CSS v4, accessible primitives, rich contrast, and instantaneous system dark/light switching.",
      icon: "Moon",
      tag: "Aesthetics",
    },
  ],
  faqs: [
    {
      question: "Is ZeroToSaas completely open source?",
      answer:
        "Yes! ZeroToSaas is licensed under the MIT License. You have complete freedom to modify, commercialize, and deploy it for yourself or clients without royalties.",
    },
    {
      question: "What technologies are used in this stack?",
      answer:
        "ZeroToSaas is built on Next.js App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui components, Lucide icons, and next-themes for theme management.",
    },
    {
      question: "Can I use my existing database or auth provider?",
      answer:
        "Absolutely. The architecture is modularly abstracted. In subsequent phases, you can plug in Supabase, Auth.js (NextAuth), Clerk, Prisma, Drizzle, or raw PostgreSQL effortlessly.",
    },
    {
      question: "Is there mobile and responsive support?",
      answer:
        "Every single view—from marketing to the deep dashboard tables—is 100% mobile responsive with native drawer navigation and touch-optimized components.",
    },
    {
      question: "How do I deploy this to production?",
      answer:
        "You can deploy with zero configuration to Vercel, Netlify, Cloudflare Workers, or dockerize it on AWS/Railway with standard Next.js deployment guidelines.",
    },
  ],
}
