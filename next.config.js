/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  publicRuntimeConfig: {
    GOOGLE_RECAPTCHA_KEY: process.env.SITE_RECAPTCHA_KEY,
    API_BASE_URL: process.env.API_BASE_URL,
    DOMAIN_BASE_URL: process.env.DOMAIN_BASE_URL,
    SERVICE_API_BASE_URL: process.env.SERVICE_API_BASE_URL,
    GOOGLE_TAG: process.env.GOOGLE_TAG,
    TAWK_PROPERTY_ID: process.env.TAWK_PROPERTY_ID,
    TAWK_ID: process.env.TAWK_ID,
    ENABLE_SNOWFALL: process.env.ENABLE_SNOWFALL,
    MAINTENANCE_MODE: process.env.MAINTENANCE_MODE,
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    DOMAIN_BASE_URL: process.env.DOMAIN_BASE_URL,
    SERVICE_API_BASE_URL: process.env.SERVICE_API_BASE_URL,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    return config;
  },
  async rewrites() {
    return [
      {
        source: `/api/:path*`,
        destination: `${process.env.PROXY_API_BASE_URL}/:path*`,
      },
      {
        source: `/services/pdf/:path*`,
        destination: `${process.env.SERVICE_API_BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
