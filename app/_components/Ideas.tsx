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
          <Giant as="span" n={5} max={26}>
            Ideas
          </Giant>
          <span aria-hidden className="script script-outline absolute bottom-[4%] right-[1%] z-[2] -rotate-[6deg] text-[clamp(27px,5.4vw,100px)] text-gold-soft [--outline:var(--aubergine)]">
            written after they worked.
          </span>
        </h2>

        <ol className="mt-28 md:mt-40">
          {IDEAS.map((idea) => (
            <li key={idea.slug}>
              <Link href="/ideas" className="group grid grid-cols-12 items-center gap-x-6 gap-y-6 py-10 md:gap-x-10 md:py-14">
                <div className="relative col-span-5 aspect-[4/5] overflow-hidden bg-smoke md:col-span-3">
                  <Image
                    src={idea.img}
                    alt="Kalpesh Kinariwala"
                    fill
                    sizes="(min-width:768px) 22vw, 40vw"
                    className={`object-cover ${idea.pos ?? "object-[50%_25%]"} transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105`}
                  />
                </div>
                <div className="col-span-7 md:col-span-9 md:grid md:grid-cols-9 md:items-center md:gap-10">
                  <h3 className="text-[clamp(36px,4.4vw,84px)] display leading-[0.95] transition-[transform,color] duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3 group-hover:text-gold-soft md:col-span-5">
                    {idea.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-bone/75 md:col-span-4 md:mt-0">
                    <span className="hidden sm:inline">{idea.dek}</span>
                    <span className="mt-3 block text-[14px] text-bone/60">
                      {idea.format}, {idea.date ? "published" : "in preparation"}
                    </span>
                  </p>
                </div>
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
