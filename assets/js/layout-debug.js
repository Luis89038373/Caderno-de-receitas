/* V13.3 — indicador temporário de breakpoint/resolução
   Remover depois que os ajustes responsivos forem homologados.
*/
(() => {
  const getMode = width => {
    if (width <= 600) return 'CELULAR';
    if (width <= 1000) return 'TABLET';
    return 'PC';
  };

  const ensureBadge = () => {
    let badge = document.getElementById('layout-debug-badge');
    if (badge) return badge;

    badge = document.createElement('div');
    badge.id = 'layout-debug-badge';
    badge.setAttribute('aria-live', 'polite');
    badge.setAttribute('title', 'Indicador temporário de layout responsivo');

    Object.assign(badge.style, {
      position: 'fixed',
      right: '10px',
      bottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
      zIndex: '99999',
      padding: '6px 9px',
      borderRadius: '999px',
      border: '1px solid rgba(15,198,209,.95)',
      background: 'rgba(1,18,24,.92)',
      color: '#9af8fb',
      boxShadow: '0 4px 14px rgba(0,0,0,.22)',
      font: '800 11px/1.1 Inter, system-ui, -apple-system, Segoe UI, sans-serif',
      letterSpacing: '.02em',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      backdropFilter: 'blur(6px)'
    });

    document.body.appendChild(badge);
    return badge;
  };

  const update = () => {
    const width = Math.round(window.innerWidth);
    const height = Math.round(window.innerHeight);
    const badge = ensureBadge();
    badge.textContent = `${getMode(width)} · ${width}px`;
    badge.dataset.width = String(width);
    badge.dataset.height = String(height);
    badge.dataset.mode = getMode(width);
  };

  let timer = 0;
  const scheduleUpdate = () => {
    clearTimeout(timer);
    timer = setTimeout(update, 60);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', update, { once:true });
  } else {
    update();
  }

  window.addEventListener('resize', scheduleUpdate, { passive:true });
  window.addEventListener('orientationchange', scheduleUpdate, { passive:true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', scheduleUpdate, { passive:true });
  }
})();
