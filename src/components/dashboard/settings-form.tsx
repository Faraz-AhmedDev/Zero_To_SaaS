"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Loader2, User, Bell, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { profileSchema, type ProfileInput } from "@/lib/validations/auth"
import { updateProfile } from "@/actions/auth"

interface SettingsFormProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  } | null
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [isPending, startTransition] = React.useTransition()
  const [savedSuccess, setSavedSuccess] = React.useState(false)

  const defaultName = user?.name || "Alex Rivera"
  const defaultEmail = user?.email || "alex@zerotosaas.dev"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: defaultName,
    },
  })

  const onSubmit = (values: ProfileInput) => {
    startTransition(async () => {
      try {
        const result = await updateProfile(values)
        if (result?.error) {
          toast.error(result.error)
          return
        }

        if (result?.success) {
          toast.success(result.message || "Profile updated successfully!")
          setSavedSuccess(true)
          setTimeout(() => setSavedSuccess(false), 3000)
        }
      } catch (err) {
        console.error(err)
        toast.error("An unexpected error occurred while saving your profile.")
      }
    })
  }

  const initials = defaultName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "US"

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Account Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal profile, notification preferences, and workspace security.
        </p>
      </div>

      {/* 1. Profile Information Card */}
      <Card className="border border-border/80 bg-card shadow-xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="size-5 text-primary" />
              <CardTitle className="text-lg font-bold">Profile Details</CardTitle>
            </div>
            <CardDescription className="text-xs text-muted-foreground">
              This information will be displayed to other collaborators in your workspace.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Avatar Row */}
            <div className="flex items-center gap-4">
              <Avatar className="size-16 ring-2 ring-border">
                {user?.image ? (
                  <AvatarImage src={user.image} alt={defaultName} />
                ) : (
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80"
                    alt={defaultName}
                  />
                )}
                <AvatarFallback className="text-base font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-muted-foreground">
                    Remove
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  JPG, GIF, or PNG. Maximum file size of 2MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-xs font-semibold">
                  Display Name
                </Label>
                <Input
                  id="fullName"
                  disabled={isPending}
                  className="h-9 text-sm"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={defaultEmail}
                  disabled
                  className="h-9 text-sm bg-muted/40 cursor-not-allowed opacity-80"
                />
                <p className="text-[11px] text-muted-foreground">
                  Email changes require verification and are managed in security settings.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-xs font-semibold">
                Bio / Role Description
              </Label>
              <Input
                id="bio"
                defaultValue="Founder & Full-Stack Engineer at ZeroToSaaS"
                className="h-9 text-sm"
              />
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t border-border/40 pt-4">
            <span className="text-xs text-muted-foreground">
              {savedSuccess && (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="size-3.5" /> Changes saved to database!
                </span>
              )}
            </span>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="size-3.5 animate-spin mr-1.5" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* 2. Notification Preferences */}
      <Card className="border border-border/80 bg-card shadow-xs">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-primary" />
            <CardTitle className="text-lg font-bold">Notifications</CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            Configure how and when you receive automated project alerts and newsletters.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-border/40">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Deployment Status Emails</p>
              <p className="text-xs text-muted-foreground">
                Receive notifications when production deployments succeed or fail.
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border/40">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Weekly Usage Digest</p>
              <p className="text-xs text-muted-foreground">
                Get a weekly recap of your API requests and active user analytics.
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Marketing & Changelog Updates</p>
              <p className="text-xs text-muted-foreground">
                Stay updated with new features and boilerplate improvements.
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* 3. Danger Zone */}
      <Card className="border border-destructive/30 bg-destructive/5 shadow-xs">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" />
            <CardTitle className="text-lg font-bold">Danger Zone</CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            Irreversible actions regarding your account and associated projects.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Delete Account</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account, projects, database schemas, and billing data.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                toast.error("Account deletion requires confirmation via email.")
              }}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
