import type { Metadata } from "next";
import Shell from "../_components/Shell";
import Doors from "../_components/Doors";
import PageHero from "../_components/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Capital, real estate JVs, cultural partnerships, media and speaking enquiries for Kalpesh Kinariwala.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Shell>
      <main>
        <PageHero
          word="Enquiries"
          photo={{ src: "/img/solo-enquiries-v3.jpg", alt: "Kalpesh Kinariwala", pos: "object-[50%_20%]" }}
          line="pick your door."
          intro="Capital. Real Estate JVs. Cultural Partnerships. Media. Speaking Engagements. Every enquiry is routed directly to the desk that handles it."
        />
        <Doors page />
      </main>
    </Shell>
  );
}
