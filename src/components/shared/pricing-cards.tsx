"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { siteConfig, type PricingPlan } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createCheckoutSession } from "@/actions/payments"

interface PricingCardsProps {
  isYearly: boolean
}

export function PricingCards({ isYearly }: PricingCardsProps) {
  const router = useRouter()
  const [loadingPlan, setLoadingPlan] = React.useState<string | null>(null)

  const handleAction = async (plan: PricingPlan) => {
    if (plan.id === "free") {
      router.push("/register")
      return
    }

    if (plan.id === "enterprise") {
      toast.info("For enterprise plans, please email us at sales@zerotosaas.dev")
      return
    }

    const variantId = isYearly ? plan.variantId?.yearly : plan.variantId?.monthly
    setLoadingPlan(plan.id)

    try {
      const res = await createCheckoutSession(variantId)

      if (res.error) {
        toast.error(res.error)
        if (res.redirect) {
          router.push(res.redirect)
        }
        return
      }

      if (res.url) {
        window.location.href = res.url
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to start checkout session.")
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
      {siteConfig.pricingPlans.map((plan) => {
        const price = isYearly ? plan.price.yearly : plan.price.monthly
        const isLoading = loadingPlan === plan.id

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
                  Most Popular
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
                Includes:
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
              <Button
                variant={plan.ctaVariant || "default"}
                className={`w-full font-semibold ${plan.popular ? "shadow-md" : ""}`}
                disabled={isLoading}
                onClick={() => handleAction(plan)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    <span>Redirecting...</span>
                  </>
                ) : (
                  plan.cta
                )}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

