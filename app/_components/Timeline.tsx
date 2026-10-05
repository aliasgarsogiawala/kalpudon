import Giant from "./Giant";
import Sheet from "./Sheet";
import Scene, { Backdrop } from "./Scene";
import { MILESTONES } from "./data";

// The career in order, after the figures: the HOP opening's shape (Scene.tsx) with the milestones across
// the full width — two rows of four on laptops, joined by a gold line that draws itself as the reader
// scrolls, and one column down a gold line on phones. Behind it, the softened light of the Pantheon
// celebration from his media profile.
export default function Timeline() {
  return (
    <Sheet id="timeline" theme="dark" wash="aubergine" className="bg-aubergine text-bone">
      <Scene
        backdrop={<Backdrop src="/img/kk-timeline-soft.jpg" pos="object-[60%_30%]" soft />}
        heading={
          <Giant as="h2" n={10} max={14}>
            Since 2001<span className="accent">the milestones.</span>
          </Giant>
        }
      >
        <ol className="relative grid gap-y-10 pl-8 md:grid-cols-2 md:gap-x-10 md:pl-0 lg:grid-cols-4 lg:gap-y-[5svh]">
          {/* Phones: one gold line down the left edge */}
          <span aria-hidden data-draw="y" className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gold/60 md:hidden" />
          {MILESTONES.map((m, i) => (
            <li key={m.y + m.t} data-fade className="relative md:pt-7">
              {/* From tablets up, each row has its own gold line under the years' dots */}
              {i % 4 === 0 && (
                <span aria-hidden data-draw="x" className="absolute left-0 top-[5px] hidden h-px w-[calc(400%+7.5rem)] origin-left bg-gold/60 lg:block" />
              )}
              {i % 2 === 0 && (
                <span aria-hidden data-draw="x" className="absolute left-0 top-[5px] hidden h-px w-[calc(200%+2.5rem)] origin-left bg-gold/60 md:block lg:hidden" />
              )}
              <span aria-hidden className="absolute -left-8 top-1.5 size-[11px] rounded-full bg-gold shadow-[0_0_14px_rgb(184_138_66/.8)] md:left-0 md:top-0" />
              <p className="display gold-glow text-[clamp(32px,2vw+2svh,52px)] leading-none">{m.y}</p>
              <p className="t-title mt-3">{m.t}</p>
              <p className="t-note mt-2 max-w-[34ch] text-bone/70">{m.d}</p>
            </li>
          ))}
        </ol>
      </Scene>
    </Sheet>
  );
}
