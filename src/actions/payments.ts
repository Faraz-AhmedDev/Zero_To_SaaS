"use server"

import { auth } from "@/lib/auth"
import { createCheckoutUrl, getCustomerPortalUrl } from "@/lib/payments/lemonsqueezy"
import { getUserSubscription } from "@/lib/db/queries"

export interface PaymentActionResult {
  success?: boolean
  error?: string
  url?: string
  redirect?: string
}

/**
 * Server action to initiate LemonSqueezy checkout for the logged in user
 */
export async function createCheckoutSession(
  variantId?: string
): Promise<PaymentActionResult> {
  try {
    const session = await auth()

    if (!session?.user?.id || !session?.user?.email) {
      return {
        error: "Please sign in to upgrade to the Pro plan.",
        redirect: "/login",
      }
    }

    const targetVariantId =
      variantId ||
      process.env.NEXT_PUBLIC_LS_PRO_MONTHLY_VARIANT_ID ||
      "demo-monthly-variant-id"

    const result = await createCheckoutUrl(
      session.user.id,
      session.user.email,
      targetVariantId
    )

    if (result.error || !result.url) {
      return {
        error: result.error || "Failed to generate checkout URL.",
      }
    }

    return {
      success: true,
      url: result.url,
    }
  } catch (error: any) {
    console.error("[CREATE_CHECKOUT_SESSION_ACTION_ERROR]", error)
    return {
      error: error.message || "An unexpected error occurred during checkout initialization.",
    }
  }
}

/**
 * Server action to retrieve the LemonSqueezy customer billing portal URL
 */
export async function openCustomerPortal(): Promise<PaymentActionResult> {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        error: "Please sign in to manage your billing settings.",
        redirect: "/login",
      }
    }

    const subDetails = await getUserSubscription(session.user.id)

    // For demo administrator or users without real LemonSqueezy subscription
    if (!subDetails.subscription?.subscriptionId || session.user.id === "demo-admin-id") {
      return {
        success: true,
        url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing?portal=demo`,
      }
    }

    const result = await getCustomerPortalUrl(subDetails.subscription.subscriptionId)

    if (result.error || !result.url) {
      return {
        error: result.error || "Failed to open billing portal.",
      }
    }

    return {
      success: true,
      url: result.url,
    }
  } catch (error: any) {
    console.error("[OPEN_CUSTOMER_PORTAL_ACTION_ERROR]", error)
    return {
      error: error.message || "Failed to open customer billing portal.",
    }
  }
}

