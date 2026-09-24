// Facts are drawn from public profiles (Entrepreneur Middle East, Forbes Middle East, Gulf News,
// HOP Events press, May 2026). Brief §10: every figure needs sign-off against the client's approved
// claims sheet before launch. Anything marked TODO still needs confirmation from the client.

export const SITE_URL = "https://kalpeshkinariwala.com"; // TODO: confirm the production domain

// Primary navigation: two stops in the home story, then the two pages people come looking for.
// Contact is not a link here — it opens the five audience doors from the header itself.
export const NAV = [
  { href: "/#proof", id: "proof", label: "The work" },
  { href: "/#hop", id: "hop", label: "HOP" },
  { href: "/ideas", label: "Ideas" },
  { href: "/press", label: "Press" },
] as const;

export const MOVES = [
  {
    title: "Find the fragmentation",
    body: "Look for markets where supply, trust or talent is scattered across too many small hands. That scatter is where a platform earns its right to exist.",
  },
  {
    title: "Engineer the downside",
    body: "Decide what the worst case costs — and build the structure that survives it — before anyone is allowed to talk about the upside.",
  },
  {
    title: "Let scale follow",
    body: "When the pieces connect and the floor holds, growth stops needing to be forced. Scale becomes a consequence, not a campaign.",
  },
] as const;

export type Chapter = {
  n: string;
  word: string;
  sector: string;
  since: string;
  entity: string;
  headline: string;
  proof: string;
  moves: [string, string, string];
  img: string;
  alt: string;
  surface: "violet" | "gold" | "bone" | "stage";
};

export const CHAPTERS: Chapter[] = [
  {
    n: "I",
    word: "Supply",
    sector: "Specialty chemistry — Iodine",
    since: "2001",
    entity: "Pantheon Group",
    headline: "A hundred square feet and two thousand borrowed dollars.",
    proof: "By 2008, the world’s leading distributor of iodine.",
    moves: [
      "Producers, traders and industrial buyers — a global chain with no centre.",
      "Contract and inventory discipline, so no single shipment could sink the book.",
      "Seven years from a borrowed desk to the top of a global market.",
    ],
    img: "/img/iodine-crystals.jpg",
    alt: "Macro photograph of dark metallic crystals",
    surface: "violet",
  },
  {
    n: "II",
    word: "Capital",
    sector: "Private capital & funds",
    since: "Ongoing",
    entity: "Private mandates", // TODO: confirm fund names and dates with client
    headline: "Returns are an output. The floor is the only thing you control.",
    proof: "Every mandate sized from the loss it can survive — not the story it can sell.",
    moves: [
      "Mid-market opportunities left between institutional cheques.",
      "Downside-first structuring: the floor is agreed before the ceiling is discussed.",
      "A repeatable allocation logic that compounds trust with each cycle.",
    ],
    img: "/img/gold-leaf.jpg",
    alt: "Creased gold leaf catching the light",
    surface: "gold",
  },
  {
    n: "III",
    word: "Ground",
    sector: "Asset development — Real estate",
    since: "2016",
    entity: "Pantheon Development, Dubai",
    headline: "Affordable luxury, delivered — on schedule, at scale.",
    proof: "1,000+ homes handed over in Jumeirah Village Circle. The market calls him “the Delivery Man of JVC”.",
    moves: [
      "A gap between luxury pricing and what Dubai’s middle actually needed.",
      "Payment plans and phasing built so buyers — and the balance sheet — were never over-exposed.",
      "Elysee, Elysee Heights, VOXA, and the first private project in RAK Central.",
    ],
    img: "/img/dubai-twilight.jpg",
    alt: "Dubai skyline at twilight",
    surface: "bone",
  },
  {
    n: "IV",
    word: "Stage",
    sector: "Live entertainment — HOP",
    since: "Now",
    entity: "HOP Events, UAE",
    headline: "India’s leading artists, produced at arena scale.",
    proof: "A sold-out Etihad Arena with Arijit Singh and A.R. Rahman.",
    moves: [
      "Artists, promoters, venues and a vast diaspora audience — rarely in the same room.",
      "Productions underwritten with the same discipline as every chapter before.",
      "Scaling across the GCC and into South Asian diaspora hubs worldwide.",
    ],
    img: "/img/arena-violet.jpg",
    alt: "Arena crowd under violet stage lights",
    surface: "stage",
  },
];

