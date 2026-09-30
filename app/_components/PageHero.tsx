import Image from "next/image";
import Giant from "./Giant";
import { WRAP, WashLayer } from "./Sheet";

// Opening screen for the inner pages, the same shape as the home sections: the giant word with its
// light gold line on the same baseline, the intro directly beneath it in the statement size, and his
// photograph filling the right of the screen and fading into the dark.
export default function PageHero({
  word,
  line,
  intro,
  bg,
  aside,
}: {
  /** The giant word. */
  word: string;
  /** The light gold line set beside it. */
  line: string;
  intro: string;
  /** Photograph behind the opening screen, anchored right and fading into the dark. */
  bg?: { src: string; pos?: string };
  aside?: React.ReactNode;
}) {
  return (
    <section data-theme="dark" className="relative isolate flex min-h-[100svh] overflow-hidden bg-ink text-bone">
      <WashLayer wash="ink" />
      {bg && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1]">
          <div className="absolute inset-y-0 right-0 w-full md:w-[64%] md:[mask-image:linear-gradient(to_right,transparent,#000_45%)]">
            <Image src={bg.src} alt="" fill preload sizes="(min-width:768px) 64vw, 100vw" className={`object-cover opacity-60 ${bg.pos ?? "object-center"}`} />
          </div>
          <div className="absolute inset-0 bg-ink/45 md:bg-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/0" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/0 to-ink" />
        </div>
      )}
      <div className={`${WRAP} flex flex-col pb-24 pt-[140px] md:pb-[8svh] md:pt-[max(120px,16svh)]`}>
        <Giant as="h1" n={Math.round(word.length + line.length * 0.3)} max={22}>
          {word}
          <span className="accent ml-[0.5em]">{line}</span>
        </Giant>
        <div data-fade className="mt-12 md:mt-[6svh]">
          <p className="t-lead max-w-[32ch] text-bone/90">{intro}</p>
          {aside}
        </div>
      </div>
    </section>
  );
}
