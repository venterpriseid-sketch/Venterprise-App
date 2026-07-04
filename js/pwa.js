// ════════════════════════════════════
// PWA — update check & offline status
// ════════════════════════════════════

// ── Auto-update via Service Worker ───────────────────────────────

async function getAppVersion() {
  const fallbackVersion = window.APP_VERSION || '0.0.0';

  try {
    const res = await fetch('./version.txt?t=' + Date.now(), { cache: 'no-store' });
    const version = (await res.text()).trim();
    if (version) {
      window.APP_VERSION = version;
      return version;
    }
  } catch (err) {
    console.warn('Failed to fetch app version:', err);
  }

  return fallbackVersion;
}

async function initVersionBadge() {
  const badge = document.getElementById('version-badge');
  if (!badge) return;

  const version = await getAppVersion();
  badge.textContent = `v${version}`;
  badge.onclick = () => checkUpdate();
}

// ── Simple update check with autobump ────────────────────────────

async function checkUpdate() {
  // If offline, notify and exit
  if (!navigator.onLine) {
    showToast('📵 Offline — Check updates when connected.', 'warn');
    return;
  }

  try {
    const currentVersion = await getAppVersion();
    
    // Fetch fresh version from server
    const res = await fetch('./version.txt?t=' + Date.now(), {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
    });
    
    const latestVersion = (await res.text()).trim();

    if (!latestVersion) {
      showToast('❌ Version info unavailable.', 'err');
      return;
    }

    if (latestVersion !== currentVersion) {
      window.APP_VERSION = latestVersion;
      showToast(`🔄 Update v${latestVersion} available!`, 'info');
      
      // Hard reload with cache bust
      setTimeout(() => {
        location.href = location.pathname + '?v=' + latestVersion + '&t=' + Date.now();
      }, 500);
    } else {
      showToast(`✅ Already on latest (v${currentVersion})`, 'ok');
    }
  } catch (err) {
    console.error('Update check failed:', err);
    showToast('❌ Could not check for updates.', 'err');
  }
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

  window.addEventListener('online', update);
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

// ── Init ─────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initNetworkStatus();
  initVersionBadge();
});
