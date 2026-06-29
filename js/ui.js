// ════════════════════════════════════
// UI — layout & display helpers
// ════════════════════════════════════

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

function editableResultWrap(content, extraClass = '') {
  const classes = ['editable-text'];
  if (extraClass) classes.push(extraClass);
  return `<div class="${classes.join(' ')}" contenteditable="true" spellcheck="false">${content}</div>`;
}

function editableResultCell(content, extraClass = '') {
  return `<td class="result-cell">${editableResultWrap(content, extraClass)}</td>`;
}

function enableEditableResult(prefix) {
  // Now controlled by the ENABLE EDIT toggle — only apply if toggle is ON
  const toggle = document.getElementById(prefix + '-edit-toggle');
  if (toggle && !toggle.checked) return; // default: not editable
  _applyEditableResult(prefix);
}

function _applyEditableResult(prefix) {
  const root = g(prefix + '-result');
  if (!root) return;

  const selectors = [
    '.row-lbl', '.cv', '.csub', '.w-yes', '.cnote',
    '.daily-val', '.daily-sub', '.vpill-lbl', '.vpill-txt',
    '.res-title', '.res-sub', '.ft-disc', '.ft-date'
  ];

  root.querySelectorAll(selectors.join(',')).forEach(el => {
    if (el.getAttribute('contenteditable') === 'true') return;
    el.classList.add('editable-text');
    el.setAttribute('contenteditable', 'true');
    el.setAttribute('spellcheck', 'false');
    el.setAttribute('tabindex', '0');
  });
}

function _removeEditableResult(prefix) {
  const root = g(prefix + '-result');
  if (!root) return;

  root.querySelectorAll('[contenteditable="true"]').forEach(el => {
    el.classList.remove('editable-text');
    el.removeAttribute('contenteditable');
    el.removeAttribute('tabindex');
  });
}

function toggleResultEditable(prefix, enabled) {
  if (enabled) {
    _applyEditableResult(prefix);
    showToast('✏️ Edit mode aktif — semua teks hasil bisa diedit.', 'ok');
  } else {
    _removeEditableResult(prefix);
    showToast('🔒 Edit mode dimatikan.', 'warn');
  }
}

function unduhPDF(nama) {
  const orig = document.title;
  document.title = 'Allianz — ' + nama;
  window.print();
  setTimeout(() => { document.title = orig; }, 1000);
}
