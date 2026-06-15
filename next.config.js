/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Each client deployment sets NEXT_PUBLIC_CLIENT_ID in their Vercel env vars
  // This lets one codebase serve many clients
}

module.exports = nextConfig
