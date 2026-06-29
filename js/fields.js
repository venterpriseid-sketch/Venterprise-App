// ════════════════════════════════════
// FIELDS — product input field renderers
// ════════════════════════════════════

function fieldsSPL(pfx) {
  return `
    <div class="fld-row">
      <div class="fld">
        <label>Premi (Rp)</label>
        <input type="text" inputmode="numeric" class="money-input" id="${pfx}-premi" placeholder="cth. 500000" min="0"/>
      </div>
      <div class="fld">
        <label>Frekuensi</label>
        <select id="${pfx}-frek">
          <option value="12">Bulanan</option>
          <option value="4">Kuartalan</option>
          <option value="2">Semesteran</option>
          <option value="1">Tahunan</option>
        </select>
      </div>
    </div>
    <div class="fld">
      <label>Proteksi Jiwa (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-jiwa" placeholder="cth. 500000000" min="0"/>
    </div>
    <div class="fld">
      <label>Kecelakaan (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-acc" placeholder="cth. 500000000" min="0"/>
    </div>
    <div class="fld">
      <label>Penyakit Kritis (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-kritis" placeholder="cth. 250000000" min="0"/>
    </div>
    <div class="fld">
      <label>Cacat Permanen (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-tpd" placeholder="cth. 500000000" min="0"/>
    </div>
    <label class="chk-fld" onclick="toggleChk(this)">
      <input type="checkbox" id="${pfx}-bp"/><span>✦ Bebas Premi</span>
    </label>`;
}

function fieldsAPL(pfx) {
  return `
    <div class="fld-row">
      <div class="fld">
        <label>Premi (Rp)</label>
        <input type="text" inputmode="numeric" class="money-input" id="${pfx}-premi" placeholder="cth. 500000" min="0"/>
      </div>
      <div class="fld">
        <label>Frekuensi</label>
        <select id="${pfx}-frek">
          <option value="12">Bulanan</option>
          <option value="4">Kuartalan</option>
          <option value="2">Semesteran</option>
          <option value="1">Tahunan</option>
        </select>
      </div>
    </div>
    <div class="fld">
      <label>Proteksi Jiwa (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-jiwa" placeholder="cth. 500000000" min="0"/>
    </div>
    <div class="fld">
      <label>Kecelakaan (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-acc" placeholder="cth. 500000000" min="0"/>
    </div>
    <div class="fld">
      <label>Penyakit Kritis (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-kritis" placeholder="cth. 250000000" min="0"/>
    </div>
    <div class="fld">
      <label>Cacat Permanen (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-tpd" placeholder="cth. 500000000" min="0"/>
    </div>
    <label class="chk-fld" onclick="toggleChk(this)">
      <input type="checkbox" id="${pfx}-bp"/><span>✦ Bebas Premi</span>
    </label>`;
}

function fieldsACP(pfx) {
  return `
    <div class="fld-row">
      <div class="fld">
        <label>Premi (Rp)</label>
        <input type="text" inputmode="numeric" class="money-input" id="${pfx}-premi" placeholder="cth. 500000" min="0"/>
      </div>
      <div class="fld">
        <label>Frekuensi</label>
        <select id="${pfx}-frek">
          <option value="12">Bulanan</option>
          <option value="4">Kuartalan</option>
          <option value="2">Semesteran</option>
          <option value="1">Tahunan</option>
        </select>
      </div>
    </div>
    <div class="fld">
      <label>Masa Pembayaran</label>
      <select id="${pfx}-mp">
        <option value="5">5 Tahun</option>
        <option value="10">10 Tahun</option>
        <option value="15" selected>15 Tahun</option>
      </select>
    </div>
    <div class="fld">
      <label>UP Manfaat Kritis (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-up" placeholder="cth. 500000000" min="0"/>
    </div>`;
}

function fieldsCIH(pfx) {
  return `
    <div class="fld-row">
      <div class="fld">
        <label>Premi (Rp)</label>
        <input type="text" inputmode="numeric" class="money-input" id="${pfx}-premi" placeholder="cth. 500000" min="0"/>
      </div>
      <div class="fld">
        <label>Frekuensi</label>
        <select id="${pfx}-frek">
          <option value="12">Bulanan</option>
          <option value="4">Kuartalan</option>
          <option value="2">Semesteran</option>
          <option value="1">Tahunan</option>
        </select>
      </div>
    </div>
    <div class="fld">
      <label>Masa Pembayaran</label>
      <select id="${pfx}-mp">
        <option value="5">5 Tahun</option>
        <option value="10">10 Tahun</option>
        <option value="15" selected>15 Tahun</option>
      </select>
    </div>
    <div class="fld">
      <label>UP Manfaat Kritis (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-up" placeholder="cth. 500000000" min="0"/>
    </div>
    <div class="fld">
      <label>Masa Kontrak</label>
      <select id="${pfx}-mk">
        <option value="20">20 Tahun</option>
        <option value="30">30 Tahun</option>
      </select>
    </div>
    <div class="fld">
      <label>Early CI</label>
      <select id="${pfx}-early">
        <option value="0">Tidak Ada</option>
        <option value="25">Early CI 25%</option>
        <option value="50">Early CI 50%</option>
      </select>
    </div>
    <label class="chk-fld" onclick="toggleChk(this)">
      <input type="checkbox" id="${pfx}-bonus"/><span>✦ Hasanah Booster</span>
    </label>
    <label class="chk-fld" onclick="toggleChk(this)">
      <input type="checkbox" id="${pfx}-tab"/><span>✦ Hasanah Cash</span>
    </label>
    <label class="chk-fld" onclick="toggleChk(this)">
      <input type="checkbox" id="${pfx}-pyr"/><span>✦ Payor Syariah</span>
    </label>`;
}

