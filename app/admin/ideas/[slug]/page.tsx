import { notFound } from "next/navigation";
import { getContentForEditing, type Idea } from "../../../_lib/content";
import { requireAdmin } from "../../../_lib/session";
import AdminBar from "../../_bar";
import IdeaForm from "./IdeaForm";

const BLANK: Idea = { slug: "", title: "", format: "Article", category: "The Widest", date: "", dek: "", body: "", video: "" };

export default async function EditIdea({ params }: PageProps<"/admin/ideas/[slug]">) {
  await requireAdmin();
  const { slug } = await params;
  const idea = slug === "new" ? null : (await getContentForEditing()).ideas.find((i) => i.slug === slug);
  if (slug !== "new" && !idea) notFound();
  return (
    <>
      <AdminBar current="/admin/ideas" />
      <main className="mx-auto max-w-[820px] px-5 pt-12 md:px-10">
        <h1 className="t-statement">{idea ? "Edit idea" : "New idea"}</h1>
        <IdeaForm initial={idea ?? BLANK} originalSlug={idea?.slug ?? null} />
      </main>
    </>
  );
}
