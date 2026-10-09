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
import { SITE_URL } from "./_components/data";

// Structured data so search engines connect the name to the man and his profiles (brief §8).
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kalpesh Kinariwala",
  url: SITE_URL,
  jobTitle: "Founder",
  description: "Platform builder across mining chemicals, capital markets, real estate and live entertainment.",
  homeLocation: { "@type": "Place", name: "Dubai, United Arab Emirates" },
  sameAs: ["https://www.instagram.com/kalpesh.kinariwala/", "https://www.linkedin.com/in/kalpeshkinariwala/"],
};

// The home page is a stack of sheets, each sliding over the last (see Sheets.tsx).
export default function Home() {
  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
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
