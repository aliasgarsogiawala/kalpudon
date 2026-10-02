import type { CSSProperties } from "react";
import Image from "next/image";
import Giant from "./Giant";
import Sheet from "./Sheet";
import Scene, { Backdrop } from "./Scene";
import { INSTINCT } from "./data";

// Three cut-outs of him, set upright as a collage (client: "take some of his pictures, do a cutout of him
// and then have the cutout slowly fade in on that side"). Two stand back, higher and in shadow, with
// their faces clear; the third stands in front. Each melts away at the foot and on the side its
// photograph cropped him, and they fade in one after another.
const COLLAGE = [
  {
    src: "/img/cut-tux.png",
    ratio: "983/1292",
    place: "left-[-4%] top-[4%] w-[52%] brightness-[.72] saturate-[.85]",
    fade: { "--fl": "26%", "--fb": "52%" },
    sizes: "(min-width:1024px) 30svh, 48vw",
    delay: 0,
    x: -6,
  },
  {
    src: "/img/cut-white.png",
    ratio: "640/1013",
    place: "right-[-4%] top-0 w-[46%] brightness-[.72] saturate-[.85]",
    fade: { "--fl": "12%", "--fr": "22%", "--fb": "52%" },
    sizes: "(min-width:1024px) 26svh, 44vw",
    delay: 0.45,
    x: 6,
  },
  {
    src: "/img/cut-maroon.png",
    ratio: "1072/1402",
    place: "bottom-0 left-[15%] w-[70%]",
    fade: { "--fr": "14%", "--fb": "66%" },
    sizes: "(min-width:1024px) 40svh, 66vw",
    delay: 0.9,
    x: 0,
  },
];

// Brief §5.2: who he is, short — one instinct applied across four unrelated industries. The frame that
// makes everything below it make sense.
// The HOP opening's shape (Scene.tsx): the name of the instinct across the top, the statement and the four
// steps on the left, and the collage of him on the right, in front of the softened light of a room.
export default function Thesis() {
  return (
    <Sheet id="story" theme="dark" wash="plum" className="bg-plum text-bone">
      <Scene
        backdrop={<Backdrop src="/img/ig-portrait.jpg" pos="object-[50%_30%]" soft />}
        heading={
          <Giant as="h2" n={16} max={20}>
            One instinct<span className="accent ml-[0.5em]">four markets.</span>
          </Giant>
        }
        figure={
          <figure
            role="img"
            aria-label="Kalpesh Kinariwala in a maroon blazer, a white jacket and a black dinner suit"
            className="relative mx-auto -mb-20 aspect-[4/5] w-full max-w-[460px] md:-mb-28 lg:mx-0 lg:-mb-[6svh] lg:h-[calc(100%+6svh)] lg:w-auto lg:max-w-none lg:shrink-0"
          >
            {COLLAGE.map((c) => (
              <div
                key={c.src}
                data-cutout={c.delay}
                data-cutout-x={c.x}
                className={`cutout absolute ${c.place}`}
                style={{ aspectRatio: c.ratio, ...c.fade } as CSSProperties}
              >
                <Image src={c.src} alt="" fill sizes={c.sizes} className="object-contain object-bottom" />
              </div>
            ))}
          </figure>
        }
      >
        <p data-fade className="t-lead max-w-[40ch] text-bone">
          He doesn’t choose industries. He chooses fragmented markets — mining chemicals, capital markets, real estate
          and now live entertainment — and runs the same instinct through each.
        </p>
        <ol data-fade className="grid gap-x-10 gap-y-8 border-t border-white/15 pt-6 sm:grid-cols-2 lg:gap-y-[3svh]">
          {INSTINCT.map((s) => (
            <li key={s.t}>
              <span className="t-title block">{s.t}</span>
              <span className="t-body mt-2 block text-bone/75">{s.d}</span>
            </li>
          ))}
        </ol>
      </Scene>
    </Sheet>
  );
}
