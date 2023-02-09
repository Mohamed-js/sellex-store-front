/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/atefcloud/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "salesforce-cloud-commerce.vercel.app",
        port: "",
        pathname: "/_next/**",
      },
    ],
  },
};

module.exports = nextConfig;
