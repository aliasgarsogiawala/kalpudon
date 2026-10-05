import Giant from "./Giant";
import Sheet from "./Sheet";
import Scene, { ScenePhoto } from "./Scene";
import { NUMBERS } from "./data";

// The record in figures, after the four chapters: the HOP opening's shape (Scene.tsx), six figures on the
// left counting up as they arrive, him at his desk on the right (KK_MEDIA_PROFILE.pdf, October 2026).
export default function Numbers() {
  return (
    <Sheet id="numbers" theme="dark" wash="plum" className="bg-plum text-bone">
      <Scene
        heading={
          <Giant as="h2" n={17} max={14}>
            Twenty-five years<span className="accent">in numbers.</span>
          </Giant>
        }
        figure={<ScenePhoto src="/img/kk-numbers.jpg" alt="Kalpesh Kinariwala at his desk, smiling" pos="object-[50%_20%]" />}
      >
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:gap-y-[3.5svh]">
          {NUMBERS.map((n) => (
            <div key={n.v} data-fade className="border-t border-white/15 pt-5 lg:pt-[2svh]">
              <dt className="display gold-glow text-[clamp(44px,3vw+3svh,96px)] leading-none" data-count>
                {n.k}
              </dt>
              <dd className="t-title mt-3">{n.v}</dd>
              <dd className="t-note mt-1 text-bone/60">{n.d}</dd>
            </div>
          ))}
        </dl>
      </Scene>
    </Sheet>
  );
}
