import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

interface SubscriptionSuccessEmailProps {
  name?: string
  planName?: string
  billingUrl?: string
}

export const SubscriptionSuccessEmail = ({
  name = "Developer",
  planName = "Pro Plan",
  billingUrl = "http://localhost:3000/dashboard/billing",
}: SubscriptionSuccessEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your {planName} subscription is active! ⚡</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={brand}>ZeroToSaaS</Heading>
          </Section>
          <Section style={content}>
            <Heading style={h1}>You&apos;re now on {planName}! 🎉</Heading>
            <Text style={text}>
              Hi {name}, thank you for upgrading! Your subscription payment was
              successfully processed. All premium capabilities and increased limits
              are now unlocked on your workspace.
            </Text>
            <Section style={card}>
              <Text style={cardTitle}>⚡ Unlocked Pro Benefits:</Text>
              <Text style={cardItem}>✓ Unlimited active projects & workspaces</Text>
              <Text style={cardItem}>✓ 100k API requests / month high-throughput</Text>
              <Text style={cardItem}>✓ Up to 10 team member seats</Text>
              <Text style={cardItem}>✓ Priority 24/7 developer email support</Text>
              <Text style={cardItem}>✓ Custom domains & audit logs</Text>
            </Section>
            <Section style={btnContainer}>
              <Button style={button} href={billingUrl}>
                View Billing & Invoices →
              </Button>
            </Section>
            <Text style={subtext}>
              You can manage your subscription, download receipts, or update payment
              methods at any time from your billing portal:
              <br />
              <Link href={billingUrl} style={link}>
                {billingUrl}
              </Link>
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              ZeroToSaaS • Billed via LemonSqueezy Merchant of Record
              <br />
              If you have any questions or feedback, simply reply to this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default SubscriptionSuccessEmail

// Styles
const main: React.CSSProperties = {
  backgroundColor: "#09090b",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  padding: "40px 0",
}

const container: React.CSSProperties = {
  margin: "0 auto",
  maxWidth: "560px",
  backgroundColor: "#18181b",
  borderRadius: "12px",
  border: "1px solid #27272a",
  overflow: "hidden",
}

const header: React.CSSProperties = {
  padding: "28px 32px 20px",
  borderBottom: "1px solid #27272a",
}

const brand: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#fafafa",
  margin: 0,
  letterSpacing: "-0.5px",
}

const content: React.CSSProperties = {
  padding: "32px",
}

const h1: React.CSSProperties = {
  color: "#fafafa",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 16px",
  letterSpacing: "-0.3px",
}

const text: React.CSSProperties = {
  color: "#a1a1aa",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 16px",
}

const card: React.CSSProperties = {
  backgroundColor: "#27272a",
  borderRadius: "8px",
  padding: "16px 20px",
  margin: "20px 0",
}

const cardTitle: React.CSSProperties = {
  color: "#fafafa",
  fontSize: "13px",
  fontWeight: "600",
  margin: "0 0 8px",
}

const cardItem: React.CSSProperties = {
  color: "#d4d4d8",
  fontSize: "13px",
  lineHeight: "22px",
  margin: 0,
}

const btnContainer: React.CSSProperties = {
  margin: "24px 0",
}

const button: React.CSSProperties = {
  backgroundColor: "#fafafa",
  color: "#09090b",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center",
  display: "inline-block",
  padding: "12px 24px",
}

const subtext: React.CSSProperties = {
  color: "#71717a",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "16px 0",
}

const link: React.CSSProperties = {
  color: "#38bdf8",
  textDecoration: "underline",
}

const hr: React.CSSProperties = {
  borderColor: "#27272a",
  margin: "28px 0 20px",
}

const footer: React.CSSProperties = {
  color: "#71717a",
  fontSize: "12px",
  lineHeight: "18px",
  margin: 0,
}

