// DuneTrack PRO - Service Worker
const CACHE_NAME = 'dunetrack-v3';

// Install: cache all static assets using relative paths
self.addEventListener('install', (event) => {
    const base = self.registration.scope;
    const assets = [
        '',
        'index.html',
        'style.css',
        'app.js',
        'manifest.json',
        'icon-192.png',
        'icon-512.png',
    ];
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assets.map(a => new URL(a, base).href));
        })
    );
    self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch: serve from cache first, then network
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Always go to network for API calls (weather, etc.)
    if (url.hostname !== location.hostname) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    // For local assets: cache first, then network
    event.respondWith(
        caches.match(event.request).then((cached) => {
            const fetched = fetch(event.request).then((response) => {
                // Update cache with fresh version
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                return response;
            }).catch(() => cached);

            return cached || fetched;
        })
    );
});
