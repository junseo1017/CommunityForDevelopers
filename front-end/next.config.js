/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "firebasestorage.googleapis.com",
      "kdt-sw2-seoul-team06.elicecoding.com",
    ],
  },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
