import Giant from "./Giant";
import Sheet from "./Sheet";
import Scene, { ScenePhoto } from "./Scene";
import { NUMBERS } from "./data";

// The record in figures, after the four chapters: the HOP opening's shape (Scene.tsx), nine figures on the
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
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:gap-y-[2.4svh]">
          {NUMBERS.map((n) => (
            <div key={n.v} data-fade className="border-t border-white/15 pt-5 lg:pt-[1.6svh]">
              <dt className="display gold-glow text-[clamp(40px,2.2vw+2.6svh,84px)] leading-none" data-count>
                {n.k}
              </dt>
              <dd className="t-title mt-3 lg:mt-[1.2svh]">{n.v}</dd>
              {/* On short laptop screens the nine figures keep their labels and drop the small print, to stay one screen */}
              <dd className="t-note mt-1 text-bone/60 lg:mt-[0.4svh] lg:[@media(max-height:820px)]:hidden">{n.d}</dd>
            </div>
          ))}
        </dl>
      </Scene>
    </Sheet>
  );
}
