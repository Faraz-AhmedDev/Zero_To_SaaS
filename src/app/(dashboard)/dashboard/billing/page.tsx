"use client"

import * as React from "react"
import {
  CreditCard,
  Sparkles,
  CheckCircle2,
  Download,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function BillingPage() {
  const invoices = [
    {
      id: "INV-2026-004",
      date: "Oct 1, 2026",
      amount: "$29.00",
      status: "Paid",
      plan: "ZeroToSaas Pro (Monthly)",
    },
    {
      id: "INV-2026-003",
      date: "Sep 1, 2026",
      amount: "$29.00",
      status: "Paid",
      plan: "ZeroToSaas Pro (Monthly)",
    },
    {
      id: "INV-2026-002",
      date: "Aug 1, 2026",
      amount: "$29.00",
      status: "Paid",
      plan: "ZeroToSaas Pro (Monthly)",
    },
    {
      id: "INV-2026-001",
      date: "Jul 1, 2026",
      amount: "$29.00",
      status: "Paid",
      plan: "ZeroToSaas Pro (Monthly)",
    },
  ]

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Billing & Subscription
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your subscription tier, payment credentials, and downloadable tax invoices.
        </p>
      </div>

      {/* 1. Current Plan Card */}
      <Card className="border border-primary/40 bg-card shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />

        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-primary text-primary-foreground font-semibold px-2.5 py-0.5 text-xs">
                Current Plan
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="size-3.5" /> Renews on Nov 1, 2026
              </span>
            </div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <span>ZeroToSaas Pro</span>
              <span className="text-base font-normal text-muted-foreground">
                ($29/month)
              </span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Unlimited projects, high-throughput edge API, and priority support.
            </CardDescription>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Change Plan
            </Button>
            <Button size="sm" className="gap-1.5 shadow-sm">
              <Sparkles className="size-3.5" />
              Manage via Stripe
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-4 border-t border-border/40">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Plan Usage Limits
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Limit 1: Projects */}
            <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span>Active Projects</span>
                <span className="font-semibold text-foreground">4 / 10</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "40%" }} />
              </div>
              <span className="text-[11px] text-muted-foreground mt-1.5 block">
                6 available projects left
              </span>
            </div>

            {/* Limit 2: Team Seats */}
            <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span>Team Seats</span>
                <span className="font-semibold text-foreground">2 / 5</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "40%" }} />
              </div>
              <span className="text-[11px] text-muted-foreground mt-1.5 block">
                3 invites remaining
              </span>
            </div>

            {/* Limit 3: API Requests */}
            <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span>API Usage</span>
                <span className="font-semibold text-foreground">48,219 / 100k</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "48%" }} />
              </div>
              <span className="text-[11px] text-muted-foreground mt-1.5 block">
                Resets in 18 days
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
            Your default payment card used for subscription billing and metered overages.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/80 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider">
                VISA
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span>Visa ending in 4242</span>
                  <Badge variant="outline" className="text-[10px] font-mono">Default</Badge>
                </p>
                <p className="text-xs text-muted-foreground">Expires 12/2028</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Update Card
              </Button>
            </div>
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
                        onClick={() => alert(`Downloading invoice ${inv.id}`)}
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
