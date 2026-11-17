import { mkdir, writeFile } from 'node:fs/promises'

const IP = 'https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/'
const STOCK = 'https://img1.wsimg.com/isteam/stock/'

const images = {
  // Brand + hero + portrait
  'logo-marci.png': IP + 'blob-6c0c2e0.png',
  'hero-mountain-falls.jpg': IP + 'mtn%20falls%20pond.jpg',
  'marci-portrait.jpg': IP + 'photo-5db79f9.jpg',

  // Search band background
  'search-bg.jpg': 'https://img1.wsimg.com/isteam/getty/2223376026',

  // Gallery
  'beacon-ridge-1.jpg': IP + '4787%20E%20Beacon%20Ridge-53.jpg-SMALL.JPG',
  'beacon-ridge-2.jpg': IP + '4787%20E%20Beacon%20Ridge-41.jpg-SMALL.JPG',
  'beacon-ridge-3.jpg': IP + '4787%20E%20Beacon%20Ridge-54.jpg-SMALL.JPG',
  'roseworthy-1.jpg': IP + '4460%20Roseworthy-52.jpg-SMALL.JPG',
  'ailanto-1.jpg': IP + '5570%20Ailanto-14.jpg-SMALL.JPG',
  'ailanto-2.jpg': IP + '5570%20Ailanto-45.jpg-SMALL.JPG',
  'ailanto-3.jpg': IP + '5570%20Ailanto-50.jpg-SMALL.JPG',

  // Services
  'services-1.jpg': STOCK + '12792',
  'services-2.jpg': STOCK + '43920',
  'services-3.jpg': STOCK + 'kayaJdA',

  // Affiliation logos
  'logo-ridge.png': IP + 'BIG%20CIRCLE%202.png',
  'logo-eho.png': IP + 'Equal%20Housing%20Logo.png',
  'logo-realtor.jpg': IP + 'Realtor%20Pin.jpg',
  'logo-chamber.jpg': IP + 'Chamber.jpg',
}

const outDir = new URL('../src/assets/images/', import.meta.url)
await mkdir(outDir, { recursive: true })

for (const [name, url] of Object.entries(images)) {
  const res = await fetch(url)
  if (!res.ok) {
    console.error(`✗ ${name} (${res.status})`)
    continue
  }
  await writeFile(new URL(name, outDir), Buffer.from(await res.arrayBuffer()))
  console.log(`✓ ${name}`)
}