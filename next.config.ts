import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import BuilderDevTool from '@builder.io/dev-tools/next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = BuilderDevTool()({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'production' ? false : true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: [
              'error',
              'warn',
              'info',
              'debug',
              'log',
              'table',
              'trace',
              'dir',
              'dirxml',
              'group',
              'groupCollapsed',
              'groupEnd',
              'time',
              'timeEnd',
              'timeLog',
              'count',
              'countReset',
              'assert',
              'clear',
              'profile',
              'profileEnd',
            ],
          }
        : false,
  },
  experimental: {
    reactCompiler: true,
  },
});

export default withNextIntl(nextConfig);
