import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const outDir = path.join(rootDir, 'out')
const basePath = process.env.EXPECTED_BASE_PATH ?? ''

const routes = [
  '',
  'almaty',
  'astana',
  'booking',
  'booking/almaty',
  'booking/astana',
  'privacy',
  'offer',
]

const pages = new Map()

for (const route of routes) {
  const file = route ? path.join(outDir, route, 'index.html') : path.join(outDir, 'index.html')
  const html = await readFile(file, 'utf8')

  assert.match(html, /<main(?:\s|>)/i, `${route || '/'} must contain <main>`)
  assert.match(html, /<h1(?:\s|>)/i, `${route || '/'} must contain <h1>`)
  pages.set(route, html)
}

const home = pages.get('')
assert.ok(home.includes('https://wa.me/77009845374'), 'Home page must contain the primary WhatsApp link')
assert.ok(home.includes('id="contacts"'), 'Home page must contain the contact selector')
assert.ok(home.includes(`${basePath}/almaty/#rooms`), 'Home page must offer Almaty rooms after city selection')
assert.ok(home.includes(`href="${basePath}/privacy/"`), 'Home page must link to the privacy page')
assert.ok(home.includes(`href="${basePath}/offer/"`), 'Home page must link to the public offer page')

assert.ok(pages.get('privacy').includes('Загружаем документ'), 'Privacy loading state must be rendered')
assert.ok(pages.get('offer').includes('Загружаем документ'), 'Public offer loading state must be rendered')

console.log(`Verified ${routes.length} exported routes${basePath ? ` under ${basePath}` : ''}.`)
