"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Menu, Search, Bell, Layers, ChevronRight } from "lucide-react"

import { Sidebar } from "@/components/shared/sidebar"
import { UserNav } from "@/components/shared/user-nav"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"

interface DashboardHeaderProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  } | null
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  // Derive dynamic breadcrumb title
  const getPageTitle = () => {
    if (pathname.includes("/billing")) return "Billing & Invoices"
    if (pathname.includes("/settings")) return "Account Settings"
    return "Dashboard Overview"
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/70 bg-card/60 px-4 md:px-6 backdrop-blur-md">
      {/* Left: Mobile trigger & Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Sheet Trigger */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="size-9">
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              }
            />
            <SheetContent side="left" className="p-0 w-72">
              <SheetHeader className="p-4 border-b border-border/60 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                    <Layers className="size-4" />
                  </div>
                  <SheetTitle className="font-heading text-base font-bold">
                    {siteConfig.name}
                  </SheetTitle>
                </div>
              </SheetHeader>
              <Sidebar className="border-r-0 h-[calc(100vh-65px)]" />
            </SheetContent>
          </Sheet>
        </div>

        {/* Breadcrumb / Page Title */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground hidden sm:inline">Workspace</span>
          <ChevronRight className="size-3.5 text-muted-foreground/60 hidden sm:inline" />
          <h1 className="font-semibold text-foreground tracking-tight">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right: Quick Search, Notifications, ThemeToggle & UserNav */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick search input (desktop) */}
        <div className="relative hidden lg:block w-56">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="h-9 pl-9 pr-8 text-xs bg-muted/40 border-border/60"
          />
          <kbd className="pointer-events-none absolute right-2 top-2.5 hidden h-4 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
            ⌘K
          </kbd>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-md text-muted-foreground hover:text-foreground relative"
        >
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-primary" />
          <span className="sr-only">Notifications</span>
        </Button>

        <ThemeToggle />

        <div className="h-5 w-px bg-border/80 mx-1" />

        <UserNav user={user} />
      </div>
    </header>
  )
}
