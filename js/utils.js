// ════════════════════════════════════
// UTILS — helpers & DOM shortcuts
// ════════════════════════════════════

const rp = n =>
  (!n && n !== 0) ? '—' : 'Rp ' + Number(n).toLocaleString('id-ID');

const usd = n =>
  (!n && n !== 0) ? '—' : '$ ' + Number(n).toLocaleString('en-US');

const g = id => document.getElementById(id);

const escapeHtml = value => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

function formatMoneyInput(el) {
  if (!el) return;
  const raw = String(el.value || '').replace(/\D/g, '');
  const digits = raw || '0';
  el.dataset.rawValue = digits;
  const formatted = digits !== '0' ? parseInt(digits, 10).toLocaleString('id-ID') : '';
  if (el.value !== formatted) {
    el.value = formatted;
  }
}

function attachMoneyInputFormatting(root = document) {
  if (!root || !root.querySelectorAll) return;
  root.querySelectorAll('.money-input').forEach(el => {
    if (el.dataset.moneyBound) return;
    el.dataset.moneyBound = '1';
    const sync = () => formatMoneyInput(el);
    ['input', 'keyup', 'paste', 'change', 'blur'].forEach(evt => {
      el.addEventListener(evt, sync);
    });
    el.addEventListener('focus', () => {
      const raw = String(el.dataset.rawValue || '').replace(/\D/g, '');
      if (raw && raw !== '0') {
        el.value = raw;
      }
    });
    el.addEventListener('blur', sync);
    sync();
  });
}

const nv = id => {
  const el = g(id);
  if (!el) return 0;
  const raw = el.dataset.rawValue;
  const v = raw !== undefined ? parseFloat(raw) : parseFloat(String(el.value || '').replace(/\D/g, ''));
  return isNaN(v) ? 0 : v;
};

const sv = id => {
  const el = g(id);
  return el ? el.value : '';
};

const chkd = id => {
  const el = g(id);
  return el ? el.checked : false;
};

const hariIni = () =>
  new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const frekLabel = f =>
  ({ 12: 'Bulanan', 4: 'Kuartalan', 2: 'Semesteran', 1: 'Tahunan' })[parseInt(f)] || f;

const totalPremi = (p, f, mp) => p * parseInt(f) * parseInt(mp);

function perHari(p, f) {
  const fp = parseInt(f);
  let pb =
    fp === 12 ? p :
    fp === 4  ? (p * 4) / 12 :
    fp === 2  ? (p * 2) / 12 :
                p / 12;
  return Math.round((pb * 12) / 365);
}
