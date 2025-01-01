/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.virtuals.io',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/virtuals/:path*',
        destination: 'https://api.virtuals.io/api/virtuals/:path*',  // Virtuals API
      },
      {
        source: '/api/gecko/:path*',
        destination: 'https://api.geckoterminal.com/api/v2/:path*',  // GeckoTerminal API
      }
    ];
  },
  // Add CORS headers for API requests
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
}

module.exports = nextConfig