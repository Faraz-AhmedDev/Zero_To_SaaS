"use client"

import * as React from "react"
import { ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { PricingCards } from "@/components/shared/pricing-cards"

export default function PricingPage() {
  const [isYearly, setIsYearly] = React.useState(false)

  return (
    <div className="pt-4 pb-12 md:pt-6 md:pb-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Compact & High-Impact */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <Badge
            variant="outline"
            className="mb-2 uppercase font-mono tracking-wider text-[11px] px-2.5 py-0.5"
          >
            Simple & Transparent
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Pricing built for every scale
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
            No surprise overages. No credit card required to start. Cancel or upgrade anytime.
          </p>

          {/* Monthly / Yearly Switch */}
          <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={`rounded-full px-3.5 py-1 transition-all cursor-pointer ${
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
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 transition-all cursor-pointer ${
                isYearly
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>Annual billing</span>
              <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Component (Fit-to-Screen) */}
        <PricingCards isYearly={isYearly} />

        {/* Guarantee note */}
        <div className="mt-10 text-center max-w-xl mx-auto rounded-xl border border-border/70 bg-muted/20 p-3.5 flex items-center justify-center gap-3">
          <ShieldCheck className="size-5 text-emerald-500 shrink-0" />
          <div className="text-left text-xs">
            <span className="font-semibold text-foreground">14-Day Money-Back Guarantee:</span>{" "}
            <span className="text-muted-foreground">
              Try ZeroToSaas Pro risk-free. Cancel anytime with a 100% full refund guarantee.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
