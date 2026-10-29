import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms and conditions for using ${siteConfig.name}.`,
}

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using <strong className="text-foreground">{siteConfig.name}</strong> (&quot;the Service&quot;),
            you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            2. Open-Source Software & License
          </h2>
          <p>
            The source code of {siteConfig.name} is distributed under the{" "}
            <strong className="text-foreground">MIT License</strong>. You are permitted to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software subject to the conditions of the MIT license agreement included in the repository.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            3. User Accounts & Responsibilities
          </h2>
          <p>
            When you create an account, you must provide accurate and complete information. You are solely responsible for maintaining the confidentiality of your account credentials, including OAuth tokens and passwords, and for all activities that occur under your account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            4. Subscriptions, Payments & Cancellations
          </h2>
          <p>
            Certain parts of the Service may be offered on a paid subscription basis (&quot;Pro Plan&quot;). Payments are securely processed through our merchant of record, LemonSqueezy.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li>Billing cycles are charged in advance on a recurring monthly or annual basis.</li>
            <li>You may cancel your subscription at any time via the billing customer portal in your dashboard.</li>
            <li>Upon cancellation, your Pro plan access will remain active until the end of your current paid billing period.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            5. Acceptable Use Policy
          </h2>
          <p>
            You agree not to use the Service for any unlawful purpose, to distribute malicious software, to attempt unauthorized access to other systems, or to disrupt or overload our infrastructure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            6. Limitation of Liability
          </h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, {siteConfig.name.toUpperCase()} AND ITS MAINTAINERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES RESULTING FROM YOUR ACCESS TO OR USE OF THE SERVICE.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            7. Changes to Terms
          </h2>
          <p>
            We reserve the right to revise or modify these Terms at any time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            8. Contact Information
          </h2>
          <p>
            If you have questions about these Terms, please contact us via GitHub issues at{" "}
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
