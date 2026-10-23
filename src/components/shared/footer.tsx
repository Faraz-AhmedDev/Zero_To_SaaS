import Link from "next/link"
import { Layers } from "lucide-react"
import { GithubIcon, TwitterIcon } from "@/components/shared/icons"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Layers className="size-4" />
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                {siteConfig.name}
              </span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/30"
              >
                <GithubIcon className="size-4" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/30"
              >
                <TwitterIcon className="size-4" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Live Dashboard
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground/60 text-xs">
                  Changelog <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">v1.0</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Resources */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation & FAQs
                </a>
              </li>
              <li>
                <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Next.js Docs
                </a>
              </li>
              <li>
                <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  shadcn/ui
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              Stay in the loop
            </h3>
            <p className="text-xs text-muted-foreground">
              Subscribe to get product updates and release announcements. No spam.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="developer@company.com"
                className="h-9 text-xs"
              />
              <Button size="sm" className="h-9 px-3">
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 {siteConfig.name}. Open source under MIT License.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
