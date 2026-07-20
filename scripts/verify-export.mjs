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
const homeHeader = home.match(/<header[\s\S]*?<\/header>/i)?.[0] ?? ''
const almatyHeader = pages.get('almaty').match(/<header[\s\S]*?<\/header>/i)?.[0] ?? ''
const astanaHeader = pages.get('astana').match(/<header[\s\S]*?<\/header>/i)?.[0] ?? ''
const almatyMessage = encodeURIComponent('Здравствуйте! Пишу с сайта MAZA. Хочу забронировать номер в городе Алматы.')
const astanaMessage = encodeURIComponent('Здравствуйте! Пишу с сайта MAZA. Хочу забронировать номер в городе Астане.')
const almatyWhatsAppUrl = `https://wa.me/77474700422?text=${almatyMessage}`
const astanaWhatsAppUrl = `https://wa.me/77074700422?text=${astanaMessage}`

assert.ok(home.includes(almatyWhatsAppUrl), 'Home page must contain the Almaty WhatsApp booking link')
assert.ok(pages.get('almaty').includes(almatyWhatsAppUrl), 'Almaty page must contain its WhatsApp booking link')
assert.ok(pages.get('astana').includes(astanaWhatsAppUrl), 'Astana page must contain its WhatsApp booking link')
assert.ok(home.includes('id="contacts"'), 'Home page must contain the contact selector')
assert.ok(home.includes(`${basePath}/almaty/#rooms`), 'Home page must offer Almaty rooms after city selection')
assert.ok(home.includes(`href="${basePath}/privacy/"`), 'Home page must link to the privacy page')
assert.ok(home.includes(`href="${basePath}/offer/"`), 'Home page must link to the public offer page')
assert.ok(!homeHeader.includes('/#home'), 'Home header must not contain the Home navigation item')
assert.ok(almatyHeader.includes('href="https://maza.kz/"'), 'Almaty Home navigation item must link to maza.kz')
assert.ok(astanaHeader.includes('href="https://maza.kz/"'), 'Astana Home navigation item must link to maza.kz')
assert.ok(home.includes('https://www.instagram.com/hihotel.kz/'), 'Home page must contain the Almaty Instagram link')
assert.ok(home.includes('https://www.instagram.com/hihotel.astana/'), 'Home page must contain the Astana Instagram link')
assert.ok(pages.get('almaty').includes('https://www.instagram.com/hihotel.kz/'), 'Almaty page must contain its Instagram link')
assert.ok(!pages.get('almaty').includes('https://www.instagram.com/hihotel.astana/'), 'Almaty page must not contain the Astana Instagram link')
assert.ok(pages.get('astana').includes('https://www.instagram.com/hihotel.astana/'), 'Astana page must contain its Instagram link')
assert.ok(!pages.get('astana').includes('https://www.instagram.com/hihotel.kz/'), 'Astana page must not contain the Almaty Instagram link')

assert.ok(pages.get('privacy').includes('animate-spin'), 'Privacy loading animation must be rendered')
assert.ok(pages.get('offer').includes('animate-spin'), 'Public offer loading animation must be rendered')

console.log(`Verified ${routes.length} exported routes${basePath ? ` under ${basePath}` : ''}.`)
