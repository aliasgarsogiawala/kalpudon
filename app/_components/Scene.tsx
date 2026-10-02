import type { ReactNode } from "react";
import Image from "next/image";
import { WRAP } from "./Sheet";

// The shape the client liked on the HOP opening, "the present tense" (2026-09-29: "if that kind of design
// logic can be put throughout the website"), shared by every chapter: one full screen over a darkened
// photograph or film, the giant line across the top, the words on the left and him on the right,
// filling the height. Phones stack the same pieces in that order.
export default function Scene({
  backdrop,
  heading,
  figure,
  children,
}: {
  /** Full-bleed photograph or film behind the scene; darkened and tinted here so the type reads over it. */
  backdrop?: ReactNode;
  heading?: ReactNode;
  /** The right-hand column: him. */
  figure?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      {backdrop && (
        <div aria-hidden className="absolute inset-0">
          {backdrop}
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 bg-violet/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/75" />
        </div>
      )}

      <div className={`${WRAP} relative z-[1] flex flex-col pb-20 pt-[132px] md:pb-28 md:pt-[180px] lg:h-[100svh] lg:min-h-[680px] lg:pb-[6svh] lg:pt-[max(100px,13svh)]`}>
        {heading}
        <div className={`flex flex-col gap-14 lg:min-h-0 lg:flex-1 lg:flex-row lg:gap-[6vw] ${heading ? "mt-14 lg:mt-[6svh]" : ""}`}>
          <div className="flex min-w-0 flex-1 flex-col gap-10 lg:gap-[5svh] lg:py-[1svh]">{children}</div>
          {figure}
        </div>
      </div>
    </div>
  );
}

// A photograph for the backdrop. Small or portrait sources are softened so the stretch reads as light.
export function Backdrop({ src, pos = "object-center", soft = false }: { src: string; pos?: string; soft?: boolean }) {
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="100vw"
      className={`object-cover ${pos} ${soft ? "scale-110 blur-[6px]" : ""}`}
    />
  );
}

// Him, set straight beside the words: a 4:5 photograph that fills the scene's height on laptops.
export function ScenePhoto({ src, alt, pos = "object-center" }: { src: string; alt: string; pos?: string }) {
  return (
    <figure data-fade className="mx-auto w-[78%] max-w-[420px] lg:mx-0 lg:aspect-[4/5] lg:h-full lg:w-auto lg:max-w-none lg:shrink-0">
      <div className="relative aspect-[4/5] overflow-hidden bg-coal shadow-[0_50px_100px_-30px_rgba(0,0,0,.85)] lg:aspect-auto lg:h-full">
        <Image src={src} alt={alt} fill sizes="(min-width:1024px) 40svh, 78vw" className={`object-cover ${pos}`} />
      </div>
    </figure>
  );
}
