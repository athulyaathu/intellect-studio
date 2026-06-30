// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Turbopack config (empty) to silence warnings
  turbopack: {},
  // Ensure GSAP works only on client (fallback for webpack)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false };
    }
    return config;
  },
};
export default nextConfig;
