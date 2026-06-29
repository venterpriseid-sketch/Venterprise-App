// ════════════════════════════════════
// UTILS — helpers & DOM shortcuts
// ════════════════════════════════════

const rp = n =>
  (!n && n !== 0) ? '—' : 'Rp ' + Number(n).toLocaleString('id-ID');

const usd = n =>
  (!n && n !== 0) ? '—' : '$ ' + Number(n).toLocaleString('en-US');

const g = id => document.getElementById(id);

const nv = id => {
  const el = g(id);
  if (!el) return 0;
  const v = parseFloat(el.value);
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
