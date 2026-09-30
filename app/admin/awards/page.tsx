import { getContentForEditing } from "../../_lib/content";
import { requireAdmin } from "../../_lib/session";
import AdminBar from "../_bar";
import AwardsForm from "./AwardsForm";

export default async function AdminAwards() {
  await requireAdmin();
  const { awards } = await getContentForEditing();
  return (
    <>
      <AdminBar current="/admin/awards" />
      <main className="mx-auto max-w-[820px] px-5 pt-12 md:px-10">
        <h1 className="t-statement">Awards</h1>
        <p className="t-body mt-2 text-bone/60">
          Every award is listed on the press page. Ones with a photograph can lead the section; up to three can also show on
          the home page, under the four businesses.
        </p>
        <AwardsForm initial={awards} />
      </main>
    </>
  );
}
