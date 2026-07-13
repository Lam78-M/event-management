import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // 🎯 এখানে ইমেজের রিমোট প্যাটার্ন যুক্ত করা হলো
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // উনস্প্ল্যাশ বা অন্য কোনো ইমেজ সোর্স থাকলে সেটার সেফটিও হয়ে গেল
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;