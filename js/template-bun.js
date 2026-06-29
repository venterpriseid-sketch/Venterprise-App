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



// ── Value persistence across re-renders ──────────────────────────

function saveBunValues() {
  const saved = {};
  document.querySelectorAll('#bun-grid input, #bun-grid select').forEach(el => {
    if (!el.id) return;
    saved[el.id] = el.type === 'checkbox' ? el.checked : el.value;
  });
  return saved;
}

function restoreBunValues(saved) {
  Object.entries(saved).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.type === 'checkbox') {
      el.checked = val;
      const lbl = el.closest('.chk-fld');
      if (lbl) lbl.classList.toggle('checked', val);
    } else {
      el.value = val;
    }
  });
}

// ── Grid render ───────────────────────────────────────────────────

function renderBunGrid() {
  const saved = saveBunValues();
  const grid = g('bun-grid');
  grid.innerHTML = '';

  bunState.forEach((opt, oi) => {
    const col = document.createElement('div');
    col.className = 'opt-col';

    let html = `
      <div class="opt-hd ${bunColors[oi % 3]}">
        <div class="opt-num">${opt.idx}</div>
        <div class="opt-title">Opsi ${opt.idx}</div>
      </div>
      <div class="opt-fields" style="padding:14px;display:flex;flex-direction:column;gap:10px">`;

    opt.prods.forEach((prod, pi) => {
      const canRemove = opt.prods.length > 1;
      html += `
        <div class="prod-block">
          <div class="prod-block-hd">
            <span class="prod-block-label">
              <select class="prod-block-type" onchange="changeBunProdType(${oi},${pi},this.value)">
                <option value="spl"${prod.type === 'spl' ? ' selected' : ''}>🛡️ SPL</option>
                <option value="acp"${prod.type === 'acp' ? ' selected' : ''}>🏥 Critical Plus</option>
                <option value="cih"${prod.type === 'cih' ? ' selected' : ''}>🏥 CI Hasanah</option>
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

  restoreBunValues(saved);
  attachMoneyInputFormatting(grid);
}

// ── Mutation helpers ─────────────────────────────────────────────

function changeBunProdType(oi, pi, newType) {
  bunState[oi].prods[pi].type = newType;
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
  opt.prods.forEach((p, i) => { p.pfx = `b${opt.idx}p${i}`; });
  renderBunGrid();
}

// ── Data aggregation ──────────────────────────────────────────────

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

// ── Row merging (bundling merge mode) ─────────────────────────────

function buildBunOptRows(optData, merged) {
  const allRows = [];
  optData.products.forEach((prod) => {
    const badge = { spl: 'SPL', acp: 'ACP', cih: 'CIH', legacy: 'LEG' }[prod.type] || '';
    buildRows(prod, badge).forEach(r => allRows.push({ ...r }));
  });

  if (!merged) return allRows;

  // Accumulate numeric mergeKey fields; keep first occurrence of non-merge rows
  const seen = {};
  const merged_rows = [];
  const mergeAccum = {};

  allRows.forEach(r => {
    if (r.mergeKey) {
      if (!mergeAccum[r.mergeKey]) {
        mergeAccum[r.mergeKey] = { sum: 0, badges: [], label: r.label, key: r.mergeKey };
      }
      mergeAccum[r.mergeKey].sum += (r.mergeVal || 0);
      const bm = r.val.match(/src-badge src-(\w+)">([^<]+)</);
      if (bm) mergeAccum[r.mergeKey].badges.push({ cls: bm[1], txt: bm[2] });
    } else {
      if (!seen[r.key]) {
        seen[r.key] = true;
        merged_rows.push({ ...r, _merged_nonnum: true });
      }
    }
  });

  // Preserve insertion order
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
      const badgesHtml = m.badges
        .map(b => `<span class="src-badge src-${b.cls}">${b.txt}</span>`)
        .join('');
      result.push({
        key: k, label: m.label,
        val: `<div class="cv">${rp(m.sum)}</div><div class="csub">Gabungan proteksi.</div>${badgesHtml}`,
      });
    } else {
      const r = merged_rows.find(x => x.key === k);
      if (r) result.push(r);
    }
  });
  return result;
}

// ── Generate & re-render ──────────────────────────────────────────

function generateBun() {
  const computed = bunState
    .map(opt => readBunOptData(opt))
    .filter(o => o.products.length > 0);

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
    buildBunOptRows(opt, merged).forEach(r => {
      if (!rowMeta[r.key]) rowMeta[r.key] = r.label;
    });
  });

  // Per-opt value maps
  const maps = opts.map(opt => {
    const m = {};
    buildBunOptRows(opt, merged).forEach(r => { m[r.key] = r.val; });
    return m;
  });

  // Header
  const thead = g('bun-thead');
  thead.innerHTML = '<th>Manfaat</th>';
  opts.forEach(o => { thead.innerHTML += `<th>Opsi ${o.idx}</th>`; });

  let html = '';
  Object.entries(rowMeta).forEach(([key, label]) => {
    html += `<tr>${editableResultCell(label, 'row-lbl')}`;
    maps.forEach(m => {
      const val = m[key] || '<div class="cv" style="color:var(--text3)">—</div>';
      html += editableResultCell(val);
    });
    html += '</tr>';
  });

  // Daily row
  html += '<tr class="daily-row">' + editableResultCell('💡 Penyisihan / Hari', 'daily-lbl');
  opts.forEach(o => {
    const pd = perHari(o.totalP, o.frek);
    html += editableResultCell(`<div class="daily-val">Rp ${pd.toLocaleString('id-ID')}</div><div class="daily-sub">per hari (total paket)</div>`);
  });
  html += '</tr>';

  g('bun-tbody').innerHTML = html;
  attachMoneyInputFormatting(document);
  enableEditableResult('bun');
}
