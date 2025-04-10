const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dx3ce2bpx/',
    domains: ['res.cloudinary.com'],
    // Adding this to allow loading static images from the public folder
    unoptimized: true,
  },
};

export default nextConfig;
