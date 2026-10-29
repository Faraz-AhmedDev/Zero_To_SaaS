import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { subscriptions, type Subscription } from "@/lib/db/schema"

export interface UserSubscriptionDetails {
  isPro: boolean
  plan: "FREE" | "PRO"
  status: string
  currentPeriodEnd: Date | null
  subscription: Subscription | null
}

/**
 * Fetches user subscription details from Drizzle ORM and computes active PRO entitlement
 */
export async function getUserSubscription(
  userId?: string | null
): Promise<UserSubscriptionDetails> {
  const defaultFree: UserSubscriptionDetails = {
    isPro: false,
    plan: "FREE",
    status: "ACTIVE",
    currentPeriodEnd: null,
    subscription: null,
  }

  if (!userId) {
    return defaultFree
  }

  // Built-in Demo Admin User fallback (allows testing without local PostgreSQL)
  if (userId === "demo-admin-id") {
    const nextMonth = new Date()
    nextMonth.setDate(nextMonth.getDate() + 30)
    return {
      isPro: true,
      plan: "PRO",
      status: "ACTIVE",
      currentPeriodEnd: nextMonth,
      subscription: {
        id: "demo-sub-id",
        userId: "demo-admin-id",
        status: "ACTIVE",
        plan: "PRO",
        customerId: "demo-cust-id",
        subscriptionId: "demo-sub-12345",
        currentPeriodEnd: nextMonth,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  }

  try {
    const userSub = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, userId),
    })

    if (!userSub) {
      return defaultFree
    }

    const isPlanPro = userSub.plan.toUpperCase() === "PRO"
    const isActiveStatus =
      userSub.status.toUpperCase() === "ACTIVE" ||
      userSub.status.toUpperCase() === "ON_TRIAL"

    const isCurrentPeriodValid =
      !userSub.currentPeriodEnd ||
      userSub.currentPeriodEnd.getTime() > Date.now()

    const isPro = isPlanPro && isActiveStatus && isCurrentPeriodValid

    return {
      isPro,
      plan: isPro ? "PRO" : "FREE",
      status: userSub.status,
      currentPeriodEnd: userSub.currentPeriodEnd,
      subscription: userSub,
    }
  } catch (error) {
    console.error("[GET_USER_SUBSCRIPTION_ERROR]", error)
    return defaultFree
  }
}

