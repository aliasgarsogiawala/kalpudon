import Link from "next/link";
import DoorSketch from "./DoorSketch";
import Giant from "./Giant";
import Sheet, { PAD, WRAP } from "./Sheet";
import { DOORS, doorHref, type Door } from "./data";

const condensed = "display";

// Routing directory: each door set large — who it is for, what you can ask — each row a link to that
// door's page. Works on the gold sheet (light) and on ink (dark).
export function Directory({
  doors = DOORS,
  tone = "dark",
  className = "mt-10",
}: {
  doors?: Door[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const t =
    tone === "light"
      ? { sub: "text-ink/75", name: "group-hover:text-ink/60", arrow: "text-ink/60" }
      : { sub: "text-stone", name: "group-hover:text-gold-soft", arrow: "text-gold" };
  return (
    <ul className={`space-y-2 ${className}`}>
      {doors.map((d) => (
        <li key={d.slug}>
          <Link href={doorHref(d)} className="group flex items-center justify-between gap-6 py-6 md:py-8">
            <span className="min-w-0">
              <span
                className={`block text-[clamp(32px,3vw,52px)] leading-[0.88] transition-[transform,color] duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2 ${condensed} ${t.name}`}
              >
                {d.label}
              </span>
              <span className={`mt-2 block text-[14px] leading-snug ${t.sub}`}>
                {d.who}
                <span className="hidden md:inline"> — {d.offers.join(", ")}</span>
              </span>
            </span>
            <span aria-hidden className={`shrink-0 text-[26px] transition-transform duration-500 group-hover:translate-x-1 ${t.arrow}`}>
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Brief §5.7: the routing footer — five doors, clearly separated. Each is its own card with who it is for,
// what you can ask, and a way in. Gold, dark cards, one step from the right inbox.
function DoorCards() {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {DOORS.map((d) => (
        <li key={d.slug} className="last:col-span-2 lg:last:col-span-1">
          <Link
            href={doorHref(d)}
            className="group relative flex h-full min-h-[230px] flex-col overflow-hidden bg-coal p-4 text-bone sm:min-h-[340px] sm:p-6 lg:min-h-[420px]"
          >
            {/* A gold sketch for each door (client, 2026-10-03), lit from behind like the drawings it follows. It sits
                in the flow above the words, so the two never overlap at any width. */}
            <span aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_28%,rgb(184_138_66/.16),transparent_72%)]" />
            <DoorSketch
              kind={d.slug}
              className="relative mx-auto w-full max-w-[190px] transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1 group-hover:scale-[1.04] sm:max-w-[260px]"
            />
            <span className="relative mt-auto pt-4 sm:pt-6">
              <span className={`block text-[26px] leading-[0.88] sm:text-[clamp(34px,2.6vw,44px)] ${condensed}`}>{d.label}</span>
              <span className="mt-2 block text-[13px] leading-snug text-gold-soft sm:mt-3 sm:text-[14px]">{d.who}</span>
              <span className="mt-4 hidden text-[13px] leading-[1.6] text-bone/65 sm:block">
                {d.offers.join(", ")}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Doors({ page = false }: { page?: boolean }) {
  if (page) {
    return (
      <section data-theme="dark" className="bg-ink text-bone">
        <div className={`${WRAP} pb-32 md:pb-52`}>
          <Directory className="mt-0" />
        </div>
      </section>
    );
  }
  return (
    <Sheet id="contact" theme="dark" wash="ink" className="bg-ink text-bone">
      <div className={`${WRAP} ${PAD}`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 aria-label="Enquiries" className="relative lg:col-span-7">
            <Giant as="span" n={9} max={22}>
              Enquiries
            </Giant>
          </h2>
          <p data-fade className="max-w-[34ch] text-[clamp(20px,1.6vw,26px)] leading-[1.3] text-bone/80 lg:col-span-4 lg:col-start-9 lg:pb-3">
            Capital. Real Estate JVs. Cultural Partnerships. Media. Speaking Engagements. Every enquiry is routed
            directly to the desk that handles it.
          </p>
        </div>
        <div className="mt-12 md:mt-24">
          <DoorCards />
        </div>
      </div>
    </Sheet>
  );
}
