import Image from "next/image";
import Link from "next/link";
import { DOORS, doorHref, type Door } from "./data";

// Routing directory: one compact row per door — who it is for, what you can ask, a photograph —
// each row a link to that door's page. Hovering fills the row with gold.
export function Directory({ doors = DOORS, className = "mt-10 md:mt-12" }: { doors?: Door[]; className?: string }) {
  return (
    <ul className={`border-t border-white/15 ${className}`}>
      {doors.map((d) => (
        <li key={d.slug} className="border-b border-white/15">
          <Link
            href={doorHref(d)}
            className="group relative grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 overflow-hidden py-5 md:grid-cols-12 md:gap-x-8 md:py-6"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-champagne transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />

            <span className="relative text-[clamp(22px,1.9vw,30px)] font-medium tracking-[-0.02em] text-bone transition-colors duration-300 group-hover:text-obsidian col-start-1 row-start-1 md:col-span-3 md:col-start-auto md:row-start-auto md:pl-4">
              {d.label}
            </span>
            <span className="relative col-span-2 text-[15px] text-bone/65 transition-colors duration-300 group-hover:text-obsidian/70 md:col-span-3">
              {d.who}
            </span>
            <span className="relative col-span-2 text-[15px] leading-relaxed text-bone/85 transition-colors duration-300 group-hover:text-obsidian md:col-span-4">
              {d.offers.join(" · ")}
            </span>

            <span className="relative col-start-2 row-start-1 flex items-center justify-end gap-5 md:col-span-2 md:col-start-auto md:row-start-auto md:pr-4">
              <span className="relative hidden h-14 w-20 overflow-hidden md:block">
                <Image src={d.img} alt="" fill sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </span>
              <span className="text-[20px] text-champagne transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-obsidian">
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Brief §5.7: the five audience doors. On the home page it closes the story; on /contact it follows the page hero.
export default function Doors({ page = false }: { page?: boolean }) {
  if (page) {
    return (
      <section id="doors" className="relative bg-violet text-bone">
        <div className="mx-auto max-w-[1680px] px-5 pb-16 pt-2 md:px-10 md:pb-20">
          <Directory />
        </div>
      </section>
    );
  }
  return (
    <section id="doors" className="relative bg-violet text-bone">
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p data-fade className="label text-champagne">
              Where to next
            </p>
            <h2 data-split className="display mt-5 text-[clamp(30px,3.3vw,56px)]">
              Five doors. <em className="text-champagne">Pick yours.</em>
            </h2>
          </div>
          <p data-fade className="max-w-[420px] text-[16px] leading-[1.65] text-bone/70 lg:col-span-4 lg:col-start-9 lg:pb-2">
            Each door goes to the people who handle it: capital, HOP partnerships, careers, press, and everything else.
          </p>
        </div>

        <Directory />
      </div>
    </section>
  );
}
