import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photographs uploaded through the admin live in the site's Vercel Blob store
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
};

export default nextConfig;
