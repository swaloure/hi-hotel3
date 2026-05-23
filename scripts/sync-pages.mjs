import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const outDir = path.join(rootDir, 'out')
const docsDir = path.join(rootDir, 'docs')

await rm(docsDir, { recursive: true, force: true })
await mkdir(docsDir, { recursive: true })
await cp(outDir, docsDir, { recursive: true })
await writeFile(path.join(docsDir, '.nojekyll'), '')

console.log('Copied static export from out/ to docs/.')
