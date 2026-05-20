import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repoName = 'decore-ai';
const basePath = isGitHubPages ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGitHubPages
    ? {
        output: 'export',
        trailingSlash: true,
        basePath,
        assetPrefix: `${basePath}/`,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
