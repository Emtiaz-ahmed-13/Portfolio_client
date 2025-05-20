import corsConfig from './cross-env.config.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'github.com', 'i.postimg.cc'],
  },
  env: {
    API_BASE_URL: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5001/api/v1'
      : 'https://portfolio-server-5phtsv5ur-emtiaz-ahmed-13s-projects.vercel.app/api/v1',
  },
  ...corsConfig,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development'
          ? 'http://localhost:5001/api/v1/:path*'
          : 'https://portfolio-server-5phtsv5ur-emtiaz-ahmed-13s-projects.vercel.app/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig; 