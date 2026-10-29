"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Database,
  CreditCard,
  Mail,
  Moon,
  Sparkles,
  ChevronDown,
  Star,
  Terminal,
  Activity,
  Layers,
  Code2,
} from "lucide-react"
import { GithubIcon } from "@/components/shared/icons"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PricingCards } from "@/components/shared/pricing-cards"

export default function MarketingPage() {
  const [isYearly, setIsYearly] = React.useState(false)
  const [openFaq, setOpenFaq] = React.useState<number | null>(0)

  const featureIcons: Record<string, React.ElementType> = {
    Zap,
    Shield,
    Database,
    CreditCard,
    Mail,
    Moon,
  }

  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative w-full pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32">
        {/* Subtle background ambient glow */}
        <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-primary/30 to-muted/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-3.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm shadow-xs mb-8 transition-transform hover:scale-105">
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open-Source SaaS Starter</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-primary flex items-center gap-1 font-semibold">
              Next.js 15+ & React 19 Ready
            </span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Ship your SaaS in{" "}
            <span className="bg-linear-to-r from-foreground via-foreground/80 to-foreground/50 bg-clip-text text-transparent">
              days, not months
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            The production-grade SaaS boilerplate built with Next.js App Router,
            TypeScript, Tailwind CSS v4, and shadcn/ui. Clean architecture, zero bloat, infinite flexibility.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="gap-2 h-11 px-6 shadow-md hover:shadow-lg transition-all text-sm font-semibold">
                Get Started Free
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" size="lg" className="gap-2 h-11 px-6 text-sm font-semibold border-border/80 hover:bg-muted/60">
                <GithubIcon className="size-4" />
                <span>Star on GitHub</span>
                <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground border border-border/50">
                  <Star className="size-3 mr-1 fill-amber-400 text-amber-400 inline" />
                  1.2k
                </span>
              </Button>
            </a>
          </div>

          {/* Tech stack badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Stack:</span>
            {["Next.js App Router", "React 19", "Tailwind CSS v4", "TypeScript", "shadcn/ui", "Lucide"].map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border/60 bg-muted/30 px-2.5 py-1 font-mono text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Sleek Mockup Container */}
          <div className="mt-14 w-full max-w-5xl rounded-2xl border border-border/80 bg-card/60 p-2 shadow-2xl backdrop-blur-md">
            <div className="rounded-xl border border-border/60 bg-background overflow-hidden shadow-inner">
              {/* Window Header */}
              <div className="flex h-11 items-center justify-between border-b border-border/60 bg-muted/40 px-4">
                <div className="flex items-center gap-1.5">
                  <div className="size-3 rounded-full bg-red-500/80" />
                  <div className="size-3 rounded-full bg-amber-500/80" />
                  <div className="size-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 rounded-md border border-border/60 bg-background px-3 py-1 text-xs text-muted-foreground font-mono">
                  <span className="text-emerald-500">https://</span>
                  <span>app.launchstack.dev/dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] uppercase font-mono">Live Preview</Badge>
                </div>
              </div>

              {/* Mockup Inside Visuals */}
              <div className="p-6 sm:p-8 bg-linear-to-b from-background to-muted/20 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="rounded-lg border border-border/60 bg-card p-4">
                    <p className="text-xs text-muted-foreground font-medium">Monthly Recurring Revenue</p>
                    <p className="text-2xl font-bold mt-1">$28,450.00</p>
                    <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1">
                      <span>↑ 22.4%</span>
                      <span className="text-muted-foreground">vs last month</span>
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-card p-4">
                    <p className="text-xs text-muted-foreground font-medium">Active Subscriptions</p>
                    <p className="text-2xl font-bold mt-1">1,429</p>
                    <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1">
                      <span>↑ 8.1%</span>
                      <span className="text-muted-foreground">new signups</span>
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-card p-4">
                    <p className="text-xs text-muted-foreground font-medium">API Response Time</p>
                    <p className="text-2xl font-bold mt-1">42ms</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">
                      <span>Turbopack & Edge optimized</span>
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border/60 bg-card p-5">
                  <div className="flex items-center justify-between pb-4 border-b border-border/40">
                    <div>
                      <h4 className="text-sm font-semibold">Active Services & Pipelines</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Automated deployment health and webhook verification</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      All systems operational
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 rounded-md bg-muted/40 border border-border/40">
                      <span className="text-muted-foreground block text-[11px]">Database Pool</span>
                      <span className="font-semibold text-foreground">Postgres 16 (0.8ms)</span>
                    </div>
                    <div className="p-2.5 rounded-md bg-muted/40 border border-border/40">
                      <span className="text-muted-foreground block text-[11px]">Auth Session</span>
                      <span className="font-semibold text-foreground">JWT & Cookies Active</span>
                    </div>
                    <div className="p-2.5 rounded-md bg-muted/40 border border-border/40">
                      <span className="text-muted-foreground block text-[11px]">Webhooks</span>
                      <span className="font-semibold text-foreground">Stripe Verified</span>
                    </div>
                    <div className="p-2.5 rounded-md bg-muted/40 border border-border/40">
                      <span className="text-muted-foreground block text-[11px]">Cache Rate</span>
                      <span className="font-semibold text-foreground">99.4% Hit Ratio</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Grid Section */}
      <section id="features" className="w-full py-20 border-t border-border/50 bg-muted/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-3 uppercase font-mono tracking-wider text-xs">
              Batteries Included
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Everything required to launch a world-class SaaS
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Stop reinventing user authentication, payment webhooks, and UI layouts.
              ZeroToSaas gives you a rock-solid, production-ready foundation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.features.map((feature, idx) => {
              const Icon = featureIcons[feature.icon] || Zap
              return (
                <Card
                  key={idx}
                  className="group relative overflow-hidden border border-border/80 bg-card hover:border-primary/50 transition-all hover:shadow-md"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="size-5" />
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-mono">
                        {feature.tag}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Pricing Section */}
      <section id="pricing" className="w-full py-24 border-t border-border/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-3 uppercase font-mono tracking-wider text-xs">
              Transparent Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Simple, transparent pricing for every stage
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Start for free with community support, or upgrade when your product gains traction.
            </p>

            {/* Monthly / Yearly Switch */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-muted/40 p-1 text-sm font-medium">
              <button
                type="button"
                onClick={() => setIsYearly(false)}
                className={`rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                  !isYearly
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly billing
              </button>
              <button
                type="button"
                onClick={() => setIsYearly(true)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                  isYearly
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>Annual billing</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Component */}
          <PricingCards isYearly={isYearly} />
        </div>
      </section>

      {/* 4. FAQ Accordion Section */}
      <section id="faq" className="w-full py-24 border-t border-border/50 bg-muted/10">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-3 uppercase font-mono tracking-wider text-xs">
              Got Questions?
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Clear answers to common questions about ZeroToSaas architecture, licensing, and usage.
            </p>
          </div>

          <div className="space-y-4">
            {siteConfig.faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  className="rounded-xl border border-border/80 bg-card overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left font-medium text-foreground transition-all hover:bg-muted/30 cursor-pointer"
                  >
                    <span className="text-base font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-foreground" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Banner */}
      <section className="w-full py-20 border-t border-border/50 bg-background text-center">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border/80 bg-linear-to-b from-muted/50 to-muted/20 p-8 sm:p-12 shadow-xl">
            <Badge variant="secondary" className="mb-4">Get Started Today</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Ready to ship your next big idea?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground">
              Clone ZeroToSaas, customize your branding and domain, and start onboarding paying customers.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-11 px-8 gap-2 font-semibold shadow-md">
                  Launch Your SaaS Now
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="h-11 px-6 font-semibold">
                  Explore Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
