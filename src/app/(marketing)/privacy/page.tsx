import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy and data protection practices of ${siteConfig.name}.`,
}

export default function PrivacyPage() {
  const lastUpdated = "October 29, 2026"

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Back to Home
        </Link>
        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            1. Introduction
          </h2>
          <p>
            At <strong className="text-foreground">{siteConfig.name}</strong>, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and protect your information when you access our website, applications, and services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            2. Information We Collect
          </h2>
          <p>We may collect information you provide directly to us:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li>
              <strong className="text-foreground">Account Information:</strong> Name, email address, password hash (for credential signups), and profile picture URL (if signed in via Google or GitHub).
            </li>
            <li>
              <strong className="text-foreground">Billing Information:</strong> Transaction IDs, customer IDs, and subscription statuses. Credit card numbers are handled directly by LemonSqueezy and never stored on our servers.
            </li>
            <li>
              <strong className="text-foreground">Log & Technical Data:</strong> IP address, browser type, device information, and interaction timestamps collected for security and operational purposes.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            3. How We Use Your Information
          </h2>
          <p>We use the collected information solely for:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li>Providing, maintaining, and improving our SaaS boilerplate.</li>
            <li>Processing authentication and authorizing access to your dashboard.</li>
            <li>Sending transactional emails, such as onboarding messages and billing receipts via Resend.</li>
            <li>Preventing fraudulent activities, unauthorized access, and spam.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            4. Third-Party Service Providers
          </h2>
          <p>
            We partner with reliable third-party services that adhere to rigorous privacy and security standards:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><strong className="text-foreground">Authentication:</strong> Auth.js (NextAuth v5) with Google and GitHub OAuth providers.</li>
            <li><strong className="text-foreground">Payment Processor:</strong> LemonSqueezy (Merchant of Record).</li>
            <li><strong className="text-foreground">Email Delivery:</strong> Resend (Transactional emails).</li>
            <li><strong className="text-foreground">Database:</strong> PostgreSQL managed via Drizzle ORM.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            5. Cookies and Session Storage
          </h2>
          <p>
            We use essential HTTP-only session cookies strictly necessary to keep you securely signed in to your account. We do not use intrusive third-party ad-tracking cookies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            6. Data Retention & Deletion
          </h2>
          <p>
            We retain your personal information only as long as your account is active. You may request account deletion at any time, which permanently removes your user profile and database records.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            7. Contact Us
          </h2>
          <p>
            If you have questions or concerns regarding our privacy practices, please contact us on GitHub at{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-4"
            >
              {siteConfig.links.github}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
