/* V12.7 — transforma o filtro de categoria existente em botões responsivos.
   O select #cat continua existindo como fallback e mantém compatibilidade
   com toda a lógica de filtros já presente em assets/js/app.js.
*/
(() => {
  function initCategoryButtons(){
    const cat = document.getElementById('cat');
    const holder = document.getElementById('category-buttons');
    const clear = document.getElementById('clear-filters');

    if(!cat || !holder) return;

    function syncActiveButton(){
      const current = cat.value || '';
      holder.querySelectorAll('.category-filter-btn').forEach(btn => {
        const active = (btn.dataset.category || '') === current;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
    }

    function buildButtons(){
      const options = [...cat.options];

      // O app.js começa com somente "Todas as categorias" e depois inclui
      // todas as categorias reais. Esperamos essa etapa antes de montar.
      if(options.length <= 1) return false;

      holder.innerHTML = '';

      options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'category-filter-btn';
        btn.dataset.category = option.value || '';
        btn.textContent = index === 0 ? 'Todas' : option.textContent.trim();
        btn.setAttribute('aria-pressed', 'false');
        holder.appendChild(btn);
      });

      document.documentElement.classList.add('category-buttons-ready');
      syncActiveButton();
      return true;
    }

    holder.addEventListener('click', event => {
      const btn = event.target.closest('.category-filter-btn');
      if(!btn) return;

      cat.value = btn.dataset.category || '';
      cat.dispatchEvent(new Event('change', { bubbles:true }));
      syncActiveButton();
    });

    cat.addEventListener('change', syncActiveButton);

    if(clear){
      clear.addEventListener('click', () => {
        requestAnimationFrame(syncActiveButton);
      });
    }

    if(buildButtons()) return;

    const observer = new MutationObserver(() => {
      if(buildButtons()) observer.disconnect();
    });

    observer.observe(cat, { childList:true });

    // Segurança extra para páginas lentas ou cache intermediário.
    window.setTimeout(() => {
      if(!document.documentElement.classList.contains('category-buttons-ready')){
        buildButtons();
      }
    }, 2500);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initCategoryButtons);
  }else{
    initCategoryButtons();
  }
})();
