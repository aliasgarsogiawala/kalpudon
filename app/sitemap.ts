import type { MetadataRoute } from "next";
import { SITE_URL } from "./_components/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/ideas", "/press", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/ideas" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
