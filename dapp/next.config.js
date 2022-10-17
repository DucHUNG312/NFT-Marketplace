/** @type {import('next').NextConfig} */
require("dotenv").config();
const hostname = process.env.NEXT_PUBLIC_INFURA_HOST_NAME;
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [hostname, "infura-ipfs.io"],
  },
};

module.exports = nextConfig;
