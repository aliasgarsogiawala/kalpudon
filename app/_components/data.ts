// Facts are drawn from public profiles (Entrepreneur Middle East, Forbes Middle East, Gulf News,
// HOP Events press, May 2026). Brief §10: every figure needs sign-off against the client's approved
// claims sheet before launch. Anything marked TODO still needs confirmation from the client.
//
// Photography: images of Kalpesh and HOP are from his own Instagram (@kalpesh.kinariwala, ig-*.jpg) —
// usage rights to be confirmed by the client before launch (brief §9–10); some are event photographers'
// work and artists on stage may need their own consent. The HOP clip is cut from his Lucky Ali reel at
// Coca-Cola Arena. kk-*.jpg and hop-*.jpg are from the event photographer's shoot at the Jasmine Sandlas concert
// (WeTransfer, 2026-09-22); the artist and dancers in hop-*.jpg may need their own consent. The cut-outs (hero-kk.png from ig-founder.jpg, its lower sides faded where the graphic's triangles hid his arms; the thesis collage's cut-*-hd.png from ig-portrait.jpg,
// ig-smile.jpg and a Pantheon Development Instagram post) are those photographs upscaled 4x with Real-ESRGAN (blended with a plain
// upscale so skin keeps its texture), matted with BiRefNet, and the hero's old gold backdrop glow taken off the
// jacket. Replace them with proper cut-outs from the brand shoot. The old Unsplash stock (ch-*.jpg, pantheon.jpg) is unused.

export const SITE_URL = "https://kalpeshkinariwala.com"; // TODO: confirm the production domain

// Primary navigation, as the client set it (2026-09-29): Art & Culture (HOP and the Pantheon arts, whose page
// is /hop), Real Estate, Ideas and Press, with Contact as the button that opens the five audience doors.
// Everything else is a section of the home page.
export const NAV = [
  { href: "/hop", id: "hop", label: "Art & Culture" },
  { href: "/real-estate", label: "Real Estate" },
  { href: "/ideas", label: "Ideas" },
  { href: "/press", label: "Press" },
] as const;

// Brief §5.2: one instinct, in four moves. Copy is draft until the client's positioning copy arrives (§9).
export const INSTINCT = [
  { t: "Find the fragmentation", d: "Markets where supply, trust or talent is scattered across too many small hands." },
  { t: "Connect the pieces", d: "Build the one place the scattered pieces meet — the connection others will not make." },
  { t: "Manage the downside", d: "Decide what the worst case costs, and survive it, before anyone talks about the upside." },
  { t: "Let scale follow", d: "When the pieces connect and the floor holds, growth stops needing to be forced." },
] as const;

// Brief §5.3: the four businesses as evidence of one instinct — equal weight, a few verified figures only.
export type Chapter = {
  n: string;
  sector: string;
  since: string;
  entity: string;
  headline: string;
  proof: string;
  img: string;
  pos?: string;
  alt: string;
  href?: string;
};

export const CHAPTERS: Chapter[] = [
  {
    n: "01",
    sector: "Mining Chemical",
    since: "2001",
    entity: "Pantheon Group",
    headline: "A hundred square feet and two thousand borrowed dollars.",
    proof: "By 2008, the world’s leading mining chemical distributor.",
    img: "/img/kk-proof-mining-3.jpg",
    alt: "Kalpesh Kinariwala",
  },
  {
    n: "02",
    sector: "Capital Market",
    since: "Ongoing",
    entity: "Private mandates", // TODO: confirm fund names and dates with client
    headline: "Returns are an output. The floor is the only thing you control.",
    proof: "Track record and allocation approach, on request.", // TODO: approved description of the fund
    img: "/img/kk-proof-capital.jpg",
    alt: "Kalpesh Kinariwala with a business partner",
    href: "/contact/capital",
  },
  {
    n: "03",
    sector: "Real estate",
    since: "2016",
    entity: "Pantheon Development, Dubai",
    headline: "Affordable luxury, delivered on schedule.",
    proof: "1,000+ homes handed over in Jumeirah Village Circle.",
    img: "/img/shoot-estate-card.jpg",
    alt: "Kalpesh Kinariwala at Pantheon Development",
  },
  {
    n: "04",
    sector: "Live entertainment",
    since: "Now",
    entity: "HOP Events, UAE",
    headline: "India’s leading artists, produced at arena scale.",
    proof: "A sold-out Etihad Arena with Arijit Singh and A.R. Rahman.",
    img: "/img/kk-proof-live.jpg",
    alt: "Kalpesh Kinariwala on stage at a concert",
    href: "/hop",
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
  { k: "Next", v: "The diaspora circuit", d: "From the UAE into South Asian diaspora hubs" },
];

// HOP productions, from his own channels, until the brand shoot's event footage arrives (brief §9).
export const PRODUCTIONS = [
  { img: "/img/hop-smoke.jpg", t: "Headline nights", w: "tall" },
  { img: "/img/hop-pyro.jpg", t: "Arena scale", w: "wide" },
  { img: "/img/hop-dancers.jpg", t: "Choreography", w: "wide" },
  { img: "/img/hop-confetti.jpg", t: "The room", w: "wide" },
] as const;

// Brief §6: categories map to his pillars.
export const PILLARS = ["The Widest", "Manage Risk", "Platform Thinking", "Life & Lessons", "Building People"] as const;
export type Pillar = (typeof PILLARS)[number];

// The Ideas hub as it launched. The team now edits it in /admin (app/_lib/content.ts); these are the
// defaults shown until the first save. Entries stay in preparation (date: null) until published.
export type Piece = {
  slug: string;
  n: string;
  title: string;
  format: "Article" | "Video";
  category: Pillar;
  date: string | null;
  dek: string;
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
  },
  {
    slug: "inspect-what-you-expect",
    n: "02",
    title: "Inspect What You Expect",
    format: "Article",
    category: "Building People",
    date: null,
    dek: "Trust scales when it is checked. Why inspection belongs on the calendar, not in the crisis.",
  },
  {
    slug: "the-widest-not-the-tallest",
    n: "03",
    title: "The Widest, Not the Tallest",
    format: "Video",
    category: "The Widest",
    date: null,
    dek: "Height is fragile — one market, one cycle, one point of failure. Width is a platform that survives any single storm.",
  },
];

