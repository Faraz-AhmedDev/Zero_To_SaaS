import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

async function DashboardOverviewWithAuth() {
  const session = await auth()
  return <DashboardOverview userName={session?.user?.name} />
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardOverview userName={null} />}>
      <DashboardOverviewWithAuth />
    </Suspense>
  )
}
