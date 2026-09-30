import type { Metadata } from "next";

// The team's CMS (brief §8). Kept out of search engines and away from the public site's chrome.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-svh bg-ink text-bone">{children}</div>;
}
