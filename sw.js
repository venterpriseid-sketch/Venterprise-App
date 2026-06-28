// ════════════════════════════════════
// SERVICE WORKER — offline cache + auto-update
// ════════════════════════════════════
const CACHE_NAME = 'venterprise-v4.40';

const PRECACHE = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './icon-1024x1024.png',
  './js/utils.js',
  './js/ui.js',
  './js/fields.js',
  './js/data.js',
  './js/template-std.js',
  './js/template-bun.js',
  './js/pwa.js',
  './js/app.js',
];

// ── Install: pre-cache all app shell assets ───────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  // Don't call skipWaiting here — we let the page decide when to activate
});

// ── Activate: clean up old caches ────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for app shell, network-first for version.txt ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Always hit network for version.txt (update checks)
  if (url.pathname.endsWith('version.txt')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful GET responses
        if (response && response.status === 200 && event.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback — return index for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// ── Message: handle SKIP_WAITING from the app ─────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
