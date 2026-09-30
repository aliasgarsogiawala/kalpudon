import Link from "next/link";
import { getContentForEditing } from "../../_lib/content";
import { requireAdmin } from "../../_lib/session";
import AdminBar from "../_bar";
import { buttonClass } from "../_fields";
import IdeaRowActions from "./IdeaRowActions";

export default async function AdminIdeas({ searchParams }: PageProps<"/admin/ideas">) {
  await requireAdmin();
  const { ideas } = await getContentForEditing();
  const saved = (await searchParams).saved === "1";
  return (
    <>
      <AdminBar current="/admin/ideas" />
      <main className="mx-auto max-w-[1100px] px-5 py-12 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="t-statement">Ideas</h1>
            <p className="t-body mt-2 text-bone/60">In this order on the Ideas page. The first three also appear on the home page.</p>
          </div>
          <Link href="/admin/ideas/new" className={buttonClass}>
            New idea
          </Link>
        </div>
        {saved && (
          <p role="status" className="mt-6 text-[14px] text-gold-soft">
            Saved. The site is updated.
          </p>
        )}
        <ol className="mt-8 border-t border-white/10">
          {ideas.map((idea, i) => (
            <li key={idea.slug} className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/10 py-4">
              <span className="w-6 text-[13px] text-stone">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <Link href={`/admin/ideas/${idea.slug}`} className="t-title block hover:text-gold-soft">
                  {idea.title}
                </Link>
                <span className="t-note text-bone/55">
                  {idea.category} · {idea.format} · {idea.date ? `published ${idea.date}` : "in preparation"}
                  {i < 3 && " · on the home page"}
                </span>
              </div>
              <IdeaRowActions slug={idea.slug} first={i === 0} last={i === ideas.length - 1} />
            </li>
          ))}
          {ideas.length === 0 && <li className="t-body py-8 text-bone/60">No ideas yet.</li>}
        </ol>
      </main>
    </>
  );
}
