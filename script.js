async function checkUpdate(v) {
  const currentVersion = v;

  try {
    const res = await fetch(
      'version.txt?t=' + Date.now(),
      { cache: 'no-store' }
    );

    const latest = (await res.text()).trim();

    if (latest !== currentVersion) {
      location.href = location.pathname + '?v=' + Date.now();
    } else {
      alert('Sudah versi terbaru');
    }
  } catch (e) {
    alert('Gagal cek update');
  }
}
// ════════════════════════════════════
// UTILS
// ════════════════════════════════════
const rp = n => (!n && n !== 0) ? '—' : 'Rp ' + Number(n).toLocaleString('id-ID');
const g = id => document.getElementById(id);
const nv = id => { const el = g(id); if (!el) return 0; const v = parseFloat(el.value); return isNaN(v) ? 0 : v; };
const sv = id => { const el = g(id); return el ? el.value : ''; };
const chkd = id => { const el = g(id); return el ? el.checked : false; };
const hariIni = () => new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
const frekLabel = f => ({ 12: 'Bulanan', 4: 'Kuartalan', 2: 'Semesteran', 1: 'Tahunan' })[parseInt(f)] || f;
const totalPremi = (p, f, mp) => p * parseInt(f) * parseInt(mp);
function perHari(p, f) {
    const fp = parseInt(f);
    let pb = fp === 12 ? p : fp === 4 ? p * 4 / 12 : fp === 2 ? p * 2 / 12 : p / 12;
    return Math.round(pb * 12 / 365);
}

