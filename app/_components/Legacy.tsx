import Sheet from "./Sheet";
import Scene, { ScenePhoto } from "./Scene";

// Brief §5.6: the human close, in his register — warmth to balance the authority, so he reads as a
// person, not a machine. The HOP opening's shape (Scene.tsx) without a heading: his words on the left,
// him with the book on the right, over the light of the same afternoon.
export default function Legacy() {
  return (
    <Sheet theme="dark" wash="ink" className="bg-ink text-bone">
      <Scene
        figure={<ScenePhoto src="/img/kk-legacy.jpg" alt="Kalpesh Kinariwala, smiling, at a HOP night" pos="object-[50%_20%]" />}
      >
        <blockquote data-scrub-words className="t-statement max-w-[18ch]">
          Build things that make more people better off. <em className="gold-glow">Be a good human being, and connect with people with an open heart.</em>
        </blockquote>
        <div className="border-t border-white/15 pt-6">
          <p data-fade className="t-body max-w-[420px] text-bone/85">
            Every platform he has built is judged by one test: did the suppliers, investors, residents and artists
            leave better off than they arrived?
          </p>
          <p data-fade className="t-accent mt-6">
            — Kalpesh
          </p>
        </div>
      </Scene>
    </Sheet>
  );
}
