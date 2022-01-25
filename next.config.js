/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: "http://localhost:3000",
    MONGODB_URI:
      "mongodb+srv://salvation:hokyun214@cluster0.zrxxs.mongodb.net/AI-Teacher?retryWrites=true&w=majority",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://dev.aistudios.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
