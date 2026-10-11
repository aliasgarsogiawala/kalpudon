import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "./_components/data";
import { DESCRIPTION, NAME, shareImage } from "./_lib/seo";
import "./globals.css";

// The defaults every page starts from; each page sets its own title, canonical address and share card (app/_lib/seo.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${NAME} — Platform builder`, template: `%s — ${NAME}` },
  description: DESCRIPTION,
  applicationName: NAME,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  publisher: NAME,
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    siteName: NAME,
    locale: "en_GB",
    title: `${NAME} — Platform builder`,
    description: DESCRIPTION,
    images: [shareImage("home")],
  },
  twitter: { card: "summary_large_image", title: `${NAME} — Platform builder`, description: DESCRIPTION, images: [shareImage("home")] },
  verification: { google: "yG8uKVSGCkqIw8lU8Q-84Br1woHJXMKck-PTBXecEMI" },
};

export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark" };

const GA_ID = "G-G7C9N26WN2";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <noscript>
          <style>{`[data-fade],[data-split],[data-giant],.hero-intro{opacity:1!important;transform:none!important}.loader{display:none!important}`}</style>
        </noscript>
        {children}
        <Analytics />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
