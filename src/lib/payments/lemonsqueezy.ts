import {
  lemonSqueezySetup,
  createCheckout,
  getSubscription,
} from "@lemonsqueezy/lemonsqueezy.js"

const apiKey = process.env.LEMONSQUEEZY_API_KEY
const storeId = process.env.LEMONSQUEEZY_STORE_ID
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

let isConfigured = false

export function configureLemonSqueezy() {
  if (apiKey && !isConfigured) {
    lemonSqueezySetup({
      apiKey,
      onError(error) {
        console.error("[LEMONSQUEEZY_ERROR]", error)
      },
    })
    isConfigured = true
  }
}

/**
 * Creates a LemonSqueezy checkout URL for a specific user and plan variant
 */
export async function createCheckoutUrl(
  userId: string,
  userEmail: string,
  variantId: string
): Promise<{ url?: string; error?: string }> {
  if (!apiKey || !storeId) {
    console.warn(
      "[LEMONSQUEEZY_CONFIG_MISSING] LEMONSQUEEZY_API_KEY or LEMONSQUEEZY_STORE_ID is not configured in .env. Falling back to simulated checkout."
    )
    return {
      url: `${appUrl}/dashboard/billing?mock_checkout=success&plan=pro`,
    }
  }

  configureLemonSqueezy()

  try {
    const checkout = await createCheckout(storeId, variantId, {
      checkoutData: {
        email: userEmail,
        custom: {
          user_id: userId,
        },
      },
      productOptions: {
        redirectUrl: `${appUrl}/dashboard/billing?checkout=success`,
        receiptButtonText: "Return to Dashboard",
        receiptThankYouNote: "Thank you for upgrading to ZeroToSaaS Pro!",
      },
    })

    if (checkout.error) {
      console.error("[LEMONSQUEEZY_CREATE_CHECKOUT_ERROR]", checkout.error)
      return { error: checkout.error.message }
    }

    const checkoutUrl = checkout.data?.data.attributes.url
    if (!checkoutUrl) {
      return { error: "Failed to retrieve checkout URL from LemonSqueezy." }
    }

    return { url: checkoutUrl }
  } catch (err: any) {
    console.error("[LEMONSQUEEZY_CHECKOUT_EXCEPTION]", err)
    return { error: err.message || "Failed to generate checkout session." }
  }
}

/**
 * Retrieves the pre-signed LemonSqueezy customer portal URL for a subscription
 */
export async function getCustomerPortalUrl(
  subscriptionId: string
): Promise<{ url?: string; error?: string }> {
  if (!apiKey) {
    console.warn(
      "[LEMONSQUEEZY_CONFIG_MISSING] LEMONSQUEEZY_API_KEY missing for customer portal."
    )
    return { url: `${appUrl}/dashboard/billing` }
  }

  configureLemonSqueezy()

  try {
    const subscription = await getSubscription(subscriptionId)

    if (subscription.error) {
      console.error("[LEMONSQUEEZY_GET_SUBSCRIPTION_ERROR]", subscription.error)
      return { error: subscription.error.message }
    }

    const portalUrl = subscription.data?.data.attributes.urls?.customer_portal
    if (!portalUrl) {
      return { error: "Customer portal URL is not available for this subscription." }
    }

    return { url: portalUrl }
  } catch (err: any) {
    console.error("[LEMONSQUEEZY_PORTAL_EXCEPTION]", err)
    return { error: err.message || "Failed to retrieve billing portal URL." }
  }
}

