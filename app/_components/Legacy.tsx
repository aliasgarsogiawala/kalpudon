import Image from "next/image";
import Sheet, { Split, WRAP } from "./Sheet";

// Brief §5.6: the human close, in his register — warmth to balance the authority, so he reads as a
// person, not a machine.
export default function Legacy() {
  return (
    <Sheet theme="dark" wash="ink" className="bg-ink text-bone">
      <div className={`${WRAP} flex min-h-[100svh] flex-col py-28 md:py-[10svh]`}>
        <Split
          className="md:my-auto"
          left={
            <blockquote data-scrub-words className="t-statement max-w-[16ch] text-[clamp(40px,min(5vw,8.4svh),96px)] leading-[1.02]">
              Build things that make more people better off. <em className="text-gold-soft">Be a good human being, and connect with people with an open heart.</em>
            </blockquote>
          }
          right={
            <div className="flex flex-col gap-10 sm:flex-row sm:items-end lg:flex-col lg:items-start xl:flex-row xl:items-end">
              <figure className="w-[78%] max-w-[380px] shrink-0 sm:w-[50%] lg:w-[70%] xl:w-[52%]">
                <div data-reveal className="relative aspect-[4/3] rotate-[3deg] bg-bone p-1.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
                  <div data-reveal-clip className="relative h-full w-full overflow-hidden bg-smoke">
                    <Image
                      src="/img/kk-book.jpg"
                      alt="Kalpesh Kinariwala with two friends, holding a book"
                      fill
                      sizes="(min-width:1024px) 26vw, 78vw"
                      className="object-cover object-[47%_40%]"
                    />
                  </div>
                </div>
              </figure>
              <div>
                <p data-fade className="t-body max-w-[420px] text-bone/85">
                  Every platform he has built is judged by one test: did the suppliers, investors, residents and
                  artists leave better off than they arrived?
                </p>
                <p data-fade className="t-accent mt-8">
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
