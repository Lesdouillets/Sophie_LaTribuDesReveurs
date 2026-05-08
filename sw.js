const CACHE = 'tdr-v52';
const ASSETS = ['./index.html', './script-data.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Ne mettre en cache que les requêtes GET (jamais POST/PUT/DELETE)
  if (e.request.method !== 'GET') return;
  // Ne pas mettre en cache les requêtes vers Supabase ou externes
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  // Stratégie network-first avec no-store pour forcer un re-fetch à chaque fois
  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).then(resp => {
      if (resp && resp.ok) {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return resp;
    }).catch(() => caches.match(e.request).then(cached => {
      if (cached) return cached;
      if (e.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
      return new Response('', { status: 503, statusText: 'Offline' });
    }))
  );
});
