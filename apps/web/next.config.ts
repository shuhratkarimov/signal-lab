// apps/web/next.config.ts
import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '../..'), // workspace root
  },
  // CORS va boshqa sozlamalar
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`, // Backend API ga proxy
      },
    ];
  },
};

export default nextConfig;