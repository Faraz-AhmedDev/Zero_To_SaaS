import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/config/site"
import { Toaster } from "sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zerotosaas.dev"

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: `${siteConfig.name} - Open-Source Next.js SaaS Boilerplate`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "Next.js 16",
    "React 19",
    "Tailwind CSS",
    "shadcn/ui",
    "Drizzle ORM",
    "PostgreSQL",
    "NextAuth v5",
    "Auth.js",
    "LemonSqueezy",
    "Resend",
    "SaaS Boilerplate",
    "TypeScript",
    "ZeroToSaaS",
  ],
  authors: [{ name: "Faraz Ahmed", url: "https://github.com/Faraz-AhmedDev" }],
  creator: "Faraz Ahmed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: appUrl,
    title: `${siteConfig.name} - Open-Source Next.js SaaS Boilerplate`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Production SaaS Boilerplate`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Open-Source Next.js SaaS Boilerplate`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@ZeroToSaaS",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
