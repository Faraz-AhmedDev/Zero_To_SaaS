"use client"

import * as React from "react"
import Link from "next/link"
import { AlertTriangle, Home, RotateCcw } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log unexpected errors to an error reporting service
    console.error("Runtime error caught by root error boundary:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mb-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 shadow-xs mx-auto">
          <AlertTriangle className="size-8" />
        </div>
        <div className="absolute -inset-4 rounded-full bg-destructive/5 blur-xl pointer-events-none -z-10" />
      </div>

      <span className="text-xs font-semibold uppercase tracking-wider text-destructive">
        Application Error
      </span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
        An unexpected error occurred while processing your request. Don&apos;t worry, our team has been notified.
      </p>

      {error.message && process.env.NODE_ENV !== "production" && (
        <div className="mt-4 max-w-lg rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-left font-mono text-xs text-destructive overflow-x-auto">
          {error.message}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => reset()} variant="default" className="gap-2">
          <RotateCcw className="size-4" />
          Try Again
        </Button>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
        >
          <Home className="size-4" />
          Back to Home
        </Link>
      </div>

      <p className="mt-12 text-xs text-muted-foreground">
        ZeroToSaaS Open-Source Boilerplate
      </p>
    </div>
  )
}
