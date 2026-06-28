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

function unduhPDF(nama) {
  const orig = document.title;
  document.title = 'Allianz — ' + nama;
  window.print();
  setTimeout(() => { document.title = orig; }, 1000);
}
