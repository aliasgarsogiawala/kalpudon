import type { Metadata } from "next";
import { ELSEWHERE, SITE_URL } from "../_components/data";

// Search and sharing for every page: one canonical address, a share card of the page's own (public/og, made by
// scripts/og-images.py), and the structured data that ties the pages to the man and his companies.

export const NAME = "Kalpesh Kinariwala";
export const DESCRIPTION =
  "Kalpesh Kinariwala is a Dubai-based platform builder across mining chemicals, capital markets, real estate (Pantheon Development) and live entertainment (HOP Events).";

export type ShareImage = "home" | "podcasts" | "press" | "ideas" | "hop" | "real-estate" | "contact";

const ALT: Record<ShareImage, string> = {
  home: "Kalpesh Kinariwala, platform builder",
  podcasts: "Kalpesh Kinariwala on air in the Dubai Eye 103.8 studio",
  press: "Kalpesh Kinariwala on the cover of GTN’s Founders issue",
  ideas: "Kalpesh Kinariwala presenting a Pantheon project",
  hop: "Kalpesh Kinariwala at a HOP Events concert",
  "real-estate": "Kalpesh Kinariwala at a Pantheon Development welcome",
  contact: "Kalpesh Kinariwala",
};

export const shareImage = (image: ShareImage) => ({ url: `/og/${image}.jpg`, width: 1200, height: 630, alt: ALT[image] });

/** Title, description, canonical address and share card for one page. */
export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image: ShareImage;
  type?: "website" | "profile";
}): Metadata {
  // The home page leads with the name; every other page with its own title
  const full = path === "/" ? `${NAME} — ${title}` : `${title} — ${NAME}`;
  return {
    title: path === "/" ? { absolute: full } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type, siteName: NAME, locale: "en_GB", url: path, title: full, description, images: [shareImage(image)] },
    twitter: { card: "summary_large_image", title: full, description, images: [shareImage(image)] },
  };
}

export const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

// The same person every page points to (by @id), so search engines read them as one entity
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const ORGANISATIONS = [
  { name: "Pantheon Group", description: "Mining chemical distribution, founded 2001" },
  { name: "Pantheon Development", description: "Real estate developer, Dubai, since 2016", url: `${SITE_URL}/real-estate` },
  { name: "HOP Events", description: "Live entertainment, UAE", url: `${SITE_URL}/hop` },
];

export const person = (extra: Record<string, unknown> = {}) => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: NAME,
  givenName: "Kalpesh",
  familyName: "Kinariwala",
  url: SITE_URL,
  image: `${SITE_URL}/img/kk-gtn-portrait.jpg`,
  jobTitle: "Founder",
  description: "Dubai-based platform builder across mining chemicals, capital markets, real estate and live entertainment.",
  homeLocation: { "@type": "Place", name: "Dubai, United Arab Emirates" },
  // His companies, each naming him as its founder
  worksFor: ORGANISATIONS.map((o) => ({ "@type": "Organization", ...o, founder: { "@id": PERSON_ID } })),
  knowsAbout: ["Real estate development", "Capital markets", "Hedge funds", "Mining chemicals", "Live entertainment", "Entrepreneurship"],
  sameAs: ELSEWHERE.map((e) => e.href),
  ...extra,
});

/** Home › page, for search results' breadcrumbs. */
export const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: url(t.path) })),
});

/** A page's structured data as one @graph, safe to drop into a script tag. */
export const jsonLd = (...nodes: object[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
