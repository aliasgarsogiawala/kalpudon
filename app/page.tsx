import Shell from "./_components/Shell";
import Hero from "./_components/Hero";
import Thesis from "./_components/Thesis";
import Proof from "./_components/Proof";
import Numbers from "./_components/Numbers";
import Timeline from "./_components/Timeline";
import Hop from "./_components/Hop";
import Ideas from "./_components/Ideas";
import Podcasts from "./_components/Podcasts";
import Legacy from "./_components/Legacy";
import Doors from "./_components/Doors";
import type { Metadata } from "next";
import { getContent } from "./_lib/content";
import { DESCRIPTION, NAME, PERSON_ID, WEBSITE_ID, jsonLd, pageMeta, person, url } from "./_lib/seo";

export const metadata: Metadata = pageMeta({ title: "Platform builder", description: DESCRIPTION, path: "/", image: "home", type: "profile" });

// Structured data so search engines connect the name to the man, his companies, his awards and his
// profiles elsewhere (brief §8): the site, the profile page, and the person both point to.
export default async function Home() {
  const { awards } = await getContent();
  const ld = jsonLd(
    { "@type": "WebSite", "@id": WEBSITE_ID, url: url("/"), name: NAME, description: DESCRIPTION, inLanguage: "en", publisher: { "@id": PERSON_ID } },
    { "@type": "ProfilePage", url: url("/"), name: `${NAME} — Platform builder`, isPartOf: { "@id": WEBSITE_ID }, mainEntity: { "@id": PERSON_ID } },
    person({ award: awards.map((a) => [a.what, a.who, a.y].filter(Boolean).join(", ")) }),
  );
  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <main>
        <Hero />
        <Thesis />
        <Proof />
        <Numbers />
        <Timeline />
        <Hop />
        <Ideas />
        <Podcasts />
        <Legacy />
        <Doors />
      </main>
    </Shell>
  );
}
