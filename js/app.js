// ════════════════════════════════════
// APP — bootstrap & init
// ════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Render initial Standard template fields
  [1, 2, 3].forEach(i => renderStdFields(i));

  // Render initial Bundling grid
  renderBunGrid();
});
