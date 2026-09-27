import Image from "next/image";
import Link from "next/link";
import Giant from "./Giant";
import Sheet, { PAD, WRAP } from "./Sheet";
import { DOORS, doorHref, type Door } from "./data";

const condensed = "font-black uppercase tracking-[-0.01em] [font-stretch:62%]";

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
      ? { sub: "text-ink/75", name: "group-hover:text-ink/60", arrow: "border-ink/30 group-hover:bg-ink group-hover:text-gold" }
      : {
          sub: "text-stone",
          name: "group-hover:text-gold-soft",
          arrow: "border-white/25 group-hover:border-gold group-hover:bg-gold group-hover:text-ink",
        };
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
            <span
              aria-hidden
              className={`grid size-12 shrink-0 place-items-center rounded-full border text-[18px] transition-colors duration-500 md:size-14 ${t.arrow}`}
            >
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
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {DOORS.map((d) => (
        <li key={d.slug}>
          <Link
            href={doorHref(d)}
            className="group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[24px] bg-ink p-6 text-bone transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5"
          >
            <Image
              src={d.img}
              alt=""
              fill
              sizes="(min-width:1024px) 20vw, (min-width:640px) 50vw, 100vw"
              className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-35"
            />
            <span className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/80" />
            <span className="relative flex items-center justify-end">
              <span className="grid size-10 place-items-center rounded-full border border-white/20 text-[16px] transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                →
              </span>
            </span>
            <span className="relative mt-auto">
              <span className={`block text-[clamp(34px,2.6vw,44px)] leading-[0.88] ${condensed}`}>{d.label}</span>
              <span className="mt-3 block text-[14px] text-gold-soft">{d.who}</span>
              <span className="mt-4 block text-[13px] leading-[1.6] text-bone/65">
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
    <Sheet id="contact" theme="light" wash="gold" className="bg-gold text-ink">
      <div className={`${WRAP} ${PAD}`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 aria-label="Let’s talk" className="relative lg:col-span-7">
            <Giant as="span" n={10} max={22} stretch={1.3} stretchSm={1.5}>
              Let’s talk
            </Giant>
          </h2>
          <p data-fade className="max-w-[34ch] text-[clamp(20px,1.6vw,26px)] leading-[1.3] lg:col-span-4 lg:col-start-9 lg:pb-3">
            Choose your door. Each note goes straight to the people who handle it.
          </p>
        </div>
        <div className="mt-16 md:mt-24">
          <DoorCards />
        </div>
      </div>
    </Sheet>
  );
}
