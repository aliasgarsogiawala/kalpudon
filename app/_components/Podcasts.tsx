import Giant from "./Giant";
import Sheet, { WRAP } from "./Sheet";
import PodcastStage from "./PodcastStage";
import { byTheme } from "./data";
import { getContent, youtubeId } from "../_lib/content";

// Raj, 2026-10-09: the podcasts get a page of their own and a section here. One screen: the giant word,
// the first episode as the player on the left, the others listed on the right by theme to swap into it.
export default async function Podcasts() {
  const episodes = (await getContent()).podcasts
    .map((p) => ({ id: youtubeId(p.url), title: p.title, theme: p.theme ?? "", headline: p.headline || p.title, dek: p.dek ?? "" }))
    .filter((p): p is typeof p & { id: string } => p.id !== null)
    .slice(0, 5);
  if (episodes.length === 0) return null;
  return (
    <Sheet id="podcasts" theme="dark" wash="plum" className="bg-plum text-bone">
      <div className={`${WRAP} relative z-[1] flex flex-col pb-20 pt-[132px] md:pb-28 md:pt-[180px] lg:h-[100svh] lg:min-h-[680px] lg:pb-[6svh] lg:pt-[max(100px,13svh)]`}>
        <Giant as="h2" n={15} max={16}>
          In Conversation<span className="accent ml-[0.5em]">ideas, decisions and lessons.</span>
        </Giant>
        <PodcastStage groups={byTheme(episodes)} />
      </div>
    </Sheet>
  );
}
