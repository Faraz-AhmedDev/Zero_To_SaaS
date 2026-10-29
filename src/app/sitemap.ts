import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zerotosaas.dev"

  const routes = [
    "",
    "/pricing",
    "/login",
    "/register",
    "/terms",
    "/privacy",
  ]

  return routes.map((route) => ({
    url: `${appUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "" || route === "/pricing"
        ? ("daily" as const)
        : ("monthly" as const),
    priority: route === "" ? 1 : route === "/pricing" ? 0.8 : 0.5,
  }))
}
