import type { MetadataRoute } from "next";
import { DOORS, SITE_URL } from "./_components/data";
import { getContent, published } from "./_lib/content";

// Every public page. Pages the CMS feeds carry the time of the last save; the rest change only with a deploy.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const saved = content.savedAt ? new Date(content.savedAt) : undefined;
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly", lastModified?: Date | string) => ({
    url: `${SITE_URL}${path}`,
    ...(lastModified && { lastModified }),
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly", saved),
    page("/hop", 0.8, "monthly"),
    page("/real-estate", 0.8, "monthly"),
    page("/ideas", 0.8, "weekly", saved),
    page("/podcasts", 0.8, "weekly", saved),
    page("/press", 0.8, "monthly", saved),
    page("/contact", 0.6, "monthly"),
    // Each audience door that has a page of its own (press opens the press page)
    ...DOORS.filter((d) => !d.href).map((d) => page(`/contact/${d.slug}`, 0.5, "monthly")),
    // Every published piece in the Ideas hub
    ...published(content.ideas).map((i) => page(`/ideas/${i.slug}`, 0.7, "monthly", i.date)),
  ];
}
