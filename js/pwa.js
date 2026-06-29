// ════════════════════════════════════
// PWA — update check & offline status
// ════════════════════════════════════

// ── Auto-update via Service Worker ───────────────────────────────

async function getAppVersion() {
  const fallbackVersion = window.APP_VERSION || '0.0';

  try {
    const res = await fetch('./version.txt?t=' + Date.now(), { cache: 'no-store' });
    const version = (await res.text()).trim();
    if (version) {
      window.APP_VERSION = version;
      return version;
    }
  } catch (err) {
    console.warn('Gagal membaca versi aplikasi:', err);
  }

  return fallbackVersion;
}

async function initVersionBadge() {
  const badge = document.getElementById('version-badge');
  if (!badge) return;

  const version = await getAppVersion();
  badge.textContent = `Patch v${version}`;
  badge.onclick = () => checkUpdate();
}

async function checkUpdate(v) {
  const currentVersion = String(v || window.APP_VERSION || await getAppVersion());

  // If we're offline, just notify
  if (!navigator.onLine) {
    showToast('📵 Tidak ada koneksi — Cek update saat Online.', 'warn');
    return;
  }

  try {
    // Fetch version.txt fresh from server (bypass SW cache)
    const res = await fetch('./version.txt?t=' + Date.now(), {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
    });
    const latest = (await res.text()).trim();

    if (latest && latest !== currentVersion) {
      window.APP_VERSION = latest;

      // Tell the SW to skip waiting, then reload
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg && reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          return; // reload happens via controllerchange listener below
        }
        // Force SW to check for updates
        if (reg) {
          try { await reg.update(); } catch(_) {}
          if (reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
            return;
          }
        }
      }
      // Fallback: hard reload busting all caches
      location.href = location.pathname + '?v=' + latest + '&t=' + Date.now();
    } else {
      showToast('✅ Sudah versi terbaru! (v' + currentVersion + ')', 'ok');
    }
  } catch {
    showToast('❌ Update tidak ditemukan.', 'err');
  }
}

// ── Service Worker registration ───────────────────────────────────

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js');

      // Detect when a new SW is installed (waiting state)
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available — show a toast with reload button
            showUpdateBanner();
          }
        });
      });

      // When the controller changes (after SKIP_WAITING), reload
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    } catch (err) {
      console.warn('SW registration failed:', err);
    }
  });
}

// ── Online / Offline indicator ────────────────────────────────────

function initNetworkStatus() {
  const dot = document.getElementById('net-dot');
  const lbl = document.getElementById('net-lbl');
  if (!dot || !lbl) return;

  function update() {
    const online = navigator.onLine;
    dot.className = 'net-dot ' + (online ? 'online' : 'offline');
    lbl.textContent = online ? 'Online' : 'Offline';
  }

  window.addEventListener('online',  update);
  window.addEventListener('offline', update);
  update(); // initial
}

// ── Toast notification helper ─────────────────────────────────────

function showToast(msg, type = 'ok') {
  let toast = document.getElementById('ve-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 've-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.className = 've-toast toast-' + type;
  toast.classList.remove('show');
  clearTimeout(toast._t);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  toast._t = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ── Update available banner ───────────────────────────────────────

function showUpdateBanner() {
  let banner = document.getElementById('ve-update-banner');
  if (banner) return; // already shown

  banner = document.createElement('div');
  banner.id        = 've-update-banner';
  banner.innerHTML = `
    <span>🔄 Versi baru tersedia!</span>
    <button onclick="applyUpdate()">Update Sekarang</button>
    <button onclick="this.parentElement.remove()" style="background:transparent;border:none;color:rgba(255,255,255,.6);cursor:pointer;font-size:16px;padding:0 4px">✕</button>`;
  document.body.appendChild(banner);
}

async function applyUpdate() {
  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg && reg.waiting) {
      reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      return;
    }
  }
  window.location.reload();
}

// ── Init ─────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initNetworkStatus();
  initVersionBadge();
});
