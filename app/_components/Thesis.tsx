import Image from "next/image";
import Giant from "./Giant";
import Sheet, { PAD, Split, WRAP } from "./Sheet";
import { INSTINCT } from "./data";

// Brief §5.2: who he is, short — one instinct applied across four unrelated industries. The frame that
// makes everything below it make sense.
export default function Thesis() {
  return (
    <Sheet id="story" theme="dark" wash="plum" className="bg-plum text-bone">
      <div className={`${WRAP} ${PAD}`}>
        <div className="relative">
          <Giant as="h2" n={12} max={24} stretch={1.3} stretchSm={1.6}>
            One instinct
          </Giant>
          <p className="script absolute bottom-[-6%] right-[2%] -rotate-[6deg] text-[clamp(36px,6vw,112px)] text-gold-soft">
            four markets.
          </p>
        </div>

        <Split
          className="mt-32 md:mt-52"
          left={
            <figure className="mx-auto w-[78%] max-w-[440px] lg:mx-0">
              <div data-reveal className="relative aspect-[4/5] -rotate-[3deg] bg-bone p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]">
                <div data-reveal-clip className="relative h-full w-full overflow-hidden bg-smoke">
                  <Image
                    src="/img/ig-portrait.jpg"
                    alt="Kalpesh Kinariwala at Shows of India 2026"
                    fill
                    sizes="(min-width:1024px) 30vw, 78vw"
                    className="object-cover object-[50%_25%]"
                  />
                </div>
              </div>
            </figure>
          }
          right={
            <div className="max-w-[620px]">
              <p data-fade className="text-[clamp(24px,2.2vw,36px)] leading-[1.25] tracking-[-0.01em]">
                I don’t choose industries. I choose fragmented markets — iodine, private capital, real estate and now live entertainment — and run the same instinct through each.
              </p>
              <ol className="mt-14 space-y-10">
                {INSTINCT.map((s) => (
                  <li key={s.t} data-fade>
                    <span>
                      <span className="block text-[clamp(28px,2.4vw,40px)] font-black uppercase leading-[0.9] tracking-[-0.01em] [font-stretch:62%]">
                        {s.t}
                      </span>
                      <span className="mt-2 block text-[16px] leading-[1.6] text-bone/75">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          }
        />
      </div>
    </Sheet>
  );
}
