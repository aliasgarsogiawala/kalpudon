import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "./_components/data";
import "./globals.css";

const description =
  "Kalpesh Kinariwala is a Dubai-based platform builder across mining chemicals, capital markets, real estate and live entertainment (HOP Events).";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Kalpesh Kinariwala — Platform builder", template: "%s — Kalpesh Kinariwala" },
  description,
  openGraph: {
    type: "profile",
    siteName: "Kalpesh Kinariwala",
    title: "Kalpesh Kinariwala — Platform builder",
    description,
    images: [{ url: "/img/kk-gtn-portrait.jpg", width: 1464, height: 1830, alt: "Kalpesh Kinariwala" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <noscript>
          <style>{`[data-fade],[data-split],[data-giant],.hero-intro{opacity:1!important;transform:none!important}.loader{display:none!important}`}</style>
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
