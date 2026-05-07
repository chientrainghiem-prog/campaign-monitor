const CACHE = 'chidu-pwa-v1'
const ASSETS = ['/', '/index.html', '/manifest.json']

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)))
})

self.addEventListener('fetch', e => {
  // Cache only app assets, not API calls
  if (e.request.url.includes('script.google.com')) return
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  )
})
