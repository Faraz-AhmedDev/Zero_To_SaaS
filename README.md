<div align="center">

# ⚡ ZeroToSaaS

### The Production-Grade, Open-Source Next.js 16 SaaS Boilerplate

Save 2+ weeks of repetitive scaffolding. Launch your next SaaS startup in hours, not months.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-PostgreSQL-c5f13c?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)
[![Auth.js](https://img.shields.io/badge/Auth.js-NextAuth_v5-purple?style=for-the-badge)](https://authjs.dev/)
[![LemonSqueezy](https://img.shields.io/badge/LemonSqueezy-Subscriptions-yellow?style=for-the-badge)](https://lemonsqueezy.com/)
[![Resend](https://img.shields.io/badge/Resend-Emails-black?style=for-the-badge&logo=resend)](https://resend.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

[Live Demo](http://localhost:3000) · [Report Bug](https://github.com/Faraz-AhmedDev/Zero_To_SaaS/issues/new?template=bug_report.md) · [Request Feature](https://github.com/Faraz-AhmedDev/Zero_To_SaaS/issues/new?template=feature_request.md)

</div>

---

## 💡 Why ZeroToSaaS?

Every time you build a new SaaS product, you waste 40 to 80 hours setting up the same repetitive foundational layers:
- Authentication, OAuth, session management, and route middleware
- Database connection pools, schema definitions, and migrations
- Stripe / LemonSqueezy checkout, customer portal, and webhook listeners
- Email deliverability, React Email templates, and automated onboarding
- Dark/Light mode theme persistence, accessible UI components, and mobile responsiveness
- SEO metadata, OpenGraph cards, sitemaps, and robots.txt

**ZeroToSaaS solves this once and for all.** It brings together the absolute best-in-class modern web stack configured with clean architecture, fault-tolerant local fallbacks, and zero vendor lock-in.

---

## ✨ Features

### 🔐 Authentication & Security (NextAuth v5 / Auth.js)
- **Multi-Provider Support**: Credentials (Email + Password with `bcryptjs`), Google OAuth, and GitHub OAuth.
- **Edge-Compatible Middleware**: Bulletproof route protection for `/dashboard/*` with smart redirects.
- **Role-Based Access Control**: Built-in `USER` and `ADMIN` roles accessible on both server and client sessions.
- **Persistent Sessions**: Fast JWT strategy integrated with Drizzle ORM adapter.

### 🗄️ Database & ORM (PostgreSQL + Drizzle ORM)
- **Type-Safe Schema**: Fully typed `users`, `accounts`, `sessions`, and `subscriptions` tables.
- **Connection Resiliency**: Global connection pooling with automatic local Docker support.
- **Instant Migrations & Studio**: Run `npm run db:push` to sync schemas and `npm run db:studio` for visual inspection.

### 💳 Payments & Subscriptions (LemonSqueezy)
- **Self-Serve Checkout**: Dynamic variant generation with user metadata and pre-filled billing details.
- **Customer Billing Portal**: Lets users manage credit cards, cancel, or switch plans effortlessly.
- **Timing-Safe Webhooks**: Verified HMAC SHA-256 signatures for `subscription_created`, `subscription_updated`, and `subscription_cancelled`.

### ✉️ Transactional Emails (Resend + React Email)
- **Beautiful Email Templates**: Built with `@react-email/components` for onboarding and upgrade receipts.
- **Fault-Tolerant Engine**: Automatically logs friendly notices to the terminal in local dev if API keys are omitted.
- **Non-Blocking Execution**: Asynchronous email delivery so signups and webhooks remain lightning fast.

### 🎨 Design System & UI/UX (Tailwind v4 + shadcn/ui)
- **Modern Component Primitives**: Accessible UI with Buttons, Cards, Dialogs, Dropdowns, Sheets, and Badges.
- **Instant Dark/Light Mode**: Smooth theme toggling via `next-themes` with zero layout shift.
- **Full Mobile Responsiveness**: Desktop collapsible sidebar and mobile touch drawer.
- **Toast Notifications**: Interactive toast alerts powered by `sonner`.

### 🔍 Production Polish & SEO
- **Search Engine Ready**: Dynamic OpenGraph, Twitter Cards, robots.txt, and sitemap.xml.
- **Resilient Error Handling**: Custom animated 404 page and root error boundary with recovery action.
- **Legal Compliance**: Pre-built Terms of Service and Privacy Policy pages.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|:---|:---|:---|
| **Core Framework** | [Next.js 16.4.2](https://nextjs.org/) | App Router, Server Components, Turbopack, Partial Prerendering |
| **Frontend UI** | [React 19](https://react.dev/) | High-performance component runtime |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict static type checking |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-generation utility-first CSS |
| **Component Library** | [shadcn/ui](https://ui.shadcn.com/) | Accessible, customizable UI primitives |
| **Database ORM** | [Drizzle ORM](https://orm.drizzle.team/) | Lightweight, type-safe SQL toolkit |
| **Database Driver** | [Postgres.js](https://github.com/porsager/postgres) | Fastest PostgreSQL client for Node.js |
| **Authentication** | [Auth.js (NextAuth v5)](https://authjs.dev/) | Edge-ready authentication and sessions |
| **Billing & Payments** | [LemonSqueezy SDK](https://lemonsqueezy.com/) | Global payments, tax, and subscription management |
| **Email Service** | [Resend](https://resend.com/) + [React Email](https://react.email/) | Modern transactional email delivery |
| **Validation** | [Zod](https://zod.dev/) | Type-safe schema validation |

---

## 📁 Architecture & Folder Structure

```text
zero-to-saas/
├── .github/                        # GitHub issue templates & community guidelines
├── drizzle/                        # Generated SQL database migrations
├── public/                         # Static assets & public images
├── src/
│   ├── actions/                    # Server Actions
│   │   ├── auth.ts                 # Registration, login, and profile updates
│   │   └── payments.ts             # LemonSqueezy checkout & customer portal actions
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Public Auth routes (/login, /register)
│   │   ├── (dashboard)/            # Protected application shell
│   │   │   ├── dashboard/          # Metric overview & project management
│   │   │   │   ├── billing/        # Live subscription management & invoices
│   │   │   │   └── settings/       # User profile & credentials settings
│   │   ├── (marketing)/            # Public marketing pages
│   │   │   ├── page.tsx            # High-converting landing page
│   │   │   ├── pricing/            # Interactive pricing table & tier selection
│   │   │   ├── privacy/            # Privacy Policy
│   │   │   └── terms/              # Terms of Service
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/ # Auth.js API route handler
│   │   │   └── webhooks/           # LemonSqueezy subscription webhook handler
│   │   ├── error.tsx               # Global application error boundary
│   │   ├── not-found.tsx           # Custom 404 page
│   │   ├── robots.ts               # Dynamic robots.txt
│   │   ├── sitemap.ts              # Dynamic sitemap.xml
│   │   ├── globals.css             # Tailwind CSS v4 design tokens
│   │   └── layout.tsx              # Root HTML layout with ThemeProvider & Sonner
│   ├── components/
│   │   ├── dashboard/              # Dashboard overview & billing components
│   │   ├── emails/                 # React Email templates (Welcome, Pro Upgrade)
│   │   ├── shared/                 # Navbar, Footer, Sidebar, UserNav, ThemeToggle
│   │   ├── ui/                     # shadcn/ui components (Button, Card, Dialog, etc.)
│   │   └── theme-provider.tsx      # Next-themes dark/light context
│   ├── config/
│   │   └── site.ts                 # Central site metadata, pricing plans, and nav links
│   ├── lib/
│   │   ├── auth/                   # NextAuth v5 configuration, adapter, and callbacks
│   │   ├── db/                     # Drizzle connection singleton, schema, and queries
│   │   ├── mail/                   # Fault-tolerant Resend email client & helpers
│   │   ├── payments/               # LemonSqueezy client & checkout builders
│   │   └── validations/            # Zod input validation schemas
│   ├── middleware.ts               # Edge-compatible route guard
│   └── types/                      # NextAuth session & user type extensions
├── .env.example                    # Comprehensive environment template
├── docker-compose.yml              # Local PostgreSQL 16 container definition
├── drizzle.config.ts               # Drizzle Kit configuration
└── package.json
```

---

## 🚀 5-Step Quick Start Guide

### Step 1: Clone Repository & Install Dependencies
```bash
git clone https://github.com/Faraz-AhmedDev/Zero_To_SaaS.git
cd Zero_To_SaaS
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to create your local `.env` file:
```bash
cp .env.example .env
```
*(Sensible defaults are already configured so you can develop locally right away).*

### Step 3: Start PostgreSQL & Push Database Schema
Start a local PostgreSQL container using Docker:
```bash
docker compose up -d
```
Push the Drizzle ORM schema to your database:
```bash
npm run db:push
```

### Step 4: Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser!

### Step 5: (Optional) Local Webhook Testing with LemonSqueezy
To test webhook events locally, install the LemonSqueezy or Ngrok tunnel CLI:
```bash
# Example with ngrok
ngrok http 3000

# Set Webhook URL in LemonSqueezy Dashboard to:
# https://<your-tunnel-url>/api/webhooks/lemonsqueezy
```

---

## 🔑 Demo Account Credentials

For instant testing without entering OAuth credentials:
- **Email:** `demo@zerotosaas.dev`
- **Password:** `Password123!`
- **Role:** `ADMIN`

*(Or click the **Auto Fill** button directly on the `/login` page).*

---

## 📜 Available NPM Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Starts local Next.js development server with Turbopack |
| `npm run build` | Compiles optimized production build with Partial Prerendering (PPR) |
| `npm run start` | Starts the Next.js production server |
| `npm run db:generate` | Generates SQL migrations from schema |
| `npm run db:push` | Directly synchronizes schema with PostgreSQL |
| `npm run db:studio` | Launches visual Drizzle Studio database explorer |
| `npm run lint` | Runs ESLint analysis across the project |

---

## 🤝 Contributing

Contributions make the open-source community thrive! Whether reporting a bug, proposing an improvement, or submitting a feature PR:
1. Review our [Contributing Guidelines](CONTRIBUTING.md).
2. Fork the repository and create a feature branch (`git checkout -b feat/amazing-feature`).
3. Commit your changes (`git commit -m 'feat: add amazing feature'`).
4. Push to your branch (`git push origin feat/amazing-feature`).
5. Open a **Pull Request**.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for complete details.

---

<div align="center">

**If you find ZeroToSaaS helpful, please consider giving it a ⭐ on [GitHub](https://github.com/Faraz-AhmedDev/Zero_To_SaaS)!**

Built with ❤️ by [Faraz Ahmed](https://github.com/Faraz-AhmedDev)

</div>
