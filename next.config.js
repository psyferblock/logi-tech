/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{hostname:"unsplash.com"}]
    },
    experimental: {
        serverActions: true,
      },
}

module.exports = nextConfig
