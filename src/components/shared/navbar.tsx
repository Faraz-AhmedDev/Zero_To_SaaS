"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Layers, Menu, ArrowRight } from "lucide-react"
import { GithubIcon } from "@/components/shared/icons"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-transform hover:opacity-90"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-1 ring-border">
              <Layers className="size-5" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {siteConfig.mainNav.map((item) => {
              const isActive = pathname === item.href
              return item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-foreground ${
                    isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center justify-center size-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <GithubIcon className="size-4" />
            <span className="sr-only">GitHub</span>
          </a>

          <ThemeToggle />

          <div className="hidden sm:flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="gap-1.5 shadow-sm">
                Get Started
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Drawer Trigger */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="size-9">
                    <Menu className="size-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                }
              />
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6">
                <SheetHeader className="p-0 text-left">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Layers className="size-4" />
                    </div>
                    <SheetTitle className="font-heading text-lg font-bold">
                      {siteConfig.name}
                    </SheetTitle>
                  </div>
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-4">
                  <nav className="flex flex-col space-y-3">
                    {siteConfig.mainNav.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-base font-medium py-1.5 transition-colors hover:text-foreground ${
                          pathname === item.href
                            ? "text-primary font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>

                  <div className="my-2 h-px bg-border" />

                  <div className="flex flex-col gap-2.5">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-center">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full justify-center gap-1.5">
                        Get Started Free
                        <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
