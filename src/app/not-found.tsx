import Link from "next/link"
import { ArrowLeft, Home, Layers } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mb-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs mx-auto">
          <Layers className="size-8" />
        </div>
        <div className="absolute -inset-4 rounded-full bg-primary/5 blur-xl pointer-events-none -z-10" />
      </div>

      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
        404 Error
      </span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved, deleted, or the URL might be mistyped.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default" }), "gap-2")}
        >
          <Home className="size-4" />
          Back to Home
        </Link>
        <Link
          href="/pricing"
          className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
        >
          <ArrowLeft className="size-4" />
          View Pricing
        </Link>
      </div>

      <p className="mt-12 text-xs text-muted-foreground">
        Need assistance? Check out our{" "}
        <Link
          href="https://github.com/Faraz-AhmedDev/Zero_To_SaaS"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          GitHub documentation
        </Link>
        .
      </p>
    </div>
  )
}
