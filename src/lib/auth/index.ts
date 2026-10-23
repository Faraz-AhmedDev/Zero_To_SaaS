import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { users, accounts, sessions, verificationTokens } from "@/lib/db/schema"
import { loginSchema } from "@/lib/validations/auth"
import { authConfig } from "./auth.config"

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    ...authConfig.providers,
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials)

        if (!validatedFields.success) {
          return null
        }

        const { email, password } = validatedFields.data
        const normalizedEmail = email.toLowerCase()

        // 1. Built-in Demo Credentials for instant testing
        if (
          normalizedEmail === "demo@zerotosaas.dev" &&
          password === "Password123!"
        ) {
          return {
            id: "demo-admin-id",
            name: "Alex Rivera",
            email: "demo@zerotosaas.dev",
            role: "ADMIN",
            image:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80",
          }
        }

        // 2. Query PostgreSQL Database
        try {
          const user = await db.query.users.findFirst({
            where: eq(users.email, normalizedEmail),
          })

          if (!user || !user.password) {
            return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (!passwordsMatch) {
            return null
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
          }
        } catch (dbError) {
          console.error("[DATABASE_AUTH_ERROR]", dbError)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: "USER" | "ADMIN" }).role || "USER"
      }

      if (trigger === "update" && session?.name) {
        token.name = session.name
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        if (token.id) {
          session.user.id = token.id as string
        }
        if (token.role) {
          session.user.role = token.role as "USER" | "ADMIN"
        }
        if (token.name) {
          session.user.name = token.name as string
        }
      }
      return session
    },
  },
})
