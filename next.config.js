/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
      {
        protocol: 'https',
        hostname: 'i.dummyjson.com', // برای اطمینان، بعضی عکس‌ها از این دامنه میان
      },
    ],
  },
};

module.exports = nextConfig;