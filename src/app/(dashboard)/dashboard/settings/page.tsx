import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { SettingsForm } from "@/components/dashboard/settings-form"

async function SettingsWithAuth() {
  const session = await auth()
  return <SettingsForm user={session?.user} />
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsForm user={null} />}>
      <SettingsWithAuth />
    </Suspense>
  )
}
