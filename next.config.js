/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['i.ibb.co','i.ibb.co.com'],
  },
};

module.exports = nextConfig;
