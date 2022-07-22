/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "firebasestorage.googleapis.com"],
  },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
