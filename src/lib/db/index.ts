import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

const connectionString =
  process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/zerotosaas"

// Global singleton pattern to prevent connection pool exhaustion in development hot reloads
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined
}

const client =
  globalForDb.conn ??
  postgres(connectionString, {
    max: process.env.NODE_ENV === "production" ? 10 : 1,
    idle_timeout: 20,
    connect_timeout: 10,
  })

if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = client
}

export const db = drizzle(client, { schema })
