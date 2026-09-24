import { RECOGNITION } from "./data";

// Christoph Gey-style proof wall, set in type rather than borrowed logos.
export default function Record() {
  return (
    <section id="record" className="relative bg-champagne text-obsidian">
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 data-split className="display text-[clamp(35px,4.8vw,87px)]">
            On the <em>record.</em>
          </h2>
          <p data-fade className="max-w-[360px] pb-2 text-[16px] leading-relaxed text-obsidian/70">
            Recognition across the platforms — from the region’s business press to the live-entertainment industry.
          </p>
        </div>

        <ul className="mt-14">
          {RECOGNITION.map((r) => (
            <li key={r.who + r.y} className="group relative">
              <span data-rule className="absolute inset-x-0 top-0 h-px origin-left bg-obsidian/30" />
              <div className="grid grid-cols-12 items-baseline gap-4 py-6 transition-[padding] duration-700 ease-[cubic-bezier(.16,1,.3,1)] md:group-hover:pl-6">
                <span className="display-sm col-span-12 text-[clamp(23px,2.2vw,36px)] md:col-span-5">{r.who}</span>
                <span className="col-span-9 text-[16px] text-obsidian/75 md:col-span-5">{r.what}</span>
                <span className="display-sm col-span-3 text-right text-[22px] md:col-span-2">{r.y}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
