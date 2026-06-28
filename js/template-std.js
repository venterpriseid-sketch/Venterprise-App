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
      <div class="vpill-lbl">Warisan Terencana</div>
      <div class="vpill-txt">Pastikan aset dan nilai hidup keluarga diwariskan dengan bermartabat.</div>
    </div></div>`;

  g('std-res-title').textContent = 'Perbandingan Opsi Proteksi';
  g('std-res-sub').textContent   = 'Dibuat pada ' + hariIni();
  g('std-ft-date').textContent   = hariIni() + ' | Revolve/VE ';
  g('std-tbody').innerHTML       = html;
  showResult('std');
}
