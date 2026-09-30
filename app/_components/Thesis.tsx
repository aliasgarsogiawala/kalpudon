import Image from "next/image";
import Giant from "./Giant";
import Sheet, { WRAP } from "./Sheet";
import { INSTINCT } from "./data";

// Brief §5.2: who he is, short — one instinct applied across four unrelated industries. The frame that
// makes everything below it make sense.
// From laptops up it is one full screen: the name of the instinct across the top, then his portrait
// filling the height beside the statement and the four steps. Sizes follow the screen's height as well
// as its width, so nothing drops below the fold.
export default function Thesis() {
  return (
    <Sheet id="story" theme="dark" wash="plum" className="bg-plum text-bone lg:h-[100svh] lg:min-h-[680px]">
      <div className={`${WRAP} flex flex-col pb-28 pt-[132px] md:pb-40 md:pt-[180px] lg:h-full lg:pb-[6svh] lg:pt-[max(100px,13svh)]`}>
        <div className="relative">
          <Giant as="h2" n={12} max={20}>
            One instinct
          </Giant>
          <p className="script script-outline absolute bottom-[-6%] right-[2%] -rotate-[6deg] text-[clamp(32px,min(6vw,10svh),112px)] text-gold-soft [--outline:var(--plum)]">
            four markets.
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-14 md:mt-28 lg:mt-[6svh] lg:min-h-0 lg:flex-1 lg:flex-row lg:gap-[6vw]">
          <figure className="mx-auto w-[84%] max-w-[520px] lg:mx-0 lg:aspect-[4/5] lg:h-full lg:w-auto lg:max-w-none lg:shrink-0">
            <div data-reveal className="relative aspect-[4/5] -rotate-[3deg] bg-bone p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] lg:aspect-auto lg:h-full">
              <div data-reveal-clip className="relative h-full w-full overflow-hidden bg-smoke">
                <Image
                  src="/img/ig-portrait.jpg"
                  alt="Kalpesh Kinariwala, smiling, in a black suit"
                  fill
                  sizes="(min-width:1024px) 34svh, 78vw"
                  className="object-cover object-[50%_25%]"
                />
              </div>
            </div>
          </figure>

          <div className="flex max-w-[820px] flex-col justify-between gap-12 lg:py-[1svh]">
            <p data-fade className="max-w-[640px] text-[clamp(22px,min(2.1vw,3.6svh),36px)] leading-[1.25] tracking-[-0.01em]">
              He doesn’t choose industries. He chooses fragmented markets — iodine, private capital, real estate and now live entertainment — and runs the same instinct through each.
            </p>
            <ol data-fade className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:gap-y-[4svh]">
              {INSTINCT.map((s) => (
                <li key={s.t}>
                  <span className="display block text-[clamp(24px,min(1.9vw,3.1svh),34px)] leading-[0.95]">{s.t}</span>
                  <span className="mt-2 block text-[15px] leading-[1.55] text-bone/75">{s.d}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Sheet>
  );
}
