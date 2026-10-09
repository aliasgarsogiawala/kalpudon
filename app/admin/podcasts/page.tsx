import { getContentForEditing } from "../../_lib/content";
import { requireAdmin } from "../../_lib/session";
import AdminBar from "../_bar";
import PodcastsForm from "./PodcastsForm";

export default async function AdminPodcasts() {
  await requireAdmin();
  const { podcasts } = await getContentForEditing();
  return (
    <>
      <AdminBar current="/admin/podcasts" />
      <main className="mx-auto max-w-[820px] px-5 pt-12 md:px-10">
        <h1 className="t-statement">Podcasts</h1>
        <p className="t-body mt-2 text-bone/60">
          Every episode is listed on the podcasts page, in this order, and plays there from YouTube. The first five also
          show on the home page. The picture comes from YouTube on its own.
        </p>
        <PodcastsForm initial={podcasts} />
      </main>
    </>
  );
}
