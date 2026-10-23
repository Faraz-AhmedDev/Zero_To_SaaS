"use client"

import * as React from "react"
import Link from "next/link"
import { CheckCircle2, HelpCircle, ArrowRight, ShieldCheck, Zap } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {siteConfig.pricingPlans.map((plan) => {
            const price = isYearly ? plan.price.yearly : plan.price.monthly

            return (
              <Card
                key={plan.id}
                className={`flex flex-col justify-between relative border transition-all ${
                  plan.popular
                    ? "border-primary shadow-xl ring-2 ring-primary/20 bg-card"
                    : "border-border/80 bg-card hover:border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-0.5 shadow-sm">
                      Recommended
                    </Badge>
                  </div>
                )}

                <CardHeader className="pt-6">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm min-h-[40px] mt-1 text-muted-foreground">
                    {plan.description}
                  </CardDescription>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground">
                      ${price}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">
                      /month
                    </span>
                    {isYearly && plan.price.monthly > 0 && (
                      <span className="text-xs text-muted-foreground ml-1">
                        (billed annually)
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Plan Features:
                  </div>
                  <ul className="space-y-2.5 text-sm">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-muted-foreground">
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-500 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6">
                  <Link href="/register" className="w-full">
                    <Button
                      variant={plan.ctaVariant || "default"}
                      className={`w-full font-semibold ${
                        plan.popular ? "shadow-md" : ""
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>

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