function fieldsLPU(pfx) {
  return `
    <div class="fld-row">
      <div class="fld">
        <label>Premi ($)</label>
        <input type="text" inputmode="numeric" class="money-input" id="${pfx}-premi" placeholder="cth. 100" min="0"/>
      </div>
      <div class="fld">
        <label>Frekuensi</label>
        <select id="${pfx}-frek">
          <option value="12">Bulanan</option>
          <option value="4">Kuartalan</option>
          <option value="2">Semesteran</option>
          <option value="1">Tahunan</option>
        </select>
      </div>
    </div>
    <div class="fld">
      <label>Masa Pembayaran</label>
      <select id="${pfx}-mp">
        <option value="5">5 Tahun</option>
        <option value="10">10 Tahun</option>
        <option value="15" selected>15 Tahun</option>
      </select>
    </div>
    <div class="fld">
      <label>UP Jiwa ($)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-jiwa" placeholder="cth. 1000" min="0"/>
    </div>
    <div class="fld">
      <label>Campaign (Text)</label>
      <input type="text" id="${pfx}-cpg" placeholder="cth. Extra UP 5% !!"/>
    </div>`;
}

function fieldsLPI(pfx) {
  return `
    <div class="fld-row">
      <div class="fld">
        <label>Premi (Rp)</label>
        <input type="text" inputmode="numeric" class="money-input" id="${pfx}-premi" placeholder="cth. 1000000" min="0"/>
      </div>
      <div class="fld">
        <label>Frekuensi</label>
        <select id="${pfx}-frek">
          <option value="12">Bulanan</option>
          <option value="4">Kuartalan</option>
          <option value="2">Semesteran</option>
          <option value="1">Tahunan</option>
        </select>
      </div>
    </div>
    <div class="fld">
      <label>Masa Pembayaran</label>
      <select id="${pfx}-mp">
        <option value="5">5 Tahun</option>
        <option value="10">10 Tahun</option>
        <option value="15" selected>15 Tahun</option>
      </select>
    </div>
    <div class="fld">
      <label>UP Jiwa (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-jiwa" placeholder="cth. 1000000000" min="0"/>
    </div>
    <div class="fld">
      <label>Campaign (Text)</label>
      <input type="text" id="${pfx}-cpg" placeholder="cth. Extra UP 10% !!"/>
    </div>`;
}

function fieldsALM(pfx) {
  return `
    <div class="fld-row">
      <div class="fld">
        <label>Premi Setelah Diskon (Rp)</label>
        <input type="text" inputmode="numeric" class="money-input" id="${pfx}-premi" placeholder="cth. 1000000" min="0"/>
      </div>
      <div class="fld">
        <label>Premi Sebelum Diskon (Rp)</label>
        <input type="text" inputmode="numeric" class="money-input" id="${pfx}-premi2" placeholder="cth. 1000000" min="0"/>
      </div>
      <div class="fld">
        <label>Frekuensi</label>
        <select id="${pfx}-frek">
          <option value="12">Bulanan</option>
          <option value="4">Kuartalan</option>
          <option value="2">Semesteran</option>
          <option value="1">Tahunan</option>
        </select>
      </div>
    </div>
    <div class="fld">
      <label>Masa Pembayaran</label>
      <select id="${pfx}-mp">
        <option value="1">Single Premium</option>
        <option value="5">5 Tahun</option>
        <option value="10">10 Tahun</option>
        <option value="15" selected>15 Tahun</option>
      </select>
    </div>
    <div class="fld">
      <label>UP Jiwa (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-jiwa" placeholder="cth. 1000000000" min="0"/>
    </div>
    <div class="fld">
      <label>Campaign (Text)</label>
      <input type="text" id="${pfx}-cpg" placeholder="cth. Extra UP 10% !!"/>
    </div>`;
}

function fieldsAZP(pfx) {
  return `
    <div class="fld-row">
      <div class="fld">
        <label>Premi (Rp)</label>
        <input type="text" inputmode="numeric" class="money-input" id="${pfx}-premi" placeholder="cth. 1000000" min="0"/>
      </div>
      <div class="fld">
        <label>Frekuensi</label>
        <select id="${pfx}-frek">
          <option value="12">Bulanan</option>
          <option value="4">Kuartalan</option>
          <option value="2">Semesteran</option>
          <option value="1">Tahunan</option>
        </select>
      </div>
    </div>
    <div class="fld">
      <label>Masa Pembayaran</label>
      <select id="${pfx}-mp">
        <option value="5">5 Tahun</option>
        <option value="10">10 Tahun</option>
        <option value="15" selected>15 Tahun</option>
      </select>
    </div>
    <div class="fld">
      <label>UP Dasar Kritis (Rp)</label>
      <input type="text" inputmode="numeric" class="money-input" id="${pfx}-up" placeholder="cth. 100000000" min="0"/>
    </div>
    <label class="chk-fld" onclick="toggleChk(this)">
      <input type="checkbox" id="${pfx}-pyr"/><span>✦ Payor CI77</span>
    </label>`;
}

function getFieldsByType(type, pfx) {
  if (type === 'spl') return fieldsSPL(pfx);
  if (type === 'apl') return fieldsSPL(pfx);
  if (type === 'acp') return fieldsACP(pfx);
  if (type === 'cih') return fieldsCIH(pfx);
  if (type === 'lpu') return fieldsLPU(pfx);
  if (type === 'lpi') return fieldsLPI(pfx);
  if (type === 'alm') return fieldsALM(pfx);
  if (type === 'azp') return fieldsAZP(pfx);
  return '';
}
