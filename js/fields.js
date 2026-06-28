// ════════════════════════════════════
// FIELDS — product input field renderers
// ════════════════════════════════════

function fieldsSPL(pfx) {
  return `
    <div class="fld-row">
      <div class="fld">
        <label>Premi (Rp)</label>
        <input type="number" id="${pfx}-premi" placeholder="cth. 500000" min="0"/>
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
      <input type="number" id="${pfx}-jiwa" placeholder="cth. 500000000" min="0"/>
    </div>
    <div class="fld">
      <label>Penyakit Kritis (Rp)</label>
      <input type="number" id="${pfx}-kritis" placeholder="cth. 250000000" min="0"/>
    </div>
    <div class="fld">
      <label>Kecelakaan (Rp)</label>
      <input type="number" id="${pfx}-acc" placeholder="cth. 500000000" min="0"/>
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
        <input type="number" id="${pfx}-premi" placeholder="cth. 500000" min="0"/>
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
      <input type="number" id="${pfx}-up" placeholder="cth. 500000000" min="0"/>
    </div>`;
}

function fieldsCIH(pfx) {
  return `
    <div class="fld-row">
      <div class="fld">
        <label>Premi (Rp)</label>
        <input type="number" id="${pfx}-premi" placeholder="cth. 500000" min="0"/>
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
      <input type="number" id="${pfx}-up" placeholder="cth. 500000000" min="0"/>
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

function fieldsLegacy(pfx) {
  return `
    <div class="fld-row">
      <div class="fld">
        <label>Premi (Rp)</label>
        <input type="number" id="${pfx}-premi" placeholder="cth. 1000000" min="0"/>
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
      <input type="number" id="${pfx}-jiwa" placeholder="cth. 1000000000" min="0"/>
    </div>
    <div class="fld">
      <label>Target Warisan / Investasi (Rp)</label>
      <input type="number" id="${pfx}-inv" placeholder="cth. 2000000000" min="0"/>
    </div>
    <div class="fld">
      <label>Masa Kontrak</label>
      <select id="${pfx}-mk">
        <option value="20">20 Tahun</option>
        <option value="30">30 Tahun</option>
        <option value="99">Seumur Hidup</option>
      </select>
    </div>
    <label class="chk-fld" onclick="toggleChk(this)">
      <input type="checkbox" id="${pfx}-ci"/><span>✦ Rider Penyakit Kritis</span>
    </label>
    <label class="chk-fld" onclick="toggleChk(this)">
      <input type="checkbox" id="${pfx}-bp"/><span>✦ Bebas Premi</span>
    </label>`;
}

function getFieldsByType(type, pfx) {
  if (type === 'spl')    return fieldsSPL(pfx);
  if (type === 'acp')    return fieldsACP(pfx);
  if (type === 'cih')    return fieldsCIH(pfx);
  if (type === 'legacy') return fieldsLegacy(pfx);
  return '';
}
