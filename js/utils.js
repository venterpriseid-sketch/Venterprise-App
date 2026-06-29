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

function formatMoneyInput(el, isFocus = false) {
  if (!el) return;

  const raw = String(el.value || '').replace(/\D/g, '');
  const digits = raw || '';
  el.dataset.rawValue = digits;

  if (isFocus) {
    el.value = digits;
    return;
  }

  if (!digits) {
    el.value = '';
    return;
  }

  const parsed = parseInt(digits, 10);
  const formatted = Number.isNaN(parsed) ? '' : parsed.toLocaleString('id-ID');
  if (el.value !== formatted) {
    el.value = formatted;
  }
}

function attachMoneyInputFormatting(root = document) {
  if (!root || !root.querySelectorAll) return;
  root.querySelectorAll('.money-input').forEach(el => {
    if (el.dataset.moneyBound) return;
    el.dataset.moneyBound = '1';
    ['input', 'keyup', 'paste', 'change', 'blur'].forEach(evt => {
      el.addEventListener(evt, () => formatMoneyInput(el));
    });
    el.addEventListener('focus', () => formatMoneyInput(el, true));
    el.addEventListener('blur', () => formatMoneyInput(el));
    formatMoneyInput(el);
  });
}

const nv = id => {
  const el = g(id);
  if (!el) return 0;
  const raw = el.dataset.rawValue;
  if (raw !== undefined) {
    const parsed = parseFloat(raw);
    return isNaN(parsed) ? 0 : parsed;
  }
  const digits = String(el.value || '').replace(/\D/g, '');
  const parsed = digits ? parseFloat(digits) : 0;
  return isNaN(parsed) ? 0 : parsed;
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
