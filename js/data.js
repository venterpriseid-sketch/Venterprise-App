// ════════════════════════════════════
// DATA — read inputs & build row lists
// ════════════════════════════════════

/**
 * Read form values for a given product type + prefix.
 */
function readData(type, pfx) {
  const premi = nv(pfx + '-premi');
  const premi2 = nv(pfx + '-premi2');
  const frek = sv(pfx + '-frek') || '12';

  if (type === 'spl' || type === 'apl') {
    return {
      type, premi, frek,
      jiwa: nv(pfx + '-jiwa'),
      kritis: nv(pfx + '-kritis'),
      acc: nv(pfx + '-acc'),
      tpd: nv(pfx + '-tpd'),
      bp: chkd(pfx + '-bp'),
    };
  }

  if (type === 'acp') {
    const mp = parseInt(sv(pfx + '-mp') || 15);
    return {
      type, premi, frek, mp,
      up: nv(pfx + '-up')
    };
  }

  if (type === 'cih') {
    const mp = parseInt(sv(pfx + '-mp') || 15);
    return {
      type, premi, frek, mp,
      up: nv(pfx + '-up'),
      bonus: chkd(pfx + '-bonus'),
      pyr: chkd(pfx + '-pyr'),
      early: parseInt(sv(pfx + '-early') || 0),
      mk: sv(pfx + '-mk') || '20',
      tab: chkd(pfx + '-tab')
    };
  }

  if (type === 'lpi' || type === 'lpu') {
    const mp = parseInt(sv(pfx + '-mp') || 15);
    return {
      type, premi, frek, mp,
      jiwa: nv(pfx + '-jiwa'),
      cpg: nv(pfx + '-cpg')
    };
  }

  if (type === 'alm') {
    const mp = parseInt(sv(pfx + '-mp') || 15);
    return {
      type, premi, premi2, frek, mp,
      jiwa: nv(pfx + '-jiwa'),
      cpg: nv(pfx + '-cpg')
    };
  }

  if (type === 'azp') {
    const mp = parseInt(sv(pfx + '-mp') || 15);
    return {
      type, premi, premi2, frek, mp,
      jiwa: nv(pfx + '-up'),
      cpg: nv(pfx + '-pyr')
    };
  }
}

