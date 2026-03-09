const CACHE_NAME = 'derwentwater-weather-v5'; // increment this version when updating assets
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  '/icons/lrc_icon-192.png',
  '/icons/lrc_icon-512.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css',
  'https://cdn.jsdelivr.net/npm/highcharts@11.1.0/highcharts.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;

  // Network-first for navigation and index.html — always try to get fresh HTML
  if (req.mode === 'navigate' || req.url.endsWith('index.html')) {
    event.respondWith(
      fetch(req)
        .then(resp => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return resp;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Network-first for the weather API so data is always fresh; no cache fallback
  if (req.url.includes('open-meteo.com')) {
    event.respondWith(fetch(req));
    return;
  }

  // Cache-first for all other assets (CDN libs, icons, etc.)
  event.respondWith(
    caches.match(req).then(resp => {
      return resp || fetch(req).then(fetchResp => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(req, fetchResp.clone());
          return fetchResp;
        });
      });
    })
  );
});