import Image from "next/image";
import Link from "next/link";
import { IDEAS } from "./data";

export default function Ideas() {
  return (
    <section id="ideas" className="relative bg-violet text-bone">
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 data-split className="display text-[clamp(38px,6vw,113px)] lg:col-span-8">
            Ideas, written <em>after</em> they worked.
          </h2>
          <div className="flex flex-col justify-end lg:col-span-4">
            <p data-fade className="max-w-[380px] text-[17px] leading-[1.65] text-bone/75">
              His frameworks, stated plainly — the notes behind the numbers. Essays, talks and working principles.
            </p>
            <Link href="/ideas" data-fade className="group mt-8 flex w-fit items-center gap-4 text-[16px] font-medium">
              <span className="border-b border-champagne pb-1">All ideas and talks</span>
              <span className="grid size-11 place-items-center border border-white/30 transition-colors duration-500 group-hover:bg-champagne group-hover:text-obsidian">
                →
              </span>
            </Link>
          </div>
        </div>

        <ol className="mt-14 md:mt-16">
          {IDEAS.map((idea) => (
            <li key={idea.n} className="relative">
              <span data-rule className="absolute inset-x-0 top-0 h-px origin-left bg-white/20" />
              <Link
                href="/ideas"
                className="group grid grid-cols-12 items-center gap-x-6 gap-y-3 py-6 md:py-7"
              >
                <span className="display-sm col-span-2 text-[20px] text-champagne md:col-span-1">{idea.n}</span>
                <div className="col-span-10 md:col-span-7">
                  <h3 className="display text-[clamp(27px,3.4vw,63px)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] md:group-hover:translate-x-4">
                    {idea.title}
                  </h3>
                  <p className="mt-3 max-w-[560px] text-[16px] leading-[1.6] text-bone/75 md:grid md:grid-rows-[0fr] md:opacity-0 md:transition-all md:duration-700 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100">
                    <span className="block min-h-0 overflow-hidden">{idea.dek}</span>
                  </p>
                </div>
                <div className="col-span-8 col-start-3 flex gap-6 text-[14px] md:col-span-2 md:col-start-auto md:flex-col md:gap-1">
                  <span className="w-fit bg-champagne px-3 py-1 font-medium text-obsidian">{idea.category}</span>
                  <span className="text-bone/60">{idea.format}</span>
                </div>
                {/* Image lives at the end of its row; hover opens it like a door. */}
                <div className="relative col-span-2 hidden aspect-[3/4] overflow-hidden w-full max-w-[150px] justify-self-end [clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:[clip-path:inset(0_0_0_0)] md:block">
                  <Image src={idea.img} alt="" fill sizes="150px" className="object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
