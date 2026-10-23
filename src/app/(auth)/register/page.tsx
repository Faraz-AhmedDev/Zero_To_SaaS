"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react"
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
import { registerSchema, type RegisterInput } from "@/lib/validations/auth"
import { registerUser, loginWithOAuth } from "@/actions/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: RegisterInput) => {
    startTransition(async () => {
      try {
        const result = await registerUser(values)
        if (result?.error) {
          toast.error(result.error)
          return
        }

        if (result?.success) {
          toast.success(result.message || "Account created successfully!")
          router.push("/login")
        }
      } catch (err) {
        console.error(err)
        toast.error("An unexpected error occurred. Please try again.")
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
          Create an account
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Start building and scaling your Next.js SaaS in minutes
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
              Or sign up with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-semibold">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Alex Rivera"
              disabled={isPending}
              className="h-10 text-sm"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

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
            <Label htmlFor="password" className="text-xs font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
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

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-xs font-semibold">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              disabled={isPending}
              className="h-10 text-sm"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
            <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
            <span>By signing up, you agree to the Terms of Service & Privacy.</span>
          </div>

          <Button
            type="submit"
            className="w-full h-10 font-semibold gap-1.5"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Creating your account...</span>
              </>
            ) : (
              <>
                <span>Get Started Free</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2 text-center text-xs text-muted-foreground border-t border-border/40 pt-4">
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
