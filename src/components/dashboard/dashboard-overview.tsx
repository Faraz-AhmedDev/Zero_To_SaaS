"use client"

import * as React from "react"
import {
  DollarSign,
  Zap,
  Activity,
  ShieldCheck,
  Plus,
  FolderPlus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "sonner"

interface DashboardOverviewProps {
  userName?: string | null
  isPro?: boolean
  plan?: "FREE" | "PRO"
  currentPeriodEnd?: Date | null
}

export function DashboardOverview({
  userName,
  isPro = false,
  plan = "FREE",
  currentPeriodEnd,
}: DashboardOverviewProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [projectName, setProjectName] = React.useState("")
  const [projectSlug, setProjectSlug] = React.useState("")
  const [isCreating, setIsCreating] = React.useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setProjectName(val)
    setProjectSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    )
  }

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    setTimeout(() => {
      setIsCreating(false)
      setIsDialogOpen(false)
      toast.success(`Project "${projectName}" created successfully!`)
      setProjectName("")
      setProjectSlug("")
    }, 600)
  }

  const firstName = userName ? userName.split(" ")[0] : "Developer"

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Welcome back, {firstName} 👋
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Here is what is happening across your ZeroToSaaS projects today.
          </p>
        </div>

        {/* Create Project Trigger */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={
              <Button className="gap-2 shadow-sm font-semibold">
                <Plus className="size-4" />
                <span>New Project</span>
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Create New Project</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Enter your project details to create an isolated workspace and database tenant.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateProject} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-xs font-semibold">
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  placeholder="e.g. Acme Analytics"
                  value={projectName}
                  onChange={handleNameChange}
                  required
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectSlug" className="text-xs font-semibold">
                  Project URL Slug
                </Label>
                <div className="flex items-center rounded-md border border-input bg-muted/30 px-3 text-xs text-muted-foreground font-mono">
                  <span>zerotosaas.dev/</span>
                  <input
                    id="projectSlug"
                    className="flex-1 bg-transparent py-2 pl-1 text-foreground outline-none font-mono text-xs"
                    value={projectSlug}
                    onChange={(e) => setProjectSlug(e.target.value)}
                    placeholder="acme-analytics"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDesc" className="text-xs font-semibold">
                  Description (optional)
                </Label>
                <Input
                  id="projectDesc"
                  placeholder="Real-time analytics engine for B2B startups"
                  className="h-9 text-sm"
                />
              </div>

              <DialogFooter className="pt-2 gap-2">
                <DialogClose
                  render={
                    <Button type="button" variant="outline" size="sm">
                      Cancel
                    </Button>
                  }
                />
                <Button type="submit" size="sm" disabled={isCreating || !projectName}>
                  {isCreating ? "Creating..." : "Create Project"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Revenue */}
        <Card className="border border-border/80 bg-card shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">$12,450.00</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <span>+14.2%</span>
              <span className="text-muted-foreground">from last month</span>
            </p>
          </CardContent>
        </Card>

        {/* Metric 2: Active Plan */}
        <Card className="border border-border/80 bg-card shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Active Plan
            </CardTitle>
            <div className={`flex size-8 items-center justify-center rounded-lg ${isPro ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-muted text-muted-foreground"}`}>
              <Zap className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {isPro ? "Pro Plan" : "Free Plan"}
            </div>
            {isPro ? (
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <span>Next billing:</span>
                <span className="font-semibold text-foreground">
                  {currentPeriodEnd ? new Date(currentPeriodEnd).toLocaleDateString() : "Active"}
                </span>
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                <Link href="/dashboard/billing" className="text-primary hover:underline font-medium">
                  Upgrade to Pro →
                </Link>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Metric 3: API Usage */}
        <Card className="border border-border/80 bg-card shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              API Requests
            </CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Activity className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              48,219 <span className="text-xs font-normal text-muted-foreground">/ 100k</span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full" style={{ width: "48%" }} />
            </div>
          </CardContent>
        </Card>

        {/* Metric 4: Account Status */}
        <Card className="border border-border/80 bg-card shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              System Health
            </CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">Verified</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <span className="size-2 rounded-full bg-emerald-500 inline-block" />
              <span>99.98% Uptime</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Clean Empty State Placeholder Container */}
      <div className="rounded-2xl border-2 border-dashed border-border/80 bg-card/40 p-10 sm:p-14 text-center backdrop-blur-xs">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
          <FolderPlus className="size-7" />
        </div>
        <h3 className="text-lg font-bold text-foreground">
          No projects created yet
        </h3>
        <p className="mt-2 max-w-sm mx-auto text-sm text-muted-foreground leading-relaxed">
          Get started by creating your first project workspace. You can invite team members,
          set up webhooks, and deploy your app anytime.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="gap-2 shadow-xs font-semibold"
          >
            <Plus className="size-4" />
            <span>Create New Project</span>
          </Button>
        </div>
      </div>

      {/* Quick Setup Checklist */}
      <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-base font-semibold text-foreground">LaunchStack Pipeline</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Production status of your database and authentication systems
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-xs">Phase 2 Active</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg border border-border/60 bg-muted/20">
            <div className="flex items-center gap-2 font-semibold text-foreground mb-1">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">✓</span>
              UI & Layout Architecture
            </div>
            <p className="text-muted-foreground mt-1">App router, responsive sidebar, auth layouts, and dark mode configured.</p>
          </div>

          <div className="p-4 rounded-lg border border-border/60 bg-muted/20">
            <div className="flex items-center gap-2 font-semibold text-foreground mb-1">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">✓</span>
              Auth.js & PostgreSQL
            </div>
            <p className="text-muted-foreground mt-1">Drizzle ORM schema, credentials auth, bcrypt hashing, and JWT sessions.</p>
          </div>

          <div className="p-4 rounded-lg border border-border/60 bg-muted/20">
            <div className="flex items-center gap-2 font-semibold text-foreground mb-1">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px]">3</span>
              Stripe Webhook Handlers
            </div>
            <p className="text-muted-foreground mt-1">Next phase: Connect Stripe billing keys, checkout sessions, and portal.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
