"use client"

import * as React from "react"
import Link from "next/link"
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logoutUser } from "@/actions/auth"

interface UserNavProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  } | null
}

export function UserNav({ user }: UserNavProps) {
  const [isPending, startTransition] = React.useTransition()

  const displayName = user?.name || "User"
  const displayEmail = user?.email || "user@zerotosaas.dev"
  const displayRole = user?.role || "USER"

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "US"

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser()
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="relative h-9 w-9 rounded-full ring-1 ring-border hover:ring-primary/40 transition-all p-0"
          >
            <Avatar className="h-8 w-8">
              {user?.image && (
                <AvatarImage src={user.image} alt={displayName} />
              )}
              <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        }
      />
      <DropdownMenuContent className="w-56" align="end">
        <div className="p-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col space-y-0.5 max-w-[140px]">
              <p className="text-sm font-semibold leading-none truncate">
                {displayName}
              </p>
              <p className="text-xs text-muted-foreground leading-none mt-1 truncate">
                {displayEmail}
              </p>
            </div>
            <Badge
              variant="secondary"
              className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0 bg-primary/10 text-primary"
            >
              {displayRole}
            </Badge>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={
            <Link href="/dashboard" className="w-full flex items-center cursor-pointer">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Dashboard</span>
            </Link>
          } />
          <DropdownMenuItem render={
            <Link href="/dashboard/billing" className="w-full flex items-center cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Billing & Plans</span>
            </Link>
          } />
          <DropdownMenuItem render={
            <Link href="/dashboard/settings" className="w-full flex items-center cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Account Settings</span>
            </Link>
          } />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={
          <div className="w-full flex items-center text-xs text-amber-500 dark:text-amber-400 font-medium cursor-pointer">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            <span>Active Plan</span>
          </div>
        } />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isPending}
          onClick={handleLogout}
          className="w-full flex items-center text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isPending ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
