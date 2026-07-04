// ════════════════════════════════════
// SERVICE WORKER — offline cache + auto-update
// ════════════════════════════════════
const FALLBACK_VERSION = '0.0';

async function getRuntimeVersion() {
  try {
    const res = await fetch('./version.txt?t=' + Date.now(), {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
    });
    const version = (await res.text()).trim();
    return version || FALLBACK_VERSION;
  } catch {
    return FALLBACK_VERSION;
  }
}

async function getCacheName() {
  return 'venterprise-v' + await getRuntimeVersion();
}

function getVersionedUrl(requestUrl, version = FALLBACK_VERSION) {
  const safeVersion = String(version).replace(/[^a-zA-Z0-9._-]/g, '') || FALLBACK_VERSION;
  const url = new URL(requestUrl, self.location.origin);
  url.searchParams.set('v', safeVersion);
  url.searchParams.set('t', String(Date.now()));
  return url.toString();
}

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
  self.skipWaiting();
  event.waitUntil(
    getCacheName().then(cacheName => caches.open(cacheName).then(cache => cache.addAll(PRECACHE)))
  );
});

// ── Activate: clean up old caches ────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    getCacheName().then(cacheName =>
      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(k => k.startsWith('venterprise-v') && k !== cacheName)
            .map(k => caches.delete(k))
        )
      ).then(() => self.clients.claim())
    )
  );
});

// ── Fetch: always try network first for app shell and assets, then fall back to cache ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (event.request.method !== 'GET') return;

  if (url.pathname.endsWith('version.txt')) {
    event.respondWith(
      fetch(event.request.url + (event.request.url.includes('?') ? '&' : '?') + 't=' + Date.now(), {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    (async () => {
      const version = await getRuntimeVersion();
      const networkUrl = getVersionedUrl(event.request.url, version);

      try {
        const response = await fetch(networkUrl, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
        });

        if (response && response.status === 200) {
          const cacheName = await getCacheName();
          const cache = await caches.open(cacheName);
          await cache.put(event.request, response.clone());
        }

        return response;
      } catch (err) {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        throw err;
      }
    })()
  );
});

// ── Message: handle SKIP_WAITING from the app ─────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
