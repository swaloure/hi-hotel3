/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production'
const repository = process.env.PAGES_REPOSITORY ?? process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const customDomain = process.env.PAGES_CUSTOM_DOMAIN ?? ''
const isUserOrOrgPagesRepo = repository.toLowerCase().endsWith('.github.io')
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true' || Boolean(process.env.PAGES_REPOSITORY)
const basePath = isProduction && isGitHubPagesBuild && repository && !isUserOrOrgPagesRepo && !customDomain
  ? `/${repository}`
  : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
