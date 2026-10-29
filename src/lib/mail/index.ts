import { Resend } from "resend"
import * as React from "react"
import { WelcomeEmail } from "@/components/emails/welcome-email"
import { SubscriptionSuccessEmail } from "@/components/emails/subscription-success-email"

const apiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.EMAIL_FROM || "ZeroToSaaS <onboarding@resend.dev>"
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const resend = apiKey ? new Resend(apiKey) : null

if (!apiKey && process.env.NODE_ENV !== "production") {
  console.warn(
    "[EMAIL_WARNING] RESEND_API_KEY is not defined in your environment variables. Transactional emails will be simulated in the console."
  )
}

/**
 * Sends a welcome email to newly registered users
 */
export async function sendWelcomeEmail(email: string, name?: string | null) {
  const safeName = name || "Developer"
  const dashboardUrl = `${appUrl}/dashboard`

  if (!resend || !apiKey || apiKey.startsWith("re_123456789")) {
    console.log(
      `[SIMULATED_EMAIL] Welcome email simulated for: ${email} (${safeName}). Dashboard URL: ${dashboardUrl}`
    )
    return { success: true, simulated: true }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Welcome to ZeroToSaaS! 🚀",
      react: React.createElement(WelcomeEmail, {
        name: safeName,
        dashboardUrl,
      }),
    })

    if (error) {
      console.error("[RESEND_WELCOME_EMAIL_ERROR]", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (err) {
    console.error("[SEND_WELCOME_EMAIL_EXCEPTION]", err)
    return { success: false, error: err }
  }
}

/**
 * Sends a confirmation email when a user subscribes to the PRO tier
 */
export async function sendSubscriptionEmail(
  email: string,
  name?: string | null,
  planName = "Pro Plan"
) {
  const safeName = name || "Developer"
  const billingUrl = `${appUrl}/dashboard/billing`

  if (!resend || !apiKey || apiKey.startsWith("re_123456789")) {
    console.log(
      `[SIMULATED_EMAIL] Subscription success email simulated for: ${email} (${safeName}) on ${planName}. Billing URL: ${billingUrl}`
    )
    return { success: true, simulated: true }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Your ${planName} is active! 🎉`,
      react: React.createElement(SubscriptionSuccessEmail, {
        name: safeName,
        planName,
        billingUrl,
      }),
    })

    if (error) {
      console.error("[RESEND_SUBSCRIPTION_EMAIL_ERROR]", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (err) {
    console.error("[SEND_SUBSCRIPTION_EMAIL_EXCEPTION]", err)
    return { success: false, error: err }
  }
}

