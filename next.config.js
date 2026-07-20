/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
    localPatterns: [{ pathname: "/logo.png", search: "?v=2" }],
  },
};

module.exports = nextConfig;
