"use client";

import { useState } from "react";
import Image from "next/image";

// One podcast episode as a still from YouTube that turns into the player when pressed, so nothing loads
// from YouTube until someone asks to watch.
export default function Episode({ id, title, sizes, priority = false }: { id: string; title: string; sizes: string; priority?: boolean }) {
  const [playing, setPlaying] = useState(false);
  // Not every upload has the full-size still; fall back to the one every video has.
  const [still, setStill] = useState<"maxresdefault" | "hqdefault">("maxresdefault");

  return (
    <div className="relative aspect-video overflow-hidden bg-coal shadow-[0_50px_100px_-30px_rgba(0,0,0,.85)]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 size-full" aria-label={`Play: ${title}`}>
          <Image
            src={`https://i.ytimg.com/vi/${id}/${still}.jpg`}
            alt=""
            fill
            sizes={sizes}
            preload={priority}
            onError={() => setStill("hqdefault")}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <span className="absolute bottom-[6%] left-[4%] grid size-[clamp(48px,5vw,76px)] place-items-center rounded-full bg-ink/45 ring-1 ring-gold-soft/70 backdrop-blur-md transition-colors duration-500 group-hover:bg-gold-soft/90">
            <svg viewBox="0 0 24 24" className="ml-[8%] size-[38%] text-gold-soft transition-colors duration-500 group-hover:text-ink" aria-hidden>
              <path d="M7 4.5v15L19.5 12 7 4.5Z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
