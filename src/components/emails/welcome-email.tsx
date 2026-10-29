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

interface WelcomeEmailProps {
  name?: string
  dashboardUrl?: string
}

export const WelcomeEmail = ({
  name = "Developer",
  dashboardUrl = "http://localhost:3000/dashboard",
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to ZeroToSaaS - Ship your SaaS in days!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={brand}>ZeroToSaaS</Heading>
          </Section>
          <Section style={content}>
            <Heading style={h1}>Welcome aboard, {name}! 🚀</Heading>
            <Text style={text}>
              Thanks for joining ZeroToSaaS. You now have full access to our
              production-ready Next.js 16 SaaS foundation, complete with Drizzle ORM,
              NextAuth v5 authentication, and automated billing.
            </Text>
            <Text style={text}>
              Your workspace is ready. You can jump directly into your dashboard to create
              your first project, configure database schemas, or review your API settings.
            </Text>
            <Section style={btnContainer}>
              <Button style={button} href={dashboardUrl}>
                Go to Dashboard →
              </Button>
            </Section>
            <Text style={subtext}>
              If the button doesn&apos;t work, copy and paste this link into your browser:
              <br />
              <Link href={dashboardUrl} style={link}>
                {dashboardUrl}
              </Link>
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              ZeroToSaaS • The Open-Source Next.js SaaS Starter
              <br />
              Questions? Reply directly to this email or join our developer community.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail

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

