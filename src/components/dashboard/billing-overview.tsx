"use client"

import * as React from "react"
import {
  CreditCard,
  Sparkles,
  CheckCircle2,
  Download,
  Calendar,
  Loader2,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createCheckoutSession, openCustomerPortal } from "@/actions/payments"

interface BillingOverviewProps {
  isPro: boolean
  plan: "FREE" | "PRO"
  currentPeriodEnd?: Date | null
  monthlyVariantId?: string
  yearlyVariantId?: string
}

export function BillingOverview({
  isPro,
  plan,
  currentPeriodEnd,
  monthlyVariantId = "",
}: BillingOverviewProps) {
  const [isUpgrading, setIsUpgrading] = React.useState(false)
  const [isOpeningPortal, setIsOpeningPortal] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const handleUpgrade = async () => {
    try {
      setIsUpgrading(true)
      setErrorMessage(null)
      const res = await createCheckoutSession(monthlyVariantId)
      if (res.url) {
        window.location.href = res.url
      } else {
        setErrorMessage(res.error || "Could not initialize checkout.")
      }
    } catch {
      setErrorMessage("An unexpected error occurred.")
    } finally {
      setIsUpgrading(false)
    }
  }

  const handleManage = async () => {
    try {
      setIsOpeningPortal(true)
      setErrorMessage(null)
      const res = await openCustomerPortal()
      if (res.url) {
        window.location.href = res.url
      } else {
        setErrorMessage(res.error || "Could not open billing portal.")
      }
    } catch {
      setErrorMessage("An unexpected error occurred.")
    } finally {
      setIsOpeningPortal(false)
    }
  }

  const invoices = [
    {
      id: "INV-2026-004",
      date: "Oct 1, 2026",
      amount: isPro ? "$29.00" : "$0.00",
      status: "Paid",
      plan: isPro ? "ZeroToSaaS Pro (Monthly)" : "ZeroToSaaS Free",
    },
    {
      id: "INV-2026-003",
      date: "Sep 1, 2026",
      amount: isPro ? "$29.00" : "$0.00",
      status: "Paid",
      plan: isPro ? "ZeroToSaaS Pro (Monthly)" : "ZeroToSaaS Free",
    },
  ]

  const renewalFormatted = currentPeriodEnd
    ? new Date(currentPeriodEnd).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Billing & Subscription
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your subscription tier, payments, and invoices powered by LemonSqueezy.
        </p>
      </div>

      {errorMessage && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive font-medium">
          {errorMessage}
        </div>
      )}

      {/* 1. Current Plan Card */}
      <Card
        className={`border relative overflow-hidden shadow-xs ${
          isPro ? "border-primary/40 bg-card" : "border-border/80 bg-card"
        }`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />

        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge
                className={
                  isPro
                    ? "bg-primary text-primary-foreground font-semibold px-2.5 py-0.5 text-xs"
                    : "bg-muted text-muted-foreground font-semibold px-2.5 py-0.5 text-xs"
                }
              >
                {isPro ? "Pro Member" : "Free Plan"}
              </Badge>
              {renewalFormatted && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3.5" /> Renews on {renewalFormatted}
                </span>
              )}
            </div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <span>{isPro ? "ZeroToSaaS Pro" : "ZeroToSaaS Free Tier"}</span>
              <span className="text-base font-normal text-muted-foreground">
                {isPro ? "($29/mo)" : "($0/mo)"}
              </span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              {isPro
                ? "Full access to all Pro features, priority support, and unlimited API usage."
                : "Basic features for personal side-projects. Upgrade anytime to unlock advanced perks."}
            </CardDescription>
          </div>

          <div className="flex gap-2">
            {isPro ? (
              <Button
                size="sm"
                className="gap-1.5 shadow-sm"
                onClick={handleManage}
                disabled={isOpeningPortal}
              >
                {isOpeningPortal ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <ExternalLink className="size-3.5" />
                )}
                Manage via LemonSqueezy
              </Button>
            ) : (
              <Button
                size="sm"
                className="gap-1.5 shadow-sm"
                onClick={handleUpgrade}
                disabled={isUpgrading}
              >
                {isUpgrading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Sparkles className="size-3.5" />
                )}
                Upgrade to Pro ($29/mo)
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-4 border-t border-border/40">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Plan Usage Limits
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span>Active Projects</span>
                <span className="font-semibold text-foreground">
                  {isPro ? "4 / ∞" : "1 / 3"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: isPro ? "25%" : "33%" }}
                />
              </div>
              <span className="text-[11px] text-muted-foreground mt-1.5 block">
                {isPro ? "Unlimited projects available" : "2 free slots left"}
              </span>
            </div>

            <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span>Team Seats</span>
                <span className="font-semibold text-foreground">
                  {isPro ? "2 / 5" : "1 / 1"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: isPro ? "40%" : "100%" }}
                />
              </div>
              <span className="text-[11px] text-muted-foreground mt-1.5 block">
                {isPro ? "3 team invites available" : "Upgrade to invite team"}
              </span>
            </div>

            <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span>API Usage</span>
                <span className="font-semibold text-foreground">
                  {isPro ? "48,219 / 100k" : "1,200 / 5,000"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: isPro ? "48%" : "24%" }}
                />
              </div>
              <span className="text-[11px] text-muted-foreground mt-1.5 block">
                Resets every billing cycle
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Payment Method Card */}
      <Card className="border border-border/80 bg-card shadow-xs">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="size-5 text-primary" />
            <CardTitle className="text-lg font-bold">Payment Method</CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            Payments and customer billing are processed safely via LemonSqueezy.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/80 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider">
                {isPro ? "PRO" : "FREE"}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span>{isPro ? "Active LemonSqueezy Subscription" : "No active payment method"}</span>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {plan}
                  </Badge>
                </p>
                <p className="text-xs text-muted-foreground">
                  {isPro
                    ? "Manage your payment cards through the LemonSqueezy portal"
                    : "Upgrade to Pro to add a credit card or PayPal"}
                </p>
              </div>
            </div>

            {isPro && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleManage}
                disabled={isOpeningPortal}
              >
                {isOpeningPortal && <Loader2 className="mr-2 size-3.5 animate-spin" />}
                Update Card
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 3. Invoices History Table */}
      <Card className="border border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Billing History</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Download previous invoices and receipts for accounting.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/60 text-xs font-semibold text-muted-foreground uppercase">
                <tr>
                  <th className="pb-3 font-medium">Invoice ID</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 font-mono font-medium text-foreground">
                      {inv.id}
                    </td>
                    <td className="py-3 text-muted-foreground">{inv.date}</td>
                    <td className="py-3 font-semibold text-foreground">{inv.amount}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3" />
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        variant="ghost"
                        size="xs"
                        className="text-muted-foreground hover:text-foreground gap-1"
                        onClick={() => alert(`LemonSqueezy receipt ${inv.id}`)}
                      >
                        <Download className="size-3.5" />
                        <span>PDF</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

