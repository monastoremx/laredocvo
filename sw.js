// Laredo CVO — Service Worker
// Versión del caché: incrementar cuando hagas cambios al HTML
const CACHE_NAME = 'laredo-cvo-v1';

// Archivos a cachear para uso offline
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // CDN externos — se cachean al primer acceso
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
];

// ── Install: pre-cachear assets locales ──────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Solo cachear assets locales en install; CDN se cacha on-demand
      return cache.addAll(['/', '/index.html', '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png']);
    })
  );
  self.skipWaiting();
});

// ── Activate: limpiar cachés viejos ──────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: Cache-first para assets, Network-first para el resto ──
self.addEventListener('fetch', (event) => {
  // Solo interceptar GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Cachear respuestas válidas (no opacas de CDN cross-origin problemáticas)
          if (response && response.status === 200 && response.type !== 'opaque') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Sin red y sin caché: devolver el index como fallback
          return caches.match('/index.html');
        });
    })
  );
});
