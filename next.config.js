const { withFaust } = require('@faustwp/core');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,
  
  // Performance optimizations (removed experimental features that were causing issues)
  
  // Power by header
  poweredByHeader: false,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '10013',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'headless.local',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'headless.local',
        pathname: '/wp-content/uploads/**',
      },
    ],
    // Optimize image loading
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    // Optimize SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // API rewrites
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'http://localhost:10013/graphql',
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: false,
      },
    ];
  },

  // Output configuration
  outputFileTracingRoot: process.cwd(),
  
  // Reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = withFaust(nextConfig);
