/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.example.com", "localhost:1337", "", "localhost"],
  },
}

module.exports = nextConfig
