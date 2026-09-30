import { getContentForEditing } from "../../_lib/content";
import { requireAdmin } from "../../_lib/session";
import AdminBar from "../_bar";
import PressForm from "./PressForm";

export default async function AdminPress() {
  await requireAdmin();
  const { press } = await getContentForEditing();
  return (
    <>
      <AdminBar current="/admin/press" />
      <main className="mx-auto max-w-[820px] px-5 pt-12 md:px-10">
        <h1 className="t-statement">Press</h1>
        <p className="t-body mt-2 text-bone/60">The biography, fact sheet and downloads on the press page.</p>
        <PressForm initial={press} />
      </main>
    </>
  );
}
