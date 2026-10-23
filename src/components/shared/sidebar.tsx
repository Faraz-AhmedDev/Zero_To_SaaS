"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  CreditCard,
  Settings,
  Layers,
  ChevronDown,
  Sparkles,
  ExternalLink,
  FolderDot,
  BarChart3,
  Users,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Billing & Plans",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

const secondaryNav = [
  {
    title: "Landing Page",
    href: "/",
    icon: ExternalLink,
  },
  {
    title: "Pricing Page",
    href: "/pricing",
    icon: Sparkles,
  },
]

export function Sidebar({ className = "" }: { className?: string }) {
  const pathname = usePathname()

  return (
    <aside
      className={`flex flex-col border-r border-border bg-card/60 backdrop-blur-sm h-full select-none ${className}`}
    >
      {/* Workspace / Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/60">
        <Link href="/dashboard" className="flex items-center gap-2.5 font-semibold">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Layers className="size-4" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-bold text-sm text-foreground">
              {siteConfig.name}
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5">Workspace</span>
          </div>
        </Link>
        <Badge variant="outline" className="text-[10px] uppercase font-semibold text-primary border-primary/20 bg-primary/5">
          Pro
        </Badge>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <p className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Platform
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className={`size-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div>
          <p className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Public Site
          </p>
          <nav className="space-y-1">
            {secondaryNav.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                  <Icon className="size-4 text-muted-foreground" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Pro Tier Widget */}
      <div className="p-3 border-t border-border/60">
        <div className="rounded-xl border border-border/80 bg-background/50 p-3 shadow-xs">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-amber-500" />
              Pro Plan
            </span>
            <span className="text-[11px] text-muted-foreground">48% used</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "48%" }} />
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-tight">
            48,219 / 100,000 monthly API calls
          </p>
          <Link href="/dashboard/billing" className="block mt-2.5">
            <Button variant="outline" size="xs" className="w-full text-xs">
              Manage Subscription
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  )
}
