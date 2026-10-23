import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register")
  const isDashboardRoute = pathname.startsWith("/dashboard")

  // Redirect unauthenticated visitors attempting to view dashboard pages to /login
  if (isDashboardRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(pathname)
    return Response.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.nextUrl)
    )
  }

  // Redirect authenticated visitors away from login/register to /dashboard
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.nextUrl))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
