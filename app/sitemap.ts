import type { MetadataRoute } from "next";
import { SITE_URL } from "./_components/data";
import { getContent, published } from "./_lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = ["", "/hop", "/real-estate", "/ideas", "/press", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/ideas" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
  // Every published piece in the Ideas hub
  const ideas = published((await getContent()).ideas).map((i) => ({
    url: `${SITE_URL}/ideas/${i.slug}`,
    lastModified: i.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...pages, ...ideas];
}
