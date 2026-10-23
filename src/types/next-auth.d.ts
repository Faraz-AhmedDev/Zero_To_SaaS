import { type DefaultSession } from "next-auth"
import { type JWT } from "next-auth/jwt"
import { type UserRole } from "@/lib/db/schema"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
    } & DefaultSession["user"]
  }

  interface User {
    role?: UserRole
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: UserRole
  }
}
