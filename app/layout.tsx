import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "./_components/data";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Kalpesh Kinariwala is a Dubai-based platform builder across iodine, private capital, real estate and live entertainment (HOP Events).";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Kalpesh Kinariwala — Platform builder", template: "%s — Kalpesh Kinariwala" },
  description,
  openGraph: {
    type: "profile",
    siteName: "Kalpesh Kinariwala",
    title: "Kalpesh Kinariwala — Platform builder",
    description,
    images: [{ url: "/img/ig-portrait.jpg", width: 1080, height: 1350, alt: "Kalpesh Kinariwala" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} antialiased`}>
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
