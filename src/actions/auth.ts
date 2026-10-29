"use server"

import { AuthError } from "next-auth"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { users, subscriptions } from "@/lib/db/schema"
import { signIn, signOut, auth } from "@/lib/auth"
import { sendWelcomeEmail } from "@/lib/mail"
import {
  loginSchema,
  registerSchema,
  profileSchema,
  type LoginInput,
  type RegisterInput,
  type ProfileInput,
} from "@/lib/validations/auth"

export type ActionResult<T = unknown> = {
  success?: boolean
  error?: string
  message?: string
  data?: T
}

// 1. Register User Action
export async function registerUser(values: RegisterInput): Promise<ActionResult> {
  try {
    const validated = registerSchema.safeParse(values)
    if (!validated.success) {
      return {
        error: validated.error.issues[0]?.message || "Invalid input data",
      }
    }

    const { name, email, password } = validated.data
    const normalizedEmail = email.toLowerCase().trim()

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, normalizedEmail),
    })

    if (existingUser) {
      return {
        error: "An account with this email address already exists.",
      }
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert user into database
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: "USER",
      })
      .returning()

    if (!newUser) {
      return { error: "Failed to create user account. Please try again." }
    }

    // Provision default FREE subscription record for the new user
    await db.insert(subscriptions).values({
      userId: newUser.id,
      plan: "FREE",
      status: "ACTIVE",
    })

    // Send welcome email (non-blocking)
    sendWelcomeEmail(normalizedEmail, name).catch((err) => {
      console.error("[WELCOME_EMAIL_BACKGROUND_ERROR]", err)
    })

    return {
      success: true,
      message: "Account created successfully! You can now log in.",
    }
  } catch (err) {
    console.error("[REGISTER_USER_ERROR]", err)
    return {
      error: "An unexpected error occurred while creating your account.",
    }
  }
}

// 2. Login with Credentials Action
export async function loginWithCredentials(
  values: LoginInput
): Promise<ActionResult> {
  try {
    const validated = loginSchema.safeParse(values)
    if (!validated.success) {
      return {
        error: validated.error.issues[0]?.message || "Invalid email or password",
      }
    }

    const { email, password } = validated.data

    await signIn("credentials", {
      email: email.toLowerCase().trim(),
      password,
      redirectTo: "/dashboard",
    })

    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" }
        default:
          return { error: "Authentication failed. Please try again." }
      }
    }
    // Re-throw redirect errors so Next.js redirects to /dashboard
    throw error
  }
}

// 3. Login with OAuth Action (Google, GitHub)
export async function loginWithOAuth(provider: "google" | "github") {
  await signIn(provider, { redirectTo: "/dashboard" })
}

// 4. Update Profile Name Action
export async function updateProfile(
  values: ProfileInput
): Promise<ActionResult> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Unauthorized. Please log in again." }
    }

    const validated = profileSchema.safeParse(values)
    if (!validated.success) {
      return {
        error: validated.error.issues[0]?.message || "Invalid name",
      }
    }

    const { name } = validated.data

    await db
      .update(users)
      .set({
        name,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id))

    return {
      success: true,
      message: "Profile updated successfully!",
    }
  } catch (err) {
    console.error("[UPDATE_PROFILE_ERROR]", err)
    return { error: "Failed to update profile. Please try again." }
  }
}

// 5. Logout User Action
export async function logoutUser() {
  await signOut({ redirectTo: "/login" })
}