function switchTemplate(tpl, el) {
    document.querySelectorAll('.prod-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
    g('panel-' + tpl).classList.add('active');
    el.classList.add('active');
}

function toggleChk(el) {
    const cb = el.querySelector('input[type=checkbox]');
    if (!cb) return;
    cb.checked = !cb.checked;
    el.classList.toggle('checked', cb.checked);
}

function showResult(prefix) {
    g(prefix + '-divider').style.display = 'block';
    const ra = g(prefix + '-result');
    ra.classList.add('on');
    setTimeout(() => ra.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
}

function resetResult(prefix) {
    g(prefix + '-result').classList.remove('on');
    g(prefix + '-divider').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function unduhPDF(nama) {
    const orig = document.title;
    document.title = 'Allianz — ' + nama;
    window.print();
    setTimeout(() => { document.title = orig; }, 1000);
}

// ════════════════════════════════════
// FIELD RENDERERS
// ════════════════════════════════════
function fieldsSPL(pfx) {
    return `<div class="fld-row">
    <div class="fld"><label>Premi (Rp)</label><input type="number" id="${pfx}-premi" placeholder="cth. 500000" min="0"/></div>
    <div class="fld"><label>Frekuensi</label><select id="${pfx}-frek">
      <option value="12">Bulanan</option><option value="4">Kuartalan</option>
      <option value="2">Semesteran</option><option value="1">Tahunan</option>
    </select></div>
  </div>
  <div class="fld"><label>Proteksi Jiwa (Rp)</label><input type="number" id="${pfx}-jiwa" placeholder="cth. 500000000" min="0"/></div>
  <div class="fld"><label>Penyakit Kritis (Rp)</label><input type="number" id="${pfx}-kritis" placeholder="cth. 250000000" min="0"/></div>
  <div class="fld"><label>Kecelakaan (Rp)</label><input type="number" id="${pfx}-acc" placeholder="cth. 500000000" min="0"/></div>
  <label class="chk-fld" onclick="toggleChk(this)"><input type="checkbox" id="${pfx}-bp"/><span>✦ Bebas Premi</span></label>`;
}

function fieldsACP(pfx) {
    return `<div class="fld-row">
    <div class="fld"><label>Premi (Rp)</label><input type="number" id="${pfx}-premi" placeholder="cth. 500000" min="0"/></div>
    <div class="fld"><label>Frekuensi</label><select id="${pfx}-frek">
      <option value="12">Bulanan</option><option value="4">Kuartalan</option>
      <option value="2">Semesteran</option><option value="1">Tahunan</option>
    </select></div>
  </div>
  <div class="fld"><label>Masa Pembayaran</label><select id="${pfx}-mp">
    <option value="5">5 Tahun</option><option value="10">10 Tahun</option><option value="15" selected>15 Tahun</option>
  </select></div>
  <div class="fld"><label>UP Manfaat Kritis (Rp)</label><input type="number" id="${pfx}-up" placeholder="cth. 500000000" min="0"/></div>`;
}

function fieldsCIH(pfx) {
    return `<div class="fld-row">
    <div class="fld"><label>Premi (Rp)</label><input type="number" id="${pfx}-premi" placeholder="cth. 500000" min="0"/></div>
    <div class="fld"><label>Frekuensi</label><select id="${pfx}-frek">
      <option value="12">Bulanan</option><option value="4">Kuartalan</option>
      <option value="2">Semesteran</option><option value="1">Tahunan</option>
    </select></div>
  </div>
  <div class="fld"><label>Masa Pembayaran</label><select id="${pfx}-mp">
    <option value="5">5 Tahun</option><option value="10">10 Tahun</option><option value="15" selected>15 Tahun</option>
  </select></div>
  <div class="fld"><label>UP Manfaat Kritis (Rp)</label><input type="number" id="${pfx}-up" placeholder="cth. 500000000" min="0"/></div>
  <div class="fld"><label>Masa Kontrak</label><select id="${pfx}-mk">
  <option value="20">20 Tahun</option><option value="30">30 Tahun</option>
  </select></div>
  <div class="fld"><label>Early CI</label><select id="${pfx}-early">
  <option value="0">Tidak Ada</option><option value="25">Early CI 25%</option><option value="50">Early CI 50%</option>
  </select></div>
  <label class="chk-fld" onclick="toggleChk(this)"><input type="checkbox" id="${pfx}-bonus"/><span>✦ Hasanah Booster</span></label>
  <label class="chk-fld" onclick="toggleChk(this)"><input type="checkbox" id="${pfx}-tab"/><span>✦ Hasanah Cash</span></label>
<label class="chk-fld" onclick="toggleChk(this)"><input type="checkbox" id="${pfx}-pyr" /><span>✦ Payor Syariah</span></label>`;
}

function fieldsLegacy(pfx) {
    return `<div class="fld-row">
    <div class="fld"><label>Premi (Rp)</label><input type="number" id="${pfx}-premi" placeholder="cth. 1000000" min="0"/></div>
    <div class="fld"><label>Frekuensi</label><select id="${pfx}-frek">
      <option value="12">Bulanan</option><option value="4">Kuartalan</option>
      <option value="2">Semesteran</option><option value="1">Tahunan</option>
    </select></div>
  </div>
  <div class="fld"><label>Masa Pembayaran</label><select id="${pfx}-mp">
    <option value="5">5 Tahun</option><option value="10">10 Tahun</option><option value="15" selected>15 Tahun</option>
  </select></div>
  <div class="fld"><label>UP Jiwa (Rp)</label><input type="number" id="${pfx}-jiwa" placeholder="cth. 1000000000" min="0"/></div>
  <div class="fld"><label>Target Warisan / Investasi (Rp)</label><input type="number" id="${pfx}-inv" placeholder="cth. 2000000000" min="0"/></div>
  <div class="fld"><label>Masa Kontrak</label><select id="${pfx}-mk">
    <option value="20">20 Tahun</option><option value="30">30 Tahun</option><option value="99">Seumur Hidup</option>
  </select></div>
  <label class="chk-fld" onclick="toggleChk(this)"><input type="checkbox" id="${pfx}-ci"/><span>✦ Rider Penyakit Kritis</span></label>
  <label class="chk-fld" onclick="toggleChk(this)"><input type="checkbox" id="${pfx}-bp"/><span>✦ Bebas Premi</span></label>`;
}

function getFieldsByType(type, pfx) {
    if (type === 'spl') return fieldsSPL(pfx);
    if (type === 'acp') return fieldsACP(pfx);
    if (type === 'cih') return fieldsCIH(pfx);
    if (type === 'alm') return fieldsALM(pfx);  
    if (type === 'alp') return fieldsALP(pfx);
    if (type === 'afi') return fieldsAFI(pfx);
    return '';
}

// ════════════════════════════════════
// READ DATA from a prefix+type
// ════════════════════════════════════
function readData(type, pfx) {
    const premi = nv(pfx + '-premi');
    const frek = sv(pfx + '-frek') || '12';
    if (type === 'spl') {
        return {
            type,
            premi,
            frek,
            jiwa: nv(pfx + '-jiwa'),
            kritis: nv(pfx + '-kritis'),
            acc: nv(pfx + '-acc'),
            bp: chkd(pfx + '-bp')
        };
    }
    if (type === 'acp') {
        const mp = parseInt(sv(pfx + '-mp') || 15);
        return {
            type,
            premi,
            frek,
            mp,
            up: nv(pfx + '-up')
        };
    }
    if (type === 'cih') {
        const mp = parseInt(sv(pfx + '-mp') || 15);
        return {
            type,
            premi,
            frek,
            mp,
            up: nv(pfx + '-up'),
            bonus: chkd(pfx + '-bonus'),
            pyr: chkd(pfx + '-pyr'),
            early: parseInt(sv(pfx + '-early') || 0),
            mk: sv(pfx + '-mk') || '20',
            tab: chkd(pfx + '-tab')
        };
    }
    if (type === 'legacy') {
        const mp = parseInt(sv(pfx + '-mp') || 15);
        return { type, premi, frek, mp, jiwa: nv(pfx + '-jiwa'), inv: nv(pfx + '-inv'), mk: sv(pfx + '-mk') || '20', ci: chkd(pfx + '-ci'), bp: chkd(pfx + '-bp') };
    }
}

// ════════════════════════════════════
// BUILD ROW LIST from data object
// Returns [{key, label, val, mergeKey, mergeVal}]
// mergeKey = numeric field name for bundling merge
// mergeVal = numeric value
// ════════════════════════════════════
function buildRows(d, badge) {
    const b = badge ? `<span class="src-badge src-${d.type}">${badge}</span>` : '';
    const rows = [];

    if (d.type === 'spl') {
        rows.push({ key: 'premi', label: '💵 Premi & Frekuensi', val: `<div class="cv">${rp(d.premi)}</div><div class="csub">${frekLabel(d.frek)}</div>${b}` });
        rows.push({ key: 'jiwa', label: '🛡️ Proteksi Jiwa', val: `<div class="cv">${rp(d.jiwa)}</div><div class="csub">Keluarga tetap melanjutkan hidup.</div>${b}`, mergeKey: 'jiwa', mergeVal: d.jiwa });
        rows.push({ key: 'kritis', label: '🏥 Penyakit Kritis', val: `<div class="cv">${rp(d.kritis)}</div><div class="csub">Mempertahankan kualitas dan biaya hidup.</div>${b}`, mergeKey: 'kritis', mergeVal: d.kritis });
        if (d.acc > 0) rows.push({ key: 'acc', label: '🚑 Kecelakaan', val: `<div class="cv">${rp(d.acc)}</div><div class="csub">Perlindungan risiko kecelakaan.</div>${b}`, mergeKey: 'acc', mergeVal: d.acc });
        if (d.bp) rows.push({ key: 'bp', label: '✅ Bebas Premi', val: `<div class="w-yes">✔ Termasuk</div><div class="csub">Proteksi aktif tanpa membayar premi.</div>${b}` });
        rows.push({ key: 'masaKontrak', label: '📅 Masa Cover', val: `<div class="cv">Seumur Hidup</div>${b}` });

    } else if (d.type === 'acp') {
        const tp = totalPremi(d.premi, d.frek, d.mp);
        const bv = d.up * 0.5;
        const ev = (d.up + bv) * 0.25;
        const jiwaVal = tp * 1.5;
        rows.push({ key: 'premi', label: '💵 Premi & Frekuensi', val: `<div class="cv">${rp(d.premi)}</div><div class="csub">${frekLabel(d.frek)} · Bayar ${d.mp} Thn</div>${b}` });
        rows.push({ key: 'kritis', label: '🏥 Manfaat Kritis', val: `<div class="cv">${rp(d.up)}</div><div class="csub">Mempertahankan kualitas dan biaya hidup.</div>${b}`, mergeKey: 'kritis', mergeVal: d.up });
        rows.push({ key: 'bonus', label: '🎁 Bonus UP', val: `<div class="cv">${rp(bv)}</div><div class="cnote">Ekstra 50% dari UP mulai Thn ke-2</div>${b}` });
        rows.push({ key: 'earlyCi', label: '⚡ Kritis Tahap Awal', val: `<div class="cv">${rp(ev)}</div><div class="csub">Manfaat 25% dari Uang Pertanggungan.</div>${b}` });
        rows.push({ key: 'jiwa', label: '🛡️ Manfaat Jiwa', val: `<div class="cv">s.d. ${rp(jiwaVal)}</div><div class="csub">Manfaat 150% dari total premi.</div>${b}` });
        rows.push({ key: 'bp', label: '✅ Bebas Premi', val: `<div class="w-yes">✔ Termasuk</div><div class="csub">Proteksi gratis jika terdiagnosa P.Kritis Tahap Awal.</div>${b}` });
        rows.push({ key: 'tabungan', label: '💰 Manfaat Tabungan', val: `<div class="w-yes">✔ ${rp(tp)}</div><div class="csub">Dikembalikan di Tahun ke-20.</div>${b}` });
        rows.push({ key: 'masaKontrak', label: '📅 Masa Cover', val: `<div class="cv">20 Tahun</div>${b}` });

    } else if (d.type === 'cih') {
        const tp = totalPremi(d.premi, d.frek, d.mp);
        rows.push({ key: 'premi', label: '💵 Premi & Frekuensi', val: `<div class="cv">${rp(d.premi)}</div><div class="csub">${frekLabel(d.frek)} · Bayar ${d.mp} Thn</div>${b}` });
        rows.push({ key: 'kritis', label: '🏥 Manfaat Kritis', val: `<div class="cv">${rp(d.up)}</div><div class="csub">Mempertahankan kualitas dan biaya hidup.</div>${b}`, mergeKey: 'kritis', mergeVal: d.up });
        if (d.bonus) {
            const bv = d.up * 0.5;
            rows.push({ key: 'bonus', label: '🎁 Bonus UP', val: `<div class="cv">${rp(bv)}</div><div class="cnote">Bonus berlaku sejak Polis Aktif.</div>${b}` });
        }
        if (d.early > 0) {
            const bv = d.up * 0.5; const ev = (d.up + bv) * (d.early / 100);
            rows.push({ key: 'earlyCi', label: '⚡ Kritis Tahap Awal', val: `<div class="cv">${rp(ev)}</div><div class="csub">Early CI ${d.early}%</div>${b}`, mergeKey: 'kritis', mergeVal: ev });
        }
        rows.push({ key: 'jiwa', label: '🛡️ Manfaat Jiwa', val: `<div class="cv">${rp(d.up)}</div><div class="csub">Mengikuti Manfaat UP Kritis</div>${b}` });
        if (d.early > 0) {
             rows.push({ key: 'bp', label: '✅ Bebas Premi', val: `<div class="w-yes">✔ Termasuk</div><div class="csub">Proteksi gratis jika terdiagnosa P.Kritis Tahap Awal.</div>${b}` });
        }
        if (d.tab) {
            rows.push({ key: 'tabungan', label: '💰 Manfaat Tabungan', val: `<div class="w-yes">✔ ${rp(tp)}</div><div class="csub">Dikembalikan di Tahun ke-20.</div>${b}` });
        }
        rows.push({ key: 'masaKontrak', label: '📅 Masa Cover', val: `<div class="cv">${d.mk} Tahun</div>${b}` });

    } else if (d.type === 'legacy') {
        const tp = totalPremi(d.premi, d.frek, d.mp);
        rows.push({ key: 'premi', label: '💵 Premi & Frekuensi', val: `<div class="cv">${rp(d.premi)}</div><div class="csub">${frekLabel(d.frek)} · Bayar ${d.mp} Thn</div><div class="cnote">Total: ${rp(tp)}</div>${b}` });
        rows.push({ key: 'jiwa', label: '🛡️ Uang Pertanggungan Jiwa', val: `<div class="cv">${rp(d.jiwa)}</div><div class="csub">Keluarga terlindungi dan warisan terjaga.</div>${b}`, mergeKey: 'jiwa', mergeVal: d.jiwa });
        rows.push({ key: 'inv', label: '🏛️ Target Warisan / Investasi', val: `<div class="cv">${rp(d.inv)}</div><div class="csub">Nilai yang direncanakan tumbuh dan diwariskan.</div>${b}` });
        rows.push({ key: 'masaKontrak', label: '📅 Masa Cover', val: `<div class="cv">${d.mk === '99' ? 'Seumur Hidup' : d.mk + ' Tahun'}</div>${b}` });
        if (d.ci) rows.push({ key: 'riderCI', label: '🏥 Rider Penyakit Kritis', val: `<div class="w-yes">✔ Termasuk</div>${b}` });
        if (d.bp) rows.push({ key: 'bp', label: '✅ Bebas Premi', val: `<div class="w-yes">✔ Termasuk</div>${b}` });
    }

    return rows;
}

// ════════════════════════════════════
// STANDARD TEMPLATE
// ════════════════════════════════════
function renderStdFields(i) {
    const type = sv('std-type' + i);
    g('std-fields' + i).innerHTML = getFieldsByType(type, 'std' + i);
}

function generateStd() {
    const allOpts = [1, 2, 3].map(i => {
        const type = sv('std-type' + i);
        const d = readData(type, 'std' + i);
        if (!d || !d.premi) return null;
        return { ...d, idx: i };
    });
    const opts = allOpts.filter(Boolean);
    if (!opts.length) { alert('Isi minimal 1 opsi premi!'); return; }

    // Collect row key order and labels
    const rowMeta = {}; // key->label, ordered
    opts.forEach(o => buildRows(o, '').forEach(r => { if (!rowMeta[r.key]) rowMeta[r.key] = r.label; }));

    // Per-opt value maps
    const maps = opts.map(o => { const m = {}; buildRows(o, '').forEach(r => { m[r.key] = r.val; }); return m; });

    // Header
    const thead = g('std-thead');
    thead.innerHTML = '<th>Manfaat</th>';
    opts.forEach(o => thead.innerHTML += `<th>Opsi ${o.idx}</th>`);

    let html = '';
    Object.entries(rowMeta).forEach(([key, label]) => {
        html += `<tr><td><div class="row-lbl">${label}</div></td>`;
        maps.forEach(m => html += `<td>${m[key] || '<div class="cv" style="color:var(--text3)">—</div>'}</td>`);
        html += '</tr>';
    });

    // Daily
    html += '<tr class="daily-row"><td><div class="daily-lbl">💡 Penyisihan / Hari</div></td>';
    opts.forEach(o => {
        const pd = perHari(o.premi, o.frek);
        html += `<td><div class="daily-val">Rp ${pd.toLocaleString('id-ID')}</div><div class="daily-sub">per hari</div></td>`;
    });
    html += '</tr>';

    // Title & vpills
    const types = [...new Set(opts.map(o => o.type))];
    const tnames = { spl: 'Smartlink Protection Life', ci: 'Critical Illness', legacy: 'Legacy' };
    g('std-res-title').textContent = 'Perbandingan Opsi Proteksi';
    const pillsHtml = {
        spl: `<div class="vpill"><div class="vpill-ico">🛡️</div><div><div class="vpill-lbl">Proteksi Jiwa</div><div class="vpill-txt">Keluarga tetap melanjutkan hidup tanpa menurunkan standar.</div></div></div>`,
        ci: `<div class="vpill"><div class="vpill-ico">🏥</div><div><div class="vpill-lbl">Penyakit Kritis</div><div class="vpill-txt">Biaya pengobatan tidak membebani keuangan keluarga.</div></div></div>`,
        legacy: `<div class="vpill"><div class="vpill-ico">🏛️</div><div><div class="vpill-lbl">Warisan Terencana</div><div class="vpill-txt">Pastikan aset dan nilai hidup diwariskan dengan bermartabat.</div></div></div>`,
    };
    g('std-vpills').innerHTML = types.map(t => pillsHtml[t]).join('');
    g('std-res-sub').textContent = 'Dibuat pada ' + hariIni();
    g('std-ft-date').textContent = 'Digenerate: ' + hariIni() + ' | Allianz Indonesia';
    g('std-tbody').innerHTML = html;
    showResult('std');
}

// ════════════════════════════════════
// BUNDLING TEMPLATE
// ════════════════════════════════════
// State: array of opsi, each with array of products {type, pfx}
let bunState = [
    { idx: 1, cols: ['c1'], prods: [{ type: 'spl', pfx: 'b1p0' }] },
    { idx: 2, cols: ['c2'], prods: [{ type: 'spl', pfx: 'b2p0' }] },
    { idx: 3, cols: ['c3'], prods: [{ type: 'spl', pfx: 'b3p0' }] },
];
let _bunData = null;
const bunColors = ['c1', 'c2', 'c3'];

function renderBunGrid() {
    const grid = g('bun-grid');
    grid.innerHTML = '';
    bunState.forEach((opt, oi) => {
        const col = document.createElement('div');
        col.className = 'opt-col';

        let html = `<div class="opt-hd ${bunColors[oi % 3]}"><div class="opt-num">${opt.idx}</div><div class="opt-title">Opsi ${opt.idx}</div></div>`;
        html += `<div class="opt-fields" style="padding:14px;display:flex;flex-direction:column;gap:10px">`;

        opt.prods.forEach((prod, pi) => {
            const canRemove = opt.prods.length > 1;
            const typeLabel = { spl: 'Smartlink Protection Life', ci: 'Critical Illness', legacy: 'Legacy' }[prod.type] || '';
            html += `<div class="prod-block">
        <div class="prod-block-hd">
          <span class="prod-block-label">
            <select class="prod-block-type" onchange="changeBunProdType(${oi},${pi},this.value)">
              <option value="spl"${prod.type === 'spl' ? ' selected' : ''}>🛡️ SPL</option>
              <option value="ci"${prod.type === 'ci' ? ' selected' : ''}>🏥 Critical Illness</option>
              <option value="legacy"${prod.type === 'legacy' ? ' selected' : ''}>🏛️ Legacy</option>
            </select>
          </span>
          ${canRemove ? `<button class="btn-remove-prod" onclick="removeBunProd(${oi},${pi})" title="Hapus produk">✕</button>` : ''}
        </div>
        <div class="prod-block-fields">${getFieldsByType(prod.type, prod.pfx)}</div>
      </div>`;
        });

        html += `<button class="btn-add-prod" onclick="addBunProd(${oi})">＋ Tambahkan Produk</button>`;
        html += `</div>`;
        col.innerHTML = html;
        grid.appendChild(col);
    });
}

function changeBunProdType(oi, pi, newType) {
    // Save nothing (fields cleared), just update type and re-render
    bunState[oi].prods[pi].type = newType;
    // regenerate pfx and re-render
    renderBunGrid();
}

function addBunProd(oi) {
    const opt = bunState[oi];
    const pi = opt.prods.length;
    opt.prods.push({ type: 'spl', pfx: `b${opt.idx}p${pi}` });
    renderBunGrid();
}

function removeBunProd(oi, pi) {
    const opt = bunState[oi];
    if (opt.prods.length <= 1) { alert('Minimal 1 produk per opsi!'); return; }
    opt.prods.splice(pi, 1);
    // Re-number pfx
    opt.prods.forEach((p, i) => p.pfx = `b${opt.idx}p${i}`);
    renderBunGrid();
}

function readBunOptData(opt) {
    const products = [];
    opt.prods.forEach(prod => {
        const d = readData(prod.type, prod.pfx);
        if (d && d.premi > 0) products.push(d);
    });
    const totalP = products.reduce((s, p) => s + p.premi, 0);
    const frek = products[0]?.frek || '12';
    return { idx: opt.idx, products, totalP, frek };
}

function buildBunOptRows(optData, merged) {
    // Collect all rows across products with badges
    const allRows = [];
    optData.products.forEach((prod, pi) => {
        const badge = { spl: 'SPL', ci: 'CI', legacy: 'LEG' }[prod.type] || '';
        buildRows(prod, badge).forEach(r => allRows.push({ ...r, _prodIdx: pi }));
    });

    if (!merged) return allRows;

    // Merge rows by mergeKey (numeric fields: jiwa, kritis, acc)
    // Non-mergeKey rows: keep first occurrence per key
    const seen = {};
    const merged_rows = [];
    const mergeAccum = {}; // mergeKey -> {sum, badges, label, key}

    allRows.forEach(r => {
        if (r.mergeKey) {
            if (!mergeAccum[r.mergeKey]) {
                mergeAccum[r.mergeKey] = { sum: 0, badges: [], label: r.label, key: r.mergeKey };
            }
            mergeAccum[r.mergeKey].sum += (r.mergeVal || 0);
            // extract badge text from val
            const bm = r.val.match(/src-badge src-(\w+)">([^<]+)</);
            if (bm) mergeAccum[r.mergeKey].badges.push({ cls: bm[1], txt: bm[2] });
        } else {
            if (!seen[r.key]) {
                seen[r.key] = true;
                merged_rows.push({ ...r, _merged_nonnum: true });
            }
        }
    });

    // Build merged rows list in order they first appeared
    const order = [];
    const orderSet = new Set();
    allRows.forEach(r => {
        const k = r.mergeKey || r.key;
        if (!orderSet.has(k)) { orderSet.add(k); order.push(k); }
    });

    const result = [];
    order.forEach(k => {
        if (mergeAccum[k]) {
            const m = mergeAccum[k];
            const badgesHtml = m.badges.map(b => `<span class="src-badge src-${b.cls}">${b.txt}</span>`).join('');
            result.push({ key: k, label: m.label, val: `<div class="cv">${rp(m.sum)}</div><div class="csub">Gabungan proteksi.</div>${badgesHtml}` });
        } else {
            // find in merged_rows
            const r = merged_rows.find(x => x.key === k);
            if (r) result.push(r);
        }
    });
    return result;
}

function generateBun() {
    const computed = bunState.map(opt => readBunOptData(opt)).filter(o => o.products.length > 0);
    if (!computed.length) { alert('Isi minimal 1 opsi dengan premi!'); return; }
    _bunData = computed;
    g('bun-res-sub').textContent = 'Dibuat pada ' + hariIni();
    g('bun-ft-date').textContent = 'Digenerate: ' + hariIni() + ' | Allianz Indonesia';
    rerenderBunTable();
    showResult('bun');
}

function rerenderBunTable() {
    if (!_bunData) return;
    const merged = chkd('bun-merge');
    const opts = _bunData;

    // Collect row key order and labels
    const rowMeta = {};
    opts.forEach(opt => {
        buildBunOptRows(opt, merged).forEach(r => { if (!rowMeta[r.key]) rowMeta[r.key] = r.label; });
    });

    // Per-opt maps
    const maps = opts.map(opt => {
        const m = {};
        buildBunOptRows(opt, merged).forEach(r => { m[r.key] = r.val; });
        return m;
    });

    // Header
    const thead = g('bun-thead');
    thead.innerHTML = '<th>Manfaat</th>';
    opts.forEach(o => thead.innerHTML += `<th>Opsi ${o.idx}</th>`);

    let html = '';
    Object.entries(rowMeta).forEach(([key, label]) => {
        html += `<tr><td><div class="row-lbl">${label}</div></td>`;
        maps.forEach(m => html += `<td>${m[key] || '<div class="cv" style="color:var(--text3)">—</div>'}</td>`);
        html += '</tr>';
    });

    // Daily — per opsi total premi
    html += '<tr class="daily-row"><td><div class="daily-lbl">💡 Penyisihan / Hari</div></td>';
    opts.forEach(o => {
        const pd = perHari(o.totalP, o.frek);
        html += `<td><div class="daily-val">Rp ${pd.toLocaleString('id-ID')}</div><div class="daily-sub">per hari (total paket)</div></td>`;
    });
    html += '</tr>';

    g('bun-tbody').innerHTML = html;
}

// ════════════════════════════════════
// INIT
// ════════════════════════════════════
[1, 2, 3].forEach(i => renderStdFields(i));
renderBunGrid();
