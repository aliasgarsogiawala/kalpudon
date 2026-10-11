import type { MetadataRoute } from "next";
import { SITE_URL } from "./_components/data";

// Everything public is open to search; the team's admin is not.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
