import Image from "next/image";
import Sheet, { PAD, Split, WRAP } from "./Sheet";

// Brief §5.6: the human close, in his register — warmth to balance the authority, so he reads as a
// person, not a machine.
export default function Legacy() {
  return (
    <Sheet theme="dark" wash="ink" className="bg-ink text-bone">
      <div className={`${WRAP} ${PAD} flex min-h-[100svh] flex-col`}>
        <Split
          className="md:my-auto"
          left={
            <blockquote data-scrub-words className="serif max-w-[16ch] text-[clamp(44px,5.2vw,100px)] leading-[0.97]">
              Build things that make more people better off. <em className="text-gold-soft">Be a good human being, and connect with people with an open heart.</em>
            </blockquote>
          }
          right={
            <div className="flex flex-col gap-10 sm:flex-row sm:items-end lg:flex-col lg:items-start xl:flex-row xl:items-end">
              <figure className="w-[62%] max-w-[300px] shrink-0 sm:w-[44%] lg:w-[56%] xl:w-[44%]">
                <div data-reveal className="relative aspect-[4/5] rotate-[3deg] bg-bone p-1.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
                  <div data-reveal-clip className="relative h-full w-full overflow-hidden bg-smoke">
                    <Image
                      src="/img/kk-confetti.jpg"
                      alt="Kalpesh Kinariwala smiling up at falling confetti"
                      fill
                      sizes="(min-width:1024px) 20vw, 60vw"
                      className="object-cover object-[50%_30%]"
                    />
                  </div>
                </div>
              </figure>
              <div>
                <p data-fade className="max-w-[420px] text-[17px] leading-[1.7] text-bone/85">
                  Every platform he has built is judged by one test: did the suppliers, investors, residents and
                  artists leave better off than they arrived?
                </p>
                <p data-fade className="script mt-8 text-[clamp(48px,4.4vw,72px)] text-gold-soft">
                  — Kalpesh
                </p>
              </div>
            </div>
          }
        />
      </div>
    </Sheet>
  );
}