// Brief §5.4: Pantheon today, with live events leading.
export const PANTHEON_NOW = [
  { name: "HOP", what: "Live entertainment", lead: true },
  { name: "Art", what: "" }, // TODO: one-line descriptions for Art and Culture from the client
  { name: "Culture", what: "" },
  { name: "Real Estate", what: "Pantheon Development" },
];

export const HOP_FACTS = [
  { k: "Sold out", v: "Etihad Arena, Abu Dhabi", d: "Arijit Singh · A.R. Rahman · Rishab Sharma" },
  { k: "Anchor sponsor", v: "Shows of India 2026", d: "India’s live-entertainment industry conclave, Delhi" },
  { k: "GCC → World", v: "Diaspora circuit", d: "Scaling from the UAE into South Asian diaspora hubs" },
];

// Placeholder stills until the brand shoot's event footage arrives (brief §9).
export const PRODUCTIONS = [
  { img: "/img/stage-gold.jpg", t: "Arena nights", w: "wide" },
  { img: "/img/mic-smoke.jpg", t: "Intimate sets", w: "tall" },
  { img: "/img/festival-violet.jpg", t: "Festival stages", w: "wide" },
  { img: "/img/confetti.jpg", t: "Finales", w: "tall" },
  { img: "/img/stage-amber.jpg", t: "Headline tours", w: "wide" },
  { img: "/img/stage-burst.jpg", t: "Open-air", w: "wide" },
] as const;

// Brief §6: categories map to his pillars.
export const PILLARS = ["The Widest", "Manage Risk", "Platform Thinking", "Life & Lessons", "Building People"] as const;
export type Pillar = (typeof PILLARS)[number];

// Content model for the hub: title, format (article or video), category, date. Entries stay in
// preparation (date: null) until the client supplies the pieces. TODO: move to the team's CMS.
export type Piece = {
  slug: string;
  n: string;
  title: string;
  format: "Article" | "Video";
  category: Pillar;
  date: string | null;
  dek: string;
  img: string;
};

export const IDEAS: Piece[] = [
  {
    slug: "manage-risk-not-returns",
    n: "01",
    title: "Manage Risk, Not Returns",
    format: "Article",
    category: "Manage Risk",
    date: null,
    dek: "Returns are an output. The only lever you actually hold is how much you can afford to lose — and how early you decide it.",
    img: "/img/molten-gold.jpg",
  },
  {
    slug: "inspect-what-you-expect",
    n: "02",
    title: "Inspect What You Expect",
    format: "Article",
    category: "Building People",
    date: null,
    dek: "Trust scales when it is checked. Why inspection belongs on the calendar, not in the crisis.",
    img: "/img/lab.jpg",
  },
  {
    slug: "the-widest-not-the-tallest",
    n: "03",
    title: "The Widest, Not the Tallest",
    format: "Video",
    category: "The Widest",
    date: null,
    dek: "Height is fragile — one market, one cycle, one point of failure. Width is a platform that survives any single storm.",
    img: "/img/tower.jpg",
  },
];

// Ordered so real estate reads as one proof point, never the headline (brief §2).
export const RECOGNITION = [
  { who: "Entrepreneur Middle East", what: "The 100 NRIs", y: "2026" },
  { who: "Shows of India", what: "Anchor sponsor, HOP Events", y: "2026" },
  { who: "Forbes Middle East", what: "Most Impactful Real Estate Leaders", y: "2026" },
  { who: "The Ultimate Realty Awards", what: "Developer of the Year — Affordable Luxury", y: "2025" },
  { who: "UAE Government", what: "Golden Visa", y: "2021" },
];

