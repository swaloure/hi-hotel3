/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production'
const repository =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ??
  process.env.PAGES_REPOSITORY ??
  'hi-hotel3'
const isUserOrOrgPagesRepo = repository.toLowerCase().endsWith('.github.io')
const basePath = isProduction && repository && !isUserOrOrgPagesRepo ? `/${repository}` : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
