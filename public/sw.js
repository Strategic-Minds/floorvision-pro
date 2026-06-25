const CACHE = 'fvpro-v2';
const PRECACHE = ['/', '/color-charts', '/visualizer', '/gallery', '/request-sample', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // CDN blend images: network-first with cache fallback
  if (e.request.url.includes('cdn.floor-wiz.com') || e.request.url.includes('drive.google.com')) {
    e.respondWith(
      fetch(e.request).then(r => {
        const clone = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return r;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  // App shell: cache-first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(nr => {
      const clone = nr.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return nr;
    }))
  );
});
