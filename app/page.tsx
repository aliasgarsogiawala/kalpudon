import Shell from "./_components/Shell";
import Hero from "./_components/Hero";
import Thesis from "./_components/Thesis";
import Proof from "./_components/Proof";
import Hop from "./_components/Hop";
import Record from "./_components/Record";
import Ideas from "./_components/Ideas";
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
  description: "Platform builder across iodine, private capital, real estate and live entertainment.",
  homeLocation: { "@type": "Place", name: "Dubai, United Arab Emirates" },
  sameAs: ["https://www.instagram.com/kalpesh.kinariwala/"],
};

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
        <Hop />
        <Record />
        <Ideas />
        <Legacy />
        <Doors />
      </main>
    </Shell>
  );
}
