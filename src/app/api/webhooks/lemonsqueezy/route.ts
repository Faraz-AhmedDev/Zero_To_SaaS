import { NextResponse } from "next/server"
import crypto from "crypto"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { subscriptions, users } from "@/lib/db/schema"
import { sendSubscriptionEmail } from "@/lib/mail"


export async function POST(req: Request) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get("x-signature")
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET

    // 1. Signature Verification
    if (secret) {
      if (!signature) {
        console.error("[LEMONSQUEEZY_WEBHOOK_ERROR] Missing x-signature header.")
        return NextResponse.json({ error: "Missing signature header" }, { status: 400 })
      }

      const hmac = crypto.createHmac("sha256", secret)
      const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8")
      const sigBuffer = Buffer.from(signature, "utf8")

      if (
        digest.length !== sigBuffer.length ||
        !crypto.timingSafeEqual(digest, sigBuffer)
      ) {
        console.error("[LEMONSQUEEZY_WEBHOOK_ERROR] Invalid webhook signature.")
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
      }
    } else {
      console.warn(
        "[LEMONSQUEEZY_WEBHOOK_WARNING] LEMONSQUEEZY_WEBHOOK_SECRET is not configured in .env. Skipping signature verification in dev."
      )
    }

    // 2. Parse Webhook Event Body
    const payload = JSON.parse(rawBody)
    const eventName = payload?.meta?.event_name as string
    const customData = payload?.meta?.custom_data || {}
    const data = payload?.data

    if (!eventName || !data) {
      return NextResponse.json({ error: "Invalid event payload" }, { status: 400 })
    }

    const subscriptionId = String(data.id)
    const customerId = String(data.attributes?.customer_id || "")
    const status = (data.attributes?.status || "ACTIVE").toUpperCase()
    const userEmail = (data.attributes?.user_email || "").toLowerCase()
    const userName = data.attributes?.user_name || "Developer"
    const renewsAt = data.attributes?.renews_at || data.attributes?.ends_at
    const currentPeriodEnd = renewsAt ? new Date(renewsAt) : null

    // Determine user ID from custom data or look up by email
    let userId = customData.user_id as string | undefined

    if (!userId && userEmail) {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, userEmail),
      })
      if (existingUser) {
        userId = existingUser.id
      }
    }

    console.log(
      `[LEMONSQUEEZY_WEBHOOK] Received event "${eventName}" for subscription ${subscriptionId} (user: ${userId || "unknown"})`
    )

    // 3. Handle Events
    switch (eventName) {
      case "subscription_created":
      case "subscription_updated": {
        if (!userId) {
          console.warn(
            `[LEMONSQUEEZY_WEBHOOK] Cannot link subscription ${subscriptionId} to a user (no user_id or email match).`
          )
          break
        }

        // Check if an existing subscription row exists for this user
        const existingSub = await db.query.subscriptions.findFirst({
          where: eq(subscriptions.userId, userId),
        })

        if (existingSub) {
          await db
            .update(subscriptions)
            .set({
              subscriptionId,
              customerId,
              plan: "PRO",
              status: status as any,
              currentPeriodEnd,
              updatedAt: new Date(),
            })
            .where(eq(subscriptions.id, existingSub.id))
        } else {
          await db.insert(subscriptions).values({
            userId,
            subscriptionId,
            customerId,
            plan: "PRO",
            status: status as any,
            currentPeriodEnd,
          })
        }

        // On initial creation, dispatch confirmation email
        if (eventName === "subscription_created" && userEmail) {
          sendSubscriptionEmail(userEmail, userName, "Pro Plan").catch((err) => {
            console.error("[SUBSCRIPTION_EMAIL_ERROR]", err)
          })
        }

        break
      }

      case "subscription_cancelled":
      case "subscription_expired": {
        if (subscriptionId) {
          const subRecord = await db.query.subscriptions.findFirst({
            where: eq(subscriptions.subscriptionId, subscriptionId),
          })

          if (subRecord) {
            await db
              .update(subscriptions)
              .set({
                status: (eventName === "subscription_cancelled"
                  ? "CANCELED"
                  : "INACTIVE") as any,
                plan: "FREE",
                updatedAt: new Date(),
              })
              .where(eq(subscriptions.id, subRecord.id))
          }
        }
        break
      }

      default:
        console.log(`[LEMONSQUEEZY_WEBHOOK] Unhandled event: ${eventName}`)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error: any) {
    console.error("[LEMONSQUEEZY_WEBHOOK_HANDLER_EXCEPTION]", error)
    return NextResponse.json(
      { error: error.message || "Webhook processing error" },
      { status: 500 }
    )
  }
}
