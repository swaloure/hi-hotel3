const PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const EXTERNAL_OR_SPECIAL_URL = /^(https?:|data:|blob:)/i

export function withBasePath(path: string): string {
  if (!path) return path
  if (EXTERNAL_OR_SPECIAL_URL.test(path)) return path
  if (!path.startsWith('/')) return path
  if (!PUBLIC_BASE_PATH) return path
  if (path === PUBLIC_BASE_PATH || path.startsWith(`${PUBLIC_BASE_PATH}/`)) return path

  return `${PUBLIC_BASE_PATH}${path}`
}
