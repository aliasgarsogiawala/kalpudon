import Link from "next/link";
import { getContentForEditing } from "../_lib/content";
import { requireAdmin } from "../_lib/session";
import AdminBar from "./_bar";

export default async function AdminHome() {
  await requireAdmin();
  const content = await getContentForEditing();
  const live = content.ideas.filter((i) => i.date).length;
  const cards = [
    { href: "/admin/ideas", title: "Ideas", note: `${live} published, ${content.ideas.length - live} in preparation`, body: "Essays and talks for the Ideas hub. The first three also appear on the home page." },
    { href: "/admin/press", title: "Press", note: `${content.press.facts.length} facts, ${content.press.kit.length} media-kit files`, body: "The biography, the fact sheet and the files journalists can download." },
    { href: "/admin/awards", title: "Awards", note: `${content.awards.length} awards`, body: "Awards and recognition for the press page, and the three shown on the home page." },
  ];
  return (
    <>
      <AdminBar current="/admin" />
      <main className="mx-auto max-w-[1100px] px-5 py-12 md:px-10">
        <h1 className="t-statement">What would you like to update?</h1>
        <p className="t-body mt-3 text-bone/60">
          {content.savedAt
            ? `Last saved ${new Date(content.savedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dubai" })} (Dubai time).`
            : "Nothing has been saved yet: the site is showing the content it launched with."}{" "}
          Changes appear on the site as soon as you save.
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="block h-full rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-gold/60">
                <span className="t-title block">{c.title}</span>
                <span className="t-note mt-1 block text-gold-soft">{c.note}</span>
                <span className="t-body mt-4 block text-bone/65">{c.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