// ─────────────────────────────────────────
// buildRows
// Returns [{key, label, val, mergeKey, mergeVal}]
// mergeKey/mergeVal used by bundling merge logic
// ─────────────────────────────────────────
function buildRows(d, badge) {
  const b = badge ? `<span class="src-badge src-${d.type}">${badge}</span>` : '';
  const rows = [];

  if (d.type === 'spl' || d.type === 'apl') {
    rows.push({
      key: 'premi', label: '💵 Premi & Frekuensi',
      val: `<div class="cv">${rp(d.premi)}</div><div class="csub">${frekLabel(d.frek)}</div>${b}`
    });
    rows.push({
      key: 'jiwa', label: '🛡️ Proteksi Jiwa',
      val: `<div class="cv">${rp(d.jiwa)}</div><div class="csub">Keluarga tetap melanjutkan hidup.</div>${b}`,
      mergeKey: 'jiwa', mergeVal: d.jiwa
    });
    rows.push({
      key: 'kritis', label: '🏥 Penyakit Kritis',
      val: `<div class="cv">${rp(d.kritis)}</div><div class="csub">Mempertahankan kualitas dan biaya hidup.</div>${b}`,
      mergeKey: 'kritis', mergeVal: d.kritis
    });
    rows.push({
      key: 'earlyCi', label: '⚡ Kritis Tahap Awal',
      val: `<div class="cv">${rp(d.kritis * 0.5)}</div><div class="csub">Manfaat 50% dari Uang Pertanggungan.</div>${b}`
    });
    if (d.acc > 0)
      rows.push({
        key: 'acc', label: '🚑 Kecelakaan',
        val: `<div class="cv">${rp(d.acc)}</div><div class="csub">Perlindungan risiko kecelakaan.</div>${b}`,
        mergeKey: 'acc', mergeVal: d.acc
      });
    if (d.tpd > 0)
      rows.push({
        key: 'tpd', label: '♿ Cacat Permanen',
        val: `<div class="cv">${rp(d.tpd)}</div><div class="csub">Perlindungan risiko cacat permanen.</div>${b}`,
        mergeKey: 'tpd', mergeVal: d.tpd
      });
    if (d.bp)
      rows.push({
        key: 'bp', label: '✅ Bebas Premi',
        val: `<div class="w-yes">✔ Termasuk</div><div class="csub">Proteksi aktif tanpa membayar premi.</div>${b}`
      });
    rows.push({
      key: 'masaKontrak', label: '📅 Masa Cover',
      val: `<div class="cv">Usia 99 Tahun</div>${b}`
    });

  }

  else if (d.type === 'acp') {
    const tp = totalPremi(d.premi, d.frek, d.mp);
    const bv = d.up * 0.5;
    const ev = (d.up + bv) * 0.25;
    const jiwaVal = tp * 1.5;
    rows.push({
      key: 'premi', label: '💵 Premi & Frekuensi',
      val: `<div class="cv">${rp(d.premi)}</div><div class="csub">${frekLabel(d.frek)} · Bayar ${d.mp} Thn</div>${b}`
    });
    rows.push({
      key: 'kritis', label: '🏥 Manfaat Kritis',
      val: `<div class="cv">${rp(d.up)}</div><div class="csub">Mempertahankan kualitas dan biaya hidup.</div>${b}`,
      mergeKey: 'kritis', mergeVal: d.up
    });
    rows.push({
      key: 'bonus', label: '🎁 Bonus UP',
      val: `<div class="cv">${rp(bv)}</div><div class="cnote">Ekstra 50% dari UP mulai Thn ke-2</div>${b}`
    });
    rows.push({
      key: 'earlyCi', label: '⚡ Kritis Tahap Awal',
      val: `<div class="cv">${rp(ev)}</div><div class="csub">Manfaat 25% dari Uang Pertanggungan.</div>${b}`
    });
    rows.push({
      key: 'jiwa', label: '🛡️ Manfaat Jiwa',
      val: `<div class="cv">s.d. ${rp(jiwaVal)}</div><div class="csub">Manfaat 150% dari total premi.</div>${b}`
    });
    rows.push({
      key: 'bp', label: '✅ Bebas Premi',
      val: `<div class="w-yes">✔ Termasuk</div><div class="csub">Proteksi gratis jika terdiagnosa P.Kritis Tahap Awal.</div>${b}`
    });
    rows.push({
      key: 'tabungan', label: '💰 Manfaat Tabungan',
      val: `<div class="w-yes">✔ ${rp(tp)}</div><div class="csub">Dikembalikan di Tahun ke-20.</div>${b}`
    });
    rows.push({
      key: 'masaKontrak', label: '📅 Masa Cover',
      val: `<div class="cv">20 Tahun</div>${b}`
    });

  }

  else if (d.type === 'cih') {
    const tp = totalPremi(d.premi, d.frek, d.mp);
    rows.push({
      key: 'premi', label: '💵 Premi & Frekuensi',
      val: `<div class="cv">${rp(d.premi)}</div><div class="csub">${frekLabel(d.frek)} · Bayar ${d.mp} Thn</div>${b}`
    });
    rows.push({
      key: 'kritis', label: '🏥 Manfaat Kritis',
      val: `<div class="cv">${rp(d.up)}</div><div class="csub">Mempertahankan kualitas dan biaya hidup.</div>${b}`,
      mergeKey: 'kritis', mergeVal: d.up
    });
    if (d.bonus) {
      const bv = d.up * 0.5;
      rows.push({
        key: 'bonus', label: '🎁 Bonus UP',
        val: `<div class="cv">${rp(bv)}</div><div class="cnote">Bonus berlaku sejak Polis Aktif.</div>${b}`
      });
    }
    if (d.early > 0) {
      const bv = d.up * 0.5;
      const ev = (d.up + bv) * (d.early / 100);
      rows.push({
        key: 'earlyCi', label: '⚡ Kritis Tahap Awal',
        val: `<div class="cv">${rp(ev)}</div><div class="csub">Early CI ${d.early}%</div>${b}`,
        mergeKey: 'kritis', mergeVal: ev
      });
    }
    rows.push({
      key: 'jiwa', label: '🛡️ Manfaat Jiwa',
      val: `<div class="cv">${rp(d.up)}</div><div class="csub">Mengikuti Manfaat UP Kritis</div>${b}`
    });
    if (d.early > 0)
      rows.push({
        key: 'bp', label: '✅ Bebas Premi',
        val: `<div class="w-yes">✔ Termasuk</div><div class="csub">Proteksi gratis jika terdiagnosa P.Kritis Tahap Awal.</div>${b}`
      });
    if (d.tab)
      rows.push({
        key: 'tabungan', label: '💰 Manfaat Tabungan',
        val: `<div class="w-yes">✔ ${rp(tp)}</div><div class="csub">Dikembalikan di Tahun ke-20.</div>${b}`
      });
    rows.push({
      key: 'masaKontrak', label: '📅 Masa Cover',
      val: `<div class="cv">${d.mk} Tahun</div>${b}`
    });

  }

  else if (d.type === 'lpu') {
    const tp = totalPremi(d.premi, d.frek, d.mp);
    rows.push({
      key: 'premi', label: '💵 Premi & Frekuensi',
      val: `<div class="cv">${usd(d.premi)}</div><div class="csub">${frekLabel(d.frek)} · Bayar ${d.mp} Thn</div><div class="cnote">Total: ${usd(tp)}</div>${b}`
    });
    rows.push({
      key: 'jiwa', label: '🛡️ Uang Pertanggungan',
      val: `<div class="cv">${usd(d.jiwa)}</div><div class="csub">Keluarga terlindungi dan warisan terjamin.</div>${b}`,
      mergeKey: 'jiwa', mergeVal: d.jiwa
    });
    rows.push({
      key: 'bonus', label: '💸 Ekstra Nilai UP+',
      val: `<div class="cv">${usd(d.jiwa * 1.5)}</div><div class="csub">Perlindungan meningkat sebesar 50% mulai usia 75th+</div>${b}`,
      mergeKey: 'jiwa', mergeVal: d.jiwa * 1.5
    });
    rows.push({
      key: 'bp', label: '✅ Bebas Premi',
      val: `<div class="w-yes">✔ Termasuk</div>${b}`
    });
    rows.push({
      key: 'masaKontrak', label: '📅 Masa Cover',
      val: `<div class="cv">Usia 99 Tahun</div>${b}`
    });
    if (d.cpg != null) {
      rows.push({
        key: 'cpg', label: '🎁 Promo Periode Khusus',
        val: `<div class="cv">${d.cpg}</div><div class="csub">Jangan lewatkan kesempatan ini!</div>${b}`,
        mergeKey: 'cpg', mergeVal: d.cpg
      });
    }
  }

  else if (d.type === 'lpi') {
    const tp = totalPremi(d.premi, d.frek, d.mp);
    rows.push({
      key: 'premi', label: '💵 Premi & Frekuensi',
      val: `<div class="cv">${rp(d.premi)}</div><div class="csub">${frekLabel(d.frek)} · Bayar ${d.mp} Thn</div><div class="cnote">Total: ${rp(tp)}</div>${b}`
    });
    rows.push({
      key: 'jiwa', label: '🛡️ Uang Pertanggungan',
      val: `<div class="cv">${rp(d.jiwa)}</div><div class="csub">Keluarga terlindungi dan warisan terjamin.</div>${b}`,
      mergeKey: 'jiwa', mergeVal: d.jiwa
    });
    rows.push({
      key: 'bonus', label: '💸 Ekstra Nilai UP+',
      val: `<div class="cv">${rp(d.jiwa * 1.5)}</div><div class="csub">Perlindungan meningkat sebesar 50% mulai usia 75th+</div>${b}`,
      mergeKey: 'jiwa', mergeVal: d.jiwa * 1.5
    });
    rows.push({
      key: 'bp', label: '✅ Bebas Premi',
      val: `<div class="w-yes">✔ Termasuk</div>${b}`
    });
    rows.push({
      key: 'masaKontrak', label: '📅 Masa Cover',
      val: `<div class="cv">Usia 99 Tahun</div>${b}`
    });
    if (d.cpg != null) {
      rows.push({
        key: 'cpg', label: '🎁 Promo Periode Khusus',
        val: `<div class="cv">${d.cpg}</div><div class="csub">Jangan lewatkan kesempatan ini!</div>${b}`,
        mergeKey: 'cpg', mergeVal: d.cpg
      });
    }
  }

  else if (d.type === 'alm') {
    const tp = totalPremi(d.premi, d.frek, d.mp);
    rows.push({
      key: 'premi', label: '💵 Premi & Frekuensi',
      val: `<div class="cv">${rp(d.premi)}</div><div class="csub">${frekLabel(d.frek)} · Bayar ${d.mp} Thn</div><div class="cnote">Total: ${rp(tp)}</div>${b}`
    });
    rows.push({
      key: 'jiwa', label: '🛡️ Uang Pertanggungan',
      val: `<div class="cv">${rp(d.jiwa)}</div><div class="csub">Keluarga terlindungi dan warisan terjamin.</div>${b}`,
      mergeKey: 'jiwa', mergeVal: d.jiwa
    });
    rows.push({
      key: 'bonus', label: '💸 Ekstra Nilai UP',
      val: `<div class="cv">${rp(d.jiwa * 0.1)}</div><div class="csub">Perlindungan meningkat sebesar 10% per 10 Tahun mulai Th-25</div>${b}`,
      mergeKey: 'jiwa', mergeVal: d.jiwa * 0.1
    });
    rows.push({
      key: 'tabungan', label: '💰 Manfaat Tabungan',
      val: `<div class="w-yes">✔ ${rp(tp)}</div><div class="csub">Premi kembali di Tahun ke-25 dan polis tetap aktif.</div>${b}`
    });
    rows.push({
      key: 'masaKontrak', label: '📅 Masa Cover',
      val: `<div class="cv">Usia 120 Tahun</div>${b}`
    });
    if (d.cpg != null) {
      rows.push({
        key: 'cpg', label: '🎁 Promo Periode Khusus',
        val: `<div class="cv">${d.cpg}</div><div class="csub">Jangan lewatkan kesempatan ini!</div>${b}`,
        mergeKey: 'cpg', mergeVal: d.cpg
      });
    }
  }

  else if (d.type === 'azp') {
    rows.push({
      key: 'soon', label: '🧩 Allianz Pasti',
      val: `<div class="w-yes">🚧 Segera Hadir</div><div class="csub">Fitur Allianz Pasti sedang dalam pengembangan.</div>${b}`
    });
  }

  return rows;
}
