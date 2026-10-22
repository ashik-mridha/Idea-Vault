/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/ideas", destination: "/items", permanent: true },
      { source: "/idea/:id", destination: "/items/:id", permanent: true },
      { source: "/add-idea", destination: "/items/add", permanent: true },
      { source: "/my-ideas", destination: "/items/manage", permanent: true },
    ];
  },
};

export default nextConfig;
