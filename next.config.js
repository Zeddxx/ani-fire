/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.flawlessfiles.com",
      },
    ],
  },
  experimental: {
  missingSuspenseWithCSRBailout: false,
 },
};

module.exports = nextConfig;
