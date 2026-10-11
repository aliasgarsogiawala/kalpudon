import type { Metadata } from "next";
import Shell from "../_components/Shell";
import Doors from "../_components/Doors";
import PageHero from "../_components/PageHero";
import { breadcrumbs, jsonLd, pageMeta } from "../_lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Capital, real estate JVs, cultural partnerships, media and speaking enquiries for Kalpesh Kinariwala.",
  path: "/contact",
  image: "contact",
});

export default function ContactPage() {
  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs([{ name: "Contact", path: "/contact" }])) }} />
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
