import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "s.gravatar.com",
      "cdn.auth0.com",
      "live.staticflickr.com",
      "melong.com",
      "i.etsystatic.com",
      "i.sstatic.net",
      "www.melong.com",
      "imgcdn.stablediffusionweb.com",
      "img.freepik.com",
      "images.squarespace-cdn.com",
    ],
  },
};

export default nextConfig;
