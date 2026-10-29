import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getUserSubscription } from "@/lib/db/queries"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

async function DashboardOverviewWithAuth() {
  const session = await auth()
  const subscription = await getUserSubscription(session?.user?.id)

  return (
    <DashboardOverview
      userName={session?.user?.name}
      isPro={subscription.isPro}
      plan={subscription.plan}
      currentPeriodEnd={subscription.currentPeriodEnd}
    />
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardOverview userName={null} />}>
      <DashboardOverviewWithAuth />
    </Suspense>
  )
}

