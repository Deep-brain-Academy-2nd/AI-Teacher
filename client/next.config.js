/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/getToken/:path*",
        destination: "https://dev.aistudios.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
