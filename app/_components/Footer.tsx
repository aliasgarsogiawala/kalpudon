import Link from "next/link";
import Giant from "./Giant";
import { WRAP } from "./Sheet";
import { DOORS, ELSEWHERE, doorHref } from "./data";

// Social marks, drawn inline so nothing loads from a third party.
const ICONS: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden>
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.05c.53-.95 1.84-1.95 3.79-1.95 4.05 0 4.83 2.55 4.83 5.87v5.58h-4v-4.95c0-1.18-.02-2.7-1.72-2.7-1.72 0-1.98 1.29-1.98 2.62v5.03h-4v-11Z"
      />
    </svg>
  ),
};

// The sitemap (brief §4).
const SITE = [
  { href: "/", label: "Home" },
  { href: "/hop", label: "Art & Culture" },
  { href: "/real-estate", label: "Real Estate" },
  { href: "/ideas", label: "Ideas" },
];

const link = "transition-opacity duration-300 hover:opacity-60";

// The close stays cinematic and near-black; gold is used as light, not as a bright surface.
export default function Footer() {
  return (
    <footer data-theme="dark" className="relative isolate z-[1] overflow-hidden border-t border-gold/20 bg-ink text-bone">
      <div className={`${WRAP} pt-16 md:pt-24`}>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[15px] font-semibold">© {new Date().getFullYear()} Kalpesh Kinariwala</p>
            <p className="mt-1 text-[15px]">Dubai, United Arab Emirates</p>
            <ul className="mt-6 flex gap-5">
              {ELSEWHERE.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${l.label} (opens in a new tab)`}
                    className="block text-gold-soft transition-opacity duration-300 hover:opacity-60"
                  >
                    {ICONS[l.label]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 text-[15px] md:col-span-5 md:col-start-6">
            <ul className="space-y-2">
              {SITE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {DOORS.map((d) => (
                <li key={d.slug}>
                  <Link href={doorHref(d)} className={link}>
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-[13px] leading-relaxed text-bone/55 md:col-span-3 md:text-right">
            Photography: Kalpesh Kinariwala and HOP Events.
          </p>
        </div>
      </div>

      {/* The name, signed across the foot of every page */}
      <div aria-hidden className={`${WRAP} mt-24 text-gold/15 md:mt-40`}>
        <Giant as="span" n={18} max={30} className="-mb-[0.06em]">
          Kalpesh Kinariwala
        </Giant>
      </div>
    </footer>
  );
}