// Ordered so real estate reads as one proof point, never the headline (brief §2). Launch defaults: the
// team edits awards in /admin (app/_lib/content.ts).
export const RECOGNITION = [
  { who: "Entrepreneur Middle East", what: "The 100 NRIs", y: "2026" },
  { who: "Shows of India", what: "Anchor sponsor, HOP Events", y: "2026" },
  { who: "Forbes Middle East", what: "Most Impactful Real Estate Leaders", y: "2026" },
  { who: "Construction Week", what: "The Power 150", y: "2026" }, // from the cover; year from when he posted it
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
  pos?: string;
  href?: string;
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
    img: "/img/shoot-capital.jpg",
    pos: "object-[50%_20%]",
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
    img: "/img/door-hop-v2.jpg",
    pos: "object-[50%_20%]",
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
    img: "/img/shoot-careers.jpg",
    pos: "object-[50%_20%]",
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
    img: "/img/door-press-v2.jpg",
    pos: "object-[50%_20%]",
    href: "/press", // brief §3: press goes to the press & media kit page
    page: { href: "/press", label: "Biography and fact sheet" },
  },
  {
    n: "05",
    slug: "general",
    desk: "general",
    title: "Contact",
    label: "Contact",
    who: "Speaking, introductions & everything else",
    body: "Speaking invitations, introductions and notes on the ideas.",
    offers: ["Speaking & panels", "Introductions", "Notes on the ideas"],
    cta: "Send a note",
    field: "Organisation (optional)",
    img: "/img/shoot-contact.jpg",
    pos: "object-[50%_15%]",
    page: { href: "/ideas", label: "Read the ideas" },
  },
];

// Press page (brief §4). Every line here needs sign-off against the approved claims sheet (§10).
// Launch defaults: the team edits the biography and fact sheet in /admin.
export const PRESS_BIO = [
  "Kalpesh Kinariwala is a Dubai-based founder who builds platforms in fragmented markets — mining chemicals, capital markets, real estate and live entertainment.",
  "He started Pantheon Group in 2001 from a hundred-square-foot office with US$2,000 of borrowed money. By 2008 it was the world’s leading mining chemical distributor. In 2016 he founded Pantheon Development in Dubai, which has handed over more than 1,000 homes in Jumeirah Village Circle.",
  "His current focus is HOP Events, which produces arena-scale shows with India’s leading artists — including a sold-out Etihad Arena with Arijit Singh and A.R. Rahman — and was anchor sponsor of Shows of India 2026.",
];

export const PRESS_FACTS = [
  { k: "Based", v: "Dubai, United Arab Emirates" },
  { k: "First company", v: "Pantheon Group, 2001 — mining chemical distribution" },
  { k: "Real estate", v: "Pantheon Development, 2016 — 1,000+ homes handed over in JVC" },
  { k: "Live entertainment", v: "HOP Events — sold-out Etihad Arena; anchor sponsor, Shows of India 2026" },
  { k: "Capital market", v: "Details on request" }, // TODO: approved description of the fund
];

export const ELSEWHERE = [
  { href: "https://www.instagram.com/kalpesh.kinariwala/", label: "Instagram" },
  { href: "https://www.linkedin.com/in/kalpeshkinariwala/", label: "LinkedIn" }, // from his Instagram bio
];

// Each door is its own page (/contact/capital, /contact/hop, …); press lands on the press & media kit page.
export const doorHref = (d: Pick<Door, "slug" | "href">) => d.href ?? `/contact/${d.slug}`;
