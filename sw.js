const CACHE = 'phuc-tools-v1';
const assets = [
  '/',
  '/index.html',
  '/manifest.json'
  // thêm icon nếu có: '/icon-192.png'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(assets))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
  // simple cache-first for same-origin GET
  if (evt.request.method !== 'GET') return;
  evt.respondWith(
    caches.match(evt.request).then(r => r || fetch(evt.request))
  );
});
