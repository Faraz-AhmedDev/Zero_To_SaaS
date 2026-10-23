# 🚀 ZeroToSaaS

> The modern, open-source Next.js 16 SaaS boilerplate. Everything you need to build, launch, and scale your SaaS in record time.

![ZeroToSaaS Banner](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80)

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-PostgreSQL-c5f13c?style=flat&logo=drizzle)](https://orm.drizzle.team/)
[![Auth.js](https://img.shields.io/badge/Auth.js-NextAuth_v5-purple?style=flat)](https://authjs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- ⚡ **Next.js 16 App Router & Turbopack**: Built with React 19 Server Components, Partial Prerendering (PPR), and Cache Components.
- 🎨 **Tailwind CSS v4 & shadcn/ui**: Modern design system using base-nova style with high contrast, crisp typography, and responsive layouts.
- 🌓 **Dark / Light Mode**: Instant theme switching powered by `next-themes` and a custom `ThemeToggle` dropdown.
- 🔐 **NextAuth v5 (Auth.js) & JWT**: Credentials login, OAuth providers (Google & GitHub), secure bcrypt password hashing, and role-based permissions (`USER` / `ADMIN`).
- 🛡️ **Edge-Compatible Route Protection**: Next.js middleware protecting `/dashboard/*` while keeping marketing and authentication endpoints accessible.
- 🗄️ **Drizzle ORM & PostgreSQL**: Type-safe relational schema with singleton connection pooling, automatic migrations, and `drizzle-kit` studio support.
- 📊 **Interactive Dashboard Shell**: Collapsible desktop sidebar, mobile drawer sheet, metric analytics cards, and empty state project creation modals.
- 💳 **Billing & Pricing Ready**: Monthly/annual pricing toggles, usage limits visualization, payment method cards, and invoice history table.
- 🔔 **Toast Feedback**: Interactive user notifications with `sonner`.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) |
| **UI Library** | [React 19](https://react.dev) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Authentication** | [Auth.js / NextAuth v5](https://authjs.dev) |
| **Database ORM** | [Drizzle ORM](https://orm.drizzle.team) |
| **Database Client** | [Postgres.js](https://github.com/porsager/postgres) (PostgreSQL 16) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com), [Zod](https://zod.dev) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski) |

---

## 📁 Project Structure

```text
zero-to-saas/
├── drizzle/                    # Generated SQL migration files
├── public/                     # Static assets & public images
├── src/
│   ├── actions/                # Server Actions (auth, profile)
│   ├── app/
│   │   ├── (auth)/             # Auth route group (login, register)
│   │   ├── (dashboard)/        # Protected dashboard shell & settings
│   │   ├── (marketing)/        # Landing page & pricing
│   │   ├── api/auth/           # NextAuth route handlers
│   │   ├── globals.css         # Tailwind v4 styles & design tokens
│   │   └── layout.tsx          # Root layout with ThemeProvider & Toaster
│   ├── components/
│   │   ├── dashboard/          # Dashboard interactive components
│   │   ├── shared/             # Navbar, Footer, Sidebar, UserNav, ThemeToggle
│   │   ├── ui/                 # shadcn/ui accessible primitives
│   │   └── theme-provider.tsx  # next-themes client wrapper
│   ├── config/
│   │   └── site.ts             # Global site metadata, nav links, pricing tiers
│   ├── lib/
│   │   ├── auth/               # NextAuth v5 configuration & callbacks
│   │   ├── db/                 # Drizzle ORM client & PostgreSQL schema
│   │   └── validations/        # Zod form validation schemas
│   ├── middleware.ts           # Route protection middleware
│   └── types/                  # NextAuth module augmentation
├── docker-compose.yml          # Local PostgreSQL container definition
├── drizzle.config.ts           # Drizzle Kit migration configuration
└── package.json
```

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Faraz-AhmedDev/Zero_To_SaaS.git
cd Zero_To_SaaS
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Setup environment variables
Copy the example environment configuration:
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/zerotosaas"
AUTH_SECRET="your-super-secret-key-at-least-32-chars"
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. (Optional) Run Local PostgreSQL with Docker
```bash
docker compose up -d
```

### 5. Generate and push Database Schema
```bash
npm run db:generate
npm run db:push
```

### 6. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Login Credentials

For quick testing without a database setup, use the built-in demo administrator account:

- **Email:** `demo@zerotosaas.dev`
- **Password:** `Password123!`
- **Role:** `ADMIN`

Click **Auto Fill** on the `/login` page to sign in instantly.

---

## 📜 Available Scripts

- `npm run dev` - Launch development server with Turbopack
- `npm run build` - Create an optimized production build
- `npm run start` - Start production server
- `npm run db:generate` - Generate SQL migrations from schema
- `npm run db:push` - Push schema directly to database
- `npm run db:studio` - Open Drizzle Studio visual database inspector

---

## 📄 License

Open source under the [MIT License](LICENSE).
