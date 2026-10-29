"use client"

import * as React from "react"
import { ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { PricingCards } from "@/components/shared/pricing-cards"

export default function PricingPage() {
  const [isYearly, setIsYearly] = React.useState(false)

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="outline" className="mb-3 uppercase font-mono tracking-wider text-xs">
            Simple & Predictable
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Pricing built for every scale
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            No surprise overages. No credit card required to start. Upgrade anytime as your project grows.
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

        {/* Feature comparison guarantee note */}
        <div className="mt-16 text-center max-w-2xl mx-auto rounded-2xl border border-border/80 bg-muted/20 p-6 flex items-center justify-center gap-4">
          <ShieldCheck className="size-8 text-emerald-500 shrink-0" />
          <div className="text-left text-sm">
            <h4 className="font-semibold text-foreground">14-Day Money-Back Guarantee</h4>
            <p className="text-muted-foreground text-xs mt-0.5">
              Try ZeroToSaas Pro risk-free. If you are not completely satisfied, we will refund your payment immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
