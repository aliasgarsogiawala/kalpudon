import Link from "next/link";
import { DOORS, doorHref } from "./data";
import Logo from "./Logo";

const SITE = [
  { href: "/", label: "Home" },
  { href: "/#proof", label: "The work" },
  { href: "/#hop", label: "HOP" },
  { href: "/ideas", label: "Ideas" },
  { href: "/press", label: "Press" },
];

const ELSEWHERE = [
  { href: "https://www.instagram.com/kalpesh.kinariwala/", label: "Instagram" },
  { href: "https://www.linkedin.com/", label: "LinkedIn" }, // TODO: his LinkedIn profile URL
];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[14px] text-ash">{title}</h2>
      <ul className="mt-5 space-y-3 text-[16px]">{children}</ul>
    </div>
  );
}

const link = "text-bone/85 transition-colors duration-300 hover:text-champagne";

// A plain closing page: who he is in one sentence, then every way onward — pages, doors, profiles.
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-carbon text-bone">
      <div className="mx-auto max-w-[1680px] px-5 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo className="mb-8 size-12" />
            <p className="max-w-[22ch] text-[clamp(23px,2.1vw,32px)] font-medium leading-[1.2] tracking-[-0.02em]">
              Kalpesh Kinariwala builds platforms in fragmented markets. Based in Dubai, since 2001.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block border-b border-champagne pb-1 text-[16px] text-champagne transition-colors hover:border-bone hover:text-bone"
            >
              Write to him →
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-12 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            <Column title="Site">
              {SITE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Contact">
              {DOORS.map((d) => (
                <li key={d.slug}>
                  <Link href={doorHref(d)} className={link}>
                    {d.label}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Elsewhere">
              {ELSEWHERE.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" className={link}>
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </Column>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 py-7 text-[14px] text-ash md:mt-16 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Kalpesh Kinariwala · Dubai, United Arab Emirates</p>
          <p>Photography shown is placeholder until the brand shoot.</p>
        </div>
      </div>
    </footer>
  );
}
