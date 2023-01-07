/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'img.youtube.com',
      'i.ytimg.com',
      'encrypted-tbn0.gstatic.com',
      'lh3.googleusercontent.com',
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
