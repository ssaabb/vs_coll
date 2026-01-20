import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Vercel/Next.js to include the ../content folder in the serverless function bundle
  outputFileTracingIncludes: {
    '/api/**/*': ['../content/**/*', './content/**/*'],
    '/docs/**/*': ['../content/**/*', './content/**/*'],
  },
} as any;

export default nextConfig;
