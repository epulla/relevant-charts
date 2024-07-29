/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracingIncludes: {
        '/': ['src/examples/samples/**/*'],
    }
  }
};

export default nextConfig;
