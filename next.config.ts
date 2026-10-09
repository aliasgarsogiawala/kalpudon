import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photographs uploaded through the admin live in the site's Vercel Blob store; podcast stills come from YouTube
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
