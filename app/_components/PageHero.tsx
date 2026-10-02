import type { ReactNode } from "react";
import Image from "next/image";
import Giant from "./Giant";
import { WRAP, WashLayer } from "./Sheet";

// Opening screen for the inner pages. From laptops up, two columns: the giant word with its light gold line
// underneath and the intro on the left; his photograph on the right, its top level with the word and running
// the full height of the screen (client, 2026-10-02: the photo sat too low). Behind everything, the same
// photograph as colour only — blurred far past any face — so the screen glows instead of sitting in black.
export default function PageHero({
  word,
  line,
  intro,
  photo,
  aside,
}: {
  /** The giant word. */
  word: string;
  /** The light gold line set under it. */
  line: string;
  intro: string;
  /** Him alone, 4:5. */
  photo?: { src: string; alt: string; pos?: string };
  aside?: ReactNode;
}) {
  return (
    <section data-theme="dark" className="relative isolate overflow-hidden bg-ink text-bone">
      <WashLayer wash="violet" />
      {photo && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1]">
          <Image src={photo.src} alt="" fill sizes="128px" className="scale-125 object-cover opacity-75 blur-3xl saturate-[1.3]" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/70" />
        </div>
      )}

      <div
        className={`${WRAP} flex flex-col gap-12 pb-20 pt-[132px] md:pt-[170px] lg:h-[100svh] lg:min-h-[680px] lg:flex-row lg:gap-[6vw] lg:pb-[6svh] lg:pt-[max(100px,13svh)]`}
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <Giant as="h1" n={Math.max(word.length, Math.ceil(line.length * 0.3))} max={16}>
            {word}
            <span className="accent">{line}</span>
          </Giant>
          <div data-fade className="mt-10 lg:mt-[6svh]">
            <p className="t-lead max-w-[36ch] text-bone/90">{intro}</p>
            {aside}
          </div>
        </div>

        {photo && (
          <figure
            data-fade
            className="mx-auto w-[78%] max-w-[420px] lg:mx-0 lg:aspect-[4/5] lg:h-full lg:w-auto lg:max-w-none lg:shrink-0"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-coal shadow-[0_50px_100px_-30px_rgba(0,0,0,.85)] lg:aspect-auto lg:h-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                preload
                sizes="(min-width:1024px) 46svh, 78vw"
                className={`object-cover ${photo.pos ?? "object-[50%_20%]"}`}
              />
            </div>
          </figure>
        )}
      </div>
    </section>
  );
}
