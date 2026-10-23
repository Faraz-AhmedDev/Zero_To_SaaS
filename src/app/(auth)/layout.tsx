import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { siteConfig } from "@/config/site"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Top Bar with Back to Home & Theme Toggle */}
      <header className="container mx-auto max-w-7xl flex items-center justify-between p-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Centered Auth Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Layers className="size-5" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
          </div>
          {children}
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="p-6 text-center text-xs text-muted-foreground">
        © 2026 {siteConfig.name}. All rights reserved.
      </footer>
    </div>
  )
}
