/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracingIncludes: {
        '/': ['public/samples/**/*.json'],
    }
  }
};

export default nextConfig;
