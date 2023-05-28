/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.SERVER_DNS, 'avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig
