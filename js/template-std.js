// ════════════════════════════════════
// STANDARD TEMPLATE
// ════════════════════════════════════

function renderStdFields(i) {
  const type = sv('std-type' + i);
  g('std-fields' + i).innerHTML = getFieldsByType(type, 'std' + i);
  attachMoneyInputFormatting(g('std-fields' + i));
}

function generateStd() {
  const allOpts = [1, 2, 3].map(i => {
    const type = sv('std-type' + i);
    const d    = readData(type, 'std' + i);
    if (!d || !d.premi) return null;
    return { ...d, idx: i };
  });

  const opts = allOpts.filter(Boolean);
  if (!opts.length) { alert('Isi minimal 1 opsi premi!'); return; }

  // Collect row key order and labels
  const rowMeta = {};
  opts.forEach(o => buildRows(o, '').forEach(r => {
    if (!rowMeta[r.key]) rowMeta[r.key] = r.label;
  }));

  // Per-opt value maps
  const maps = opts.map(o => {
    const m = {};
    buildRows(o, '').forEach(r => { m[r.key] = r.val; });
    return m;
  });

  // Header
  const thead = g('std-thead');
  thead.innerHTML = '<th>Manfaat</th>';
  opts.forEach(o => { thead.innerHTML += `<th>Opsi ${o.idx}</th>`; });

  let html = '';
  Object.entries(rowMeta).forEach(([key, label]) => {
    html += `<tr><td><div class="row-lbl">${label}</div></td>`;
    maps.forEach(m => {
      html += `<td>${m[key] || '<div class="cv" style="color:var(--text3)">—</div>'}</td>`;
    });
    html += '</tr>';
  });

  // Daily penyisihan row
  html += '<tr class="daily-row"><td><div class="daily-lbl">💡 Penyisihan / Hari</div></td>';
  opts.forEach(o => {
    const pd = perHari(o.premi, o.frek);
    html += `<td><div class="daily-val">Rp ${pd.toLocaleString('id-ID')}</div><div class="daily-sub">per hari</div></td>`;
  });
  html += '</tr>';

  // Title & vpills
  g('std-vpills').innerHTML = `
    <div class="vpill"><div class="vpill-ico">🛡️</div><div>
      <div class="vpill-lbl">Proteksi Jiwa</div>
      <div class="vpill-txt">Keluarga tetap dapat melanjutkan hidup tanpa menurunkan standar kualitas hidup.</div>
    </div></div>
    <div class="vpill"><div class="vpill-ico">🏥</div><div>
      <div class="vpill-lbl">Penyakit Kritis</div>
      <div class="vpill-txt">Aset dan keuangan tetap terjaga, Masalah Finansial tidak merugikan keluarga.</div>
    </div></div>
    <div class="vpill"><div class="vpill-ico">🏛️</div><div>
      <div class="vpill-lbl">Tabungan Terencana</div>
      <div class="vpill-txt">Pastikan usia tua Anda dijamin dengan tabungan terencana.</div>
    </div></div>`;

  g('std-res-title').textContent = 'Perbandingan Opsi Proteksi';
  g('std-res-sub').textContent   = 'Dibuat pada ' + hariIni();
  g('std-ft-date').textContent   = hariIni() + ' | Revolve/VE ';
  g('std-tbody').innerHTML       = html;
  attachMoneyInputFormatting(document);
  enableEditableResult('std');
  showResult('std');
}

// ── Init: clone standard option template into the DOM (was previously inline)
function initStdOptionsFromTemplate() {
  const tpl = document.getElementById('std-opt-template');
  const container = document.getElementById('std-opts-grid');
  if (!tpl || !container) return false;

  const optsList = [
    { v: 'spl', t: '🛡️ Smartlink Protection Life' },
    { v: 'apl', t: '🛡️ AlliSya Protection Life' },
    { v: 'acp', t: '🏥 Allianz Critical Plus' },
    { v: 'cih', t: '🏥 AlliSya CI Hasanah' },
    { v: 'lpu', t: '🪦 Allianz LegacyPro USD' },
    { v: 'lpi', t: '🪦 Allianz LegacyPro IDR' },
    { v: 'alm', t: '🪦 AlliSya LegacyMax' },
    { v: 'azp', t: '💰 Allianz Pasti (SOON)' }
  ];

  for (let i = 1; i <= 3; i++) {
    const node = tpl.content.cloneNode(true);
    const col = node.querySelector('.opt-col');
    const hd = col.querySelector('.opt-hd');
    hd.classList.add('c' + i);
    hd.querySelector('.opt-num').textContent = i;
    hd.querySelector('.opt-title').textContent = 'Opsi ' + i;

    const select = col.querySelector('select');
    select.id = 'std-type' + i;
    select.addEventListener('change', () => renderStdFields(i));
    optsList.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o.v;
      opt.textContent = o.t;
      select.appendChild(opt);
    });

    const fields = col.querySelector('.opt-fields');
    fields.id = 'std-fields' + i;

    container.appendChild(node);
  }
  return true;
}

// Ensure init runs after DOM is ready; try immediate first for performance
if (!initStdOptionsFromTemplate()) {
  document.addEventListener('DOMContentLoaded', () => { initStdOptionsFromTemplate(); });
}
