/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  target: "serverless",
  env: {
    BASE_URL: "https://d1o3zd0e92rh04.cloudfront.net",
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
