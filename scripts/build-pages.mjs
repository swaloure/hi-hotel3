import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const nextBin = path.join(rootDir, 'node_modules', 'next', 'dist', 'bin', 'next')

const repository =
  process.env.PAGES_REPOSITORY ??
  process.env.GITHUB_REPOSITORY?.split('/')[1] ??
  'hi-hotel3'
const customDomain = process.env.PAGES_CUSTOM_DOMAIN ?? 'maza.kz'

const exitCode = await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [nextBin, 'build'], {
    cwd: rootDir,
    env: {
      ...process.env,
      PAGES_REPOSITORY: repository,
      PAGES_CUSTOM_DOMAIN: customDomain,
    },
    stdio: 'inherit',
  })

  child.once('error', reject)
  child.once('exit', (code) => resolve(code ?? 1))
})

if (exitCode !== 0) {
  process.exit(exitCode)
}

process.env.PAGES_CUSTOM_DOMAIN = customDomain
process.env.EXPECTED_BASE_PATH = customDomain || repository.toLowerCase().endsWith('.github.io')
  ? ''
  : `/${repository}`
await import('./verify-export.mjs')
await import('./sync-pages.mjs')
