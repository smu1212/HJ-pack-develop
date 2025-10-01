/* eslint-disable @ts-ignore */

import type { NextConfig } from 'next';
import * as packages from './package.json' with { type: 'json' };

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  cleanDistDir: true,
  output: 'export',
  pageExtensions: ['tsx', 'jsx', 'mdx', 'ts'],
  crossOrigin: 'anonymous',
  reactStrictMode: !isProd,

  compiler: isProd
    ? {
        removeConsole: {
          exclude: ['error', 'warn'],
        },
      }
    : {},
  images: {
    unoptimized: true,
  },
  env: {
    IS_DEBUG: isProd ? 'false' : 'true',
    NEXT_PUBLIC_APP_NAME: packages.app_name,
    NEXT_PUBLIC_APP_VERSION: packages.version,
    NEXT_PUBLIC_APP_DESCRIPTION: packages.description,
    NEXT_PUBLIC_APP_AUTHOR: packages.author.name,
    NEXT_PUBLIC_APP_AUTHOR_URL: packages.author.url,
  },
  devIndicators: {
    buildActivityPosition: 'bottom-left',
    appIsrStatus: true,
    buildActivity: true,
  },
  logging: isProd
    ? {}
    : {
        fetches: {
          fullUrl: true,
        },
      },
};

export default nextConfig;
