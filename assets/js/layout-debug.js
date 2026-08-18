/* V13.17 — indicador de pixel removido.
   Arquivo neutro para impedir a exibição do badge PC/CELULAR. */
(() => {
  const existing = document.getElementById('layout-debug-badge');
  if(existing) existing.remove();
})();
