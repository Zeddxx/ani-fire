/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.noitatnemucod.net",
      },
    ],
  },
};

export default nextConfig;
