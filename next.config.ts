import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Cloudinary usually uses this subdomain
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;