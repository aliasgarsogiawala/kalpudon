import type { ReactNode } from "react";
import Giant from "./Giant";
import { WashLayer } from "./Sheet";
import Scene, { ScenePhoto } from "./Scene";

// Opening screen for the inner pages, in the shape the client liked on the HOP opening (Scene.tsx): the
// giant word across the top with its light gold line underneath, the intro on the left, and on the right
// a photograph of him — only him, his whole head in frame. Nothing sits behind the words, so they never
// cover a face.
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
    <section data-theme="dark" className="relative isolate bg-ink text-bone">
      <WashLayer wash="ink" />
      <Scene
        heading={
          <Giant as="h1" n={Math.max(word.length, Math.ceil(line.length * 0.3))} max={16}>
            {word}
            <span className="accent">{line}</span>
          </Giant>
        }
        figure={photo && <ScenePhoto src={photo.src} alt={photo.alt} pos={photo.pos} />}
      >
        <div data-fade>
          <p className="t-lead max-w-[36ch] text-bone/90">{intro}</p>
          {aside}
        </div>
      </Scene>
    </section>
  );
}
