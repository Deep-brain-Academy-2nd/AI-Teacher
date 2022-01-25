/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'https://sharp-ardinghelli-1c3c0f.netlify.app',
    MONGODB_URI:
      'mongodb+srv://salvation:hokyun214@cluster0.zrxxs.mongodb.net/AI-Teacher?retryWrites=true&w=majority',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dev.aistudios.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