// Brief §5.7: capital, partner with HOP, careers, press, contact.
export type Door = {
  n: string;
  slug: string;
  desk: string;
  title: string;
  label: string;
  who: string;
  body: string;
  offers: string[];
  cta: string;
  field: string;
  img: string;
  page?: { href: string; label: string };
};

export const DOORS: Door[] = [
  {
    n: "01",
    slug: "capital",
    desk: "capital",
    title: "Capital",
    label: "Capital",
    who: "Investors & family offices",
    body: "Track record, allocation approach and co-investment conversations across the platforms.",
    offers: ["Track record summary", "Allocation approach", "Co-investment briefing"],
    cta: "Request a briefing",
    field: "Fund / institution",
    img: "/img/door-capital.jpg",
  },
  {
    n: "02",
    slug: "hop",
    desk: "HOP partnership",
    title: "Partner",
    label: "Partner with HOP",
    who: "Artists, promoters & venues",
    body: "Co-productions, tours and venue partnerships with HOP — from a single night to a full circuit.",
    offers: ["Co-productions", "Touring", "Venue partnerships"],
    cta: "Start a conversation",
    field: "Artist / company / venue",
    img: "/img/stage-amber.jpg",
  },
  {
    n: "03",
    slug: "careers",
    desk: "careers",
    title: "Careers",
    label: "Careers",
    who: "Operators & leaders",
    body: "Roles for people who would rather build across industries than inside one.",
    offers: ["Leadership roles", "Platform operators", "Advisory seats"],
    cta: "Introduce yourself",
    field: "Current role",
    img: "/img/door-talent.jpg",
  },
  {
    n: "04",
    slug: "press",
    desk: "press",
    title: "Press",
    label: "Press",
    who: "Editors, producers & journalists",
    body: "Biography, fact sheet, approved photography and interview requests.",
    offers: ["Biography", "Media kit", "Interview requests"],
    cta: "Request the media kit",
    field: "Publication",
    img: "/img/door-press.jpg",
    page: { href: "/press", label: "Biography and fact sheet" },
  },
  {
    n: "05",
    slug: "general",
    desk: "general",
    title: "Contact",
    label: "Contact",
    who: "Everyone else",
    body: "Speaking invitations, introductions and notes on the ideas.",
    offers: ["Speaking & panels", "Introductions", "Notes on the ideas"],
    cta: "Send a note",
    field: "Organisation (optional)",
    img: "/img/door-ideas.jpg",
    page: { href: "/ideas", label: "Read the ideas" },
  },
];

// Press page (brief §4). Every line here needs sign-off against the approved claims sheet (§10).
export const PRESS_BIO = [
  "Kalpesh Kinariwala is a Dubai-based founder who builds platforms in fragmented markets — iodine, private capital, real estate and live entertainment.",
  "He started Pantheon Group in 2001 from a hundred-square-foot office with US$2,000 of borrowed money. By 2008 it was the world’s leading distributor of iodine. In 2016 he founded Pantheon Development in Dubai, which has handed over more than 1,000 homes in Jumeirah Village Circle.",
  "His current focus is HOP Events, which produces arena-scale shows with India’s leading artists — including a sold-out Etihad Arena with Arijit Singh and A.R. Rahman — and was anchor sponsor of Shows of India 2026.",
];

export const PRESS_FACTS = [
  { k: "Based", v: "Dubai, United Arab Emirates" },
  { k: "First company", v: "Pantheon Group, 2001 — iodine distribution" },
  { k: "Real estate", v: "Pantheon Development, 2016 — 1,000+ homes handed over in JVC" },
  { k: "Live entertainment", v: "HOP Events — sold-out Etihad Arena; anchor sponsor, Shows of India 2026" },
  { k: "Private capital", v: "Details on request" }, // TODO: approved description of the fund
];

// Each door is its own page (/contact/capital, /contact/hop, …).
export const doorHref = (d: Pick<Door, "slug">) => `/contact/${d.slug}`;
