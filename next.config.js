/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // Disable source maps in development
  optimizeFonts: false, // Disable font optimization
  images: {
    domains: ["flowbite.s3.amazonaws.com", "via.placeholder.com"],
  },
};

module.exports = nextConfig;
