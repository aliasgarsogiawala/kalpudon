import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "./_components/data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    images: [{ url: "/img/window-city.jpg", width: 2200, height: 1467, alt: "Kalpesh Kinariwala" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <noscript>
          <style>{`[data-fade],[data-split]{opacity:1!important;transform:none!important}.loader{display:none!important}`}</style>
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
