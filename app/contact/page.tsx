import type { Metadata } from "next";
import Shell from "../_components/Shell";
import Doors from "../_components/Doors";
import PageHero from "../_components/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Capital, HOP partnerships, careers, press and general enquiries for Kalpesh Kinariwala.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Shell>
      <main>
        <PageHero
          label="Contact"
          word="Let’s talk"
          script="pick your door."
          intro="Tell me what you are here for. Each note goes straight to the people who handle it: capital, HOP partnerships, careers, press, and everything else."
        />
        <Doors page />
      </main>
    </Shell>
  );
}
