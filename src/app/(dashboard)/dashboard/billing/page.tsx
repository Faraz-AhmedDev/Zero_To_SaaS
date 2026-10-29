import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getUserSubscription } from "@/lib/db/queries"
import { BillingOverview } from "@/components/dashboard/billing-overview"
import { siteConfig } from "@/config/site"

async function BillingWithAuth() {
  const session = await auth()
  const subscription = await getUserSubscription(session?.user?.id)
  const proPlan = siteConfig.pricingPlans.find((p) => p.name.toLowerCase() === "pro")

  return (
    <BillingOverview
      isPro={subscription.isPro}
      plan={subscription.plan}
      currentPeriodEnd={subscription.currentPeriodEnd}
      monthlyVariantId={proPlan?.variantId?.monthly}
      yearlyVariantId={proPlan?.variantId?.yearly}
    />
  )
}

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <BillingOverview
          isPro={false}
          plan="FREE"
          currentPeriodEnd={null}
        />
      }
    >
      <BillingWithAuth />
    </Suspense>
  )
}
