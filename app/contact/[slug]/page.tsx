import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "../../_components/Shell";
import { DOORS } from "../../_components/data";
import { Directory } from "../../_components/Doors";
import { WRAP } from "../../_components/Sheet";
import DoorForm from "./DoorForm";

// One page per audience door (brief §3, §5.7).
export const dynamicParams = false;

export function generateStaticParams() {
  return DOORS.map((d) => ({ slug: d.slug }));
}

// Every door posts to one Formspree form (one inbox); the subject line names the door. Read at build, so a
// change needs a redeploy.
const FORMSPREE_FORM = process.env.FORMSPREE_FORM || null;

export async function generateMetadata({ params }: PageProps<"/contact/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const door = DOORS.find((d) => d.slug === slug);
  if (!door) return {};
  return {
    title: door.label === "Contact" ? "Get in touch" : `${door.label} — Contact`,
    description: `${door.body} ${door.who}.`,
    alternates: { canonical: `/contact/${door.slug}` },
  };
}

export default async function DoorPage({ params }: PageProps<"/contact/[slug]">) {
  const { slug } = await params;
  const door = DOORS.find((d) => d.slug === slug);
  if (!door) notFound();
  const others = DOORS.filter((d) => d.slug !== slug);

  return (
    <Shell>
      <main>
        {/* Split: the door beside its photograph, the form next to it. The door holds still while the form scrolls. */}
        <section data-theme="dark" className="grid bg-ink pt-16 lg:min-h-[100svh] lg:grid-cols-12">
          <div className="relative overflow-hidden bg-coal px-5 pb-12 pt-10 text-bone md:px-10 lg:sticky lg:top-16 lg:col-span-5 lg:flex lg:h-[calc(100svh-64px)] lg:flex-col lg:self-start lg:pb-14 lg:pt-12">
            <div className="absolute inset-0 opacity-55">
              <Image src={door.img} alt="" fill preload sizes="(min-width:1024px) 42vw, 100vw" className={`object-cover ${door.pos ?? "object-[50%_25%]"}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/70 to-coal/40" />

            <nav aria-label="Breadcrumb" data-fade className="relative flex items-center gap-2.5 text-[14px] text-bone/60">
              <Link href="/contact" className="transition-colors hover:text-bone">
                Contact
              </Link>
              <span aria-hidden>/</span>
              <span className="text-gold-soft">{door.label}</span>
            </nav>

            <div className="relative mt-24 lg:mt-auto">
              <h1 data-split className="text-[clamp(56px,6vw,108px)] display leading-[0.92]">
                {door.label}
              </h1>
              <p data-fade className="mt-5 text-[18px] text-bone">
                {door.who}
              </p>
              <p data-fade className="mt-3 max-w-[460px] text-[16px] leading-[1.65] text-bone/70">
                {door.body}
              </p>
              {door.page && (
                <Link
                  href={door.page.href}
                  data-fade
                  className="link-line mt-8 inline-block text-[15px] text-gold-soft"
                >
                  {door.page.label} →
                </Link>
              )}
            </div>
          </div>

          <div id="write" className="bg-ink px-5 pb-16 pt-12 text-bone md:px-10 lg:col-span-7 lg:flex lg:flex-col lg:justify-center lg:px-16 lg:py-14">
            <div className="w-full max-w-[720px]">
              <h2 data-split className="t-statement">
                A note to the {door.desk} desk.
              </h2>
              <p data-fade className="t-body mt-4 max-w-[460px] text-stone">
                It goes only to the people in his office who handle {door.desk} enquiries.
              </p>
              <div data-fade className="mt-10">
                <DoorForm
                  label={door.label}
                  desk={door.desk}
                  field={door.field}
                  cta={door.cta}
                  topics={door.offers}
                  formId={FORMSPREE_FORM}
                />
              </div>
            </div>
          </div>
        </section>

        <section data-theme="dark" className="bg-ink text-bone">
          <div className={`${WRAP} py-24 md:py-40`}>
            <h2 data-fade className="text-[15px] text-stone">
              Not the right door?
            </h2>
            <Directory doors={others} className="mt-6" />
          </div>
        </section>
      </main>
    </Shell>
  );
}
