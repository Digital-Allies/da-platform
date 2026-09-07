const path = require('path')

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
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingRoot: path.join(__dirname, '../../'),
  // @da-platform/design-system is an npm-workspace-linked package with no
  // build step (raw .tsx source, see packages/design-system/package.json) —
  // Next's official guidance for this is transpilePackages, so its source
  // gets the same SWC/RSC handling as first-party app code rather than
  // relying on default node_modules behavior.
  transpilePackages: ['@da-platform/design-system'],
}

module.exports = nextConfig
