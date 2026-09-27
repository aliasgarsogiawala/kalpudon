import Image from "next/image";
import Link from "next/link";
import Giant from "./Giant";
import Sheet, { PAD, WRAP } from "./Sheet";
import { IDEAS } from "./data";

// Brief §5.5: his frameworks, stated plainly — the teaching layer, and what press will quote.
// All three in view, each opening the content hub.
export default function Ideas() {
  return (
    <Sheet id="ideas" theme="dark" wash="aubergine" className="bg-aubergine text-bone">
      <div className={`${WRAP} ${PAD}`}>
        <h2 aria-label="Ideas, written after they worked" className="relative">
          <Giant as="span" n={5} max={26} stretch={1.35} stretchSm={1.6}>
            Ideas
          </Giant>
          <span aria-hidden className="script script-outline absolute bottom-[4%] right-[1%] z-[2] -rotate-[6deg] text-[clamp(36px,5.4vw,100px)] text-gold-soft [--outline:var(--aubergine)]">
            written after they worked.
          </span>
        </h2>

        <ol className="mt-28 md:mt-40">
          {IDEAS.map((idea) => (
            <li key={idea.slug}>
              <Link href="/ideas" className="group grid grid-cols-12 items-center gap-x-6 gap-y-4 py-10 md:py-14">
                <h3 className="col-span-12 text-[clamp(40px,4.6vw,84px)] font-black uppercase leading-[0.88] tracking-[-0.01em] transition-[transform,color] duration-700 ease-[cubic-bezier(.16,1,.3,1)] [font-stretch:62%] group-hover:translate-x-3 group-hover:text-gold-soft md:col-span-7">
                  {idea.title}
                </h3>
                <p className="col-span-12 max-w-[46ch] text-[16px] leading-[1.6] text-bone/75 md:col-span-4">
                  {idea.dek}
                  <span className="mt-3 block text-[14px] text-bone/60">
                    {idea.format}, {idea.date ? "published" : "in preparation"}
                  </span>
                </p>
                <span className="relative col-span-1 hidden aspect-square overflow-hidden rounded-full md:block">
                  <Image src={idea.img} alt="" fill sizes="96px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <Link href="/ideas" data-fade className="link-line mt-14 inline-block text-[17px] text-gold-soft">
          All ideas and talks →
        </Link>
      </div>
    </Sheet>
  );
}
