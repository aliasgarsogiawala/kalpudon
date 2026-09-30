import Link from "next/link";
import { logout } from "./actions";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/ideas", label: "Ideas" },
  { href: "/admin/press", label: "Press" },
  { href: "/admin/awards", label: "Awards" },
];

// The admin's own header: its sections, a way back to the site, and signing out.
export default function AdminBar({ current }: { current: string }) {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4 md:px-10">
        <Link href="/admin" className="display text-[18px]">
          Kalpesh Kinariwala <span className="font-normal text-gold-soft">admin</span>
        </Link>
        <nav aria-label="Admin" className="flex flex-wrap gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={current === l.href ? "page" : undefined}
              className={`rounded-full px-3.5 py-1.5 text-[14px] transition-colors ${current === l.href ? "bg-white/10 text-bone" : "text-bone/60 hover:text-bone"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4 text-[14px]">
          <a href="/" target="_blank" rel="noreferrer" className="text-bone/60 hover:text-bone">
            View site ↗
          </a>
          <form action={logout}>
            <button className="text-bone/60 hover:text-bone">Sign out</button>
          </form>
        </div>
      </div>
    </header>
  );
}
