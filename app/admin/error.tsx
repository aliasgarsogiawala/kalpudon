"use client";

import { buttonClass } from "./_fields";

// If the content store can't be reached, the admin says so instead of showing a blank error page.
export default function AdminError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main className="mx-auto max-w-[620px] px-5 py-24 md:px-10">
      <h1 className="t-statement">The content didn&rsquo;t load.</h1>
      <p className="t-body mt-3 text-bone/60">
        The content store didn&rsquo;t answer. Nothing has been lost; try again in a moment.
      </p>
      <button type="button" onClick={retry} className={`${buttonClass} mt-8`}>
        Try again
      </button>
    </main>
  );
}
