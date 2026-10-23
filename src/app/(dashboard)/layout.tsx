import * as React from "react"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { Sidebar } from "@/components/shared/sidebar"
import { DashboardHeader } from "@/components/shared/dashboard-header"

async function HeaderWithAuth() {
  const session = await auth()
  return <DashboardHeader user={session?.user} />
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* 1. Desktop Fixed Sidebar */}
      <Sidebar className="hidden md:flex w-64 shrink-0" />

      {/* 2. Main Content Wrapper */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header wrapped in Suspense for Next.js 16 Partial Prerendering */}
        <Suspense fallback={<DashboardHeader user={null} />}>
          <HeaderWithAuth />
        </Suspense>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
