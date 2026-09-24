import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "../../_components/Shell";
import Crop from "../../_components/Crop";
import { DOORS, doorHref } from "../../_components/data";
import { Directory } from "../../_components/Doors";
import DoorForm from "./DoorForm";

// One page per audience door (brief §3, §5.7).
export const dynamicParams = false;

export function generateStaticParams() {
  return DOORS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/contact/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const door = DOORS.find((d) => d.slug === slug);
  if (!door) return {};
  return {
    title: `${door.label} — Contact`,
    description: `${door.body} ${door.who}.`,
    alternates: { canonical: doorHref(door) },
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
        {/* Split: the door on amethyst, the form beside it — both inside the first screen */}
        <section className="grid pt-[72px] lg:min-h-[100svh] lg:grid-cols-12 lg:pt-[88px]">
          <div className="bg-violet px-5 pb-12 pt-8 text-bone md:px-10 lg:col-span-5 lg:pb-14 lg:pt-10">
            <nav aria-label="Breadcrumb" data-fade className="flex items-center gap-2.5 text-[14px] text-bone/60">
              <Link href="/contact" className="transition-colors hover:text-bone">
                Contact
              </Link>
              <span aria-hidden>/</span>
              <span className="text-champagne">{door.label}</span>
            </nav>

            <div data-reveal="0.2" className="relative mt-8 aspect-[16/10] w-full">
              <div data-reveal-clip className="absolute inset-0 overflow-hidden bg-carbon">
                <Image src={door.img} alt="" fill priority sizes="(min-width:1024px) 36vw, 90vw" className="object-cover" />
              </div>
              <Crop />
            </div>

            <h1 data-split className="display mt-10 text-[clamp(36px,3.6vw,60px)]">
              {door.label}
            </h1>
            <p data-fade className="mt-4 text-[18px] text-bone">
              {door.who}
            </p>
            <p data-fade className="mt-3 max-w-[460px] text-[16px] leading-[1.65] text-bone/70">
              {door.body}
            </p>

            <div data-fade className="mt-8">
              {door.page && (
                <Link
                  href={door.page.href}
                  className="mt-6 inline-block border-b border-champagne pb-1 text-[15px] text-champagne transition-colors hover:border-bone hover:text-bone"
                >
                  {door.page.label} →
                </Link>
              )}
            </div>
          </div>

          <div id="write" className="bg-obsidian px-5 pb-16 pt-12 text-bone md:px-10 lg:col-span-7 lg:flex lg:flex-col lg:justify-center lg:px-16 lg:py-14">
            <div className="w-full max-w-[720px]">
              <p data-fade className="label text-champagne">
                Write to the {door.desk} desk
              </p>
              <h2 data-split className="display mt-4 text-[clamp(30px,2.8vw,46px)]">
                Tell us what you need.
              </h2>
              <p data-fade className="mt-4 max-w-[460px] text-[16px] leading-[1.65] text-ash">
                This note goes only to the people who handle {door.desk} enquiries.
              </p>
              <div data-fade className="mt-10">
                <DoorForm label={door.label} desk={door.desk} field={door.field} cta={door.cta} topics={door.offers} />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-carbon text-bone">
          <div className="mx-auto max-w-[1680px] px-5 py-14 md:px-10 md:py-16">
            <h2 data-fade className="text-[20px] font-medium">
              Not the right door?
            </h2>
            <Directory doors={others} className="mt-6" />
          </div>
        </section>
      </main>
    </Shell>
  );
}
