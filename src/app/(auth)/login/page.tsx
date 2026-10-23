"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, ArrowRight } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { GithubIcon, GoogleIcon } from "@/components/shared/icons"
import { loginSchema, type LoginInput } from "@/lib/validations/auth"
import { loginWithCredentials, loginWithOAuth } from "@/actions/auth"

export default function LoginPage() {
  const [isPending, startTransition] = React.useTransition()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "demo@zerotosaas.dev",
      password: "Password123!",
    },
  })

  const onSubmit = (values: LoginInput) => {
    startTransition(async () => {
      try {
        const result = await loginWithCredentials(values)
        if (result?.error) {
          toast.error(result.error)
        }
      } catch (err) {
        // Next.js redirection or unexpected error
        console.error(err)
      }
    })
  }

  const handleOAuth = (provider: "google" | "github") => {
    startTransition(async () => {
      try {
        await loginWithOAuth(provider)
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <Card className="border border-border/80 shadow-xl bg-card">
      <CardHeader className="space-y-1 text-center pb-6">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter your credentials to access your dashboard
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            type="button"
            disabled={isPending}
            className="w-full gap-2 border-border/80 hover:bg-muted font-medium text-xs sm:text-sm"
            onClick={() => handleOAuth("google")}
          >
            <GoogleIcon className="size-4" />
            <span>Google</span>
          </Button>

          <Button
            variant="outline"
            type="button"
            disabled={isPending}
            className="w-full gap-2 border-border/80 hover:bg-muted font-medium text-xs sm:text-sm"
            onClick={() => handleOAuth("github")}
          >
            <GithubIcon className="size-4" />
            <span>GitHub</span>
          </Button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground font-medium">
              Or continue with email
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs flex items-center justify-between gap-2">
          <div>
            <span className="font-semibold text-foreground">Demo Admin Account:</span>
            <p className="text-muted-foreground font-mono text-[11px] mt-0.5">
              demo@zerotosaas.dev • Password123!
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="xs"
            className="text-[11px] h-7"
            onClick={() => {
              setValue("email", "demo@zerotosaas.dev")
              setValue("password", "Password123!")
            }}
          >
            Auto Fill
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold">
              Work Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="alex@launchstack.dev"
              disabled={isPending}
              className="h-10 text-sm"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-semibold">
                Password
              </Label>
              <Link
                href="#"
                className="text-xs text-primary hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••••••"
              disabled={isPending}
              className="h-10 text-sm"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-destructive font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 font-semibold gap-1.5"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2 text-center text-xs text-muted-foreground border-t border-border/40 pt-4">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
