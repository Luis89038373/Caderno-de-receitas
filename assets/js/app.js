const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const SITE_ASSET_VERSION='v13.9-20260818';

function versionedURL(url){
  const value=String(url??'');
  if(!value || /^(https?:|data:|blob:)/i.test(value)) return value;
  const sep=value.includes('?')?'&':'?';
  return `${value}${sep}v=${encodeURIComponent(SITE_ASSET_VERSION)}`;
}

function applyRecipeCorrections(data,path){
  if(!Array.isArray(data) || !/recipes\.json$/i.test(String(path).split('?')[0])) return data;

  return data
    // V13.9 — REC-0070 removida do site.
    .filter(recipe => recipe && recipe.id !== 'REC-0070')
    .map(recipe => {
      if(!recipe || recipe.id !== 'REC-0083') return recipe;

      // V13.9 — REC-0083: remover "Variante 2" de todo texto visível.
      const contexto = String(recipe.contexto || '')
        .replace(/Esfiha\s*[—–-]\s*Variante\s*2/gi,'Esfiha')
        .replace(/\s{2,}/g,' ')
        .trim();

      return {
        ...recipe,
        titulo:'Esfiha',
        slug:'esfiha',
        contexto
      };
    });
}

async function loadJSON(path){
  const r=await fetch(versionedURL(path),{cache:'no-store'});
  if(!r.ok) throw new Error(path);
  const data=await r.json();
  return applyRecipeCorrections(data,path);
}

function safe(t){ return String(t??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m])); }
function statusLabel(s){ return s==='publicada'?'Publicada':'Em revisão'; }

function normalizeSearch(t){
  return String(t??'')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,' ')
    .trim();
}

function matchesSearch(recipe, query){
  const terms=normalizeSearch(query).split(/\s+/).filter(Boolean);
  if(!terms.length) return true;
  const haystack=normalizeSearch([recipe.id,recipe.titulo,recipe.categoria,recipe.contexto].filter(Boolean).join(' '));
  return terms.every(term=>haystack.includes(term));
}

function recipeCard(r){
  const img=r.imagem&&r.imagem.url?versionedURL(r.imagem.url):'';
  return `<a class="card recipe-card" href="receita.html?id=${encodeURIComponent(r.id)}" data-search="${safe((r.id+' '+r.titulo+' '+r.categoria).toLowerCase())}" data-cat="${safe(r.categoria)}">
    <div class="card-media">${img?`<img loading="lazy" src="${safe(img)}" alt="${safe(r.titulo)}" onerror="this.style.display='none'">`:''}<span class="badge">${safe(r.id)}</span></div>
    <div class="card-body"><div class="meta"><span>${safe(r.categoria)}</span><span>•</span><span>${statusLabel(r.status)}</span></div><h3>${safe(r.titulo)}</h3><p>${safe((r.contexto||'').slice(0,155))}${(r.contexto||'').length>155?'...':''}</p></div>
  </a>`;
}

function isListingPage(){
  const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  return file==='index.html' || file==='catalogo.html' || file==='';
}

function nav(){
  const filters=isListingPage()?`
    <div class="container header-filterbar" id="header-filterbar">
      <input id="q" class="search header-search" placeholder="Buscar por nome ou ID..." aria-label="Buscar receitas">
      <select id="cat" class="search" aria-label="Filtrar por categoria"><option value="">Todas as categorias</option></select>
      <select id="status" class="search" aria-label="Filtrar por status"><option value="">Todos os status</option><option value="publicada">Publicadas</option><option value="em_revisao">Em revisão</option></select>
      <button id="clear-filters" class="btn clear-filters" type="button">Limpar filtros</button>
    </div>`:'';

  return `<header class="topbar">
    <div class="container nav">
      <a class="brand brand-celina" href="index.html" aria-label="Celina — Livro de Receitas">
        <img class="brand-logo" src="${versionedURL('assets/img/logo-celina.png')}" alt="Celina — Livro de Receitas">
      </a>
      <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="main-navigation">
        <span></span><span></span><span></span>
      </button>
      <nav class="navlinks" id="main-navigation">
        <a href="index.html">Receitas</a><a href="catalogo.html">Catálogo geral</a>
        <a href="acervo.html">Acervo em revisão</a>
        <a href="documentacao/PADRAO_OFICIAL.md">Padrão oficial</a>
      </nav>
    </div>
    ${filters}
  </header>`;
}

async function initRecipeListing(){
  if(!isListingPage()) return;

  const q=$('#q');
  const cat=$('#cat');
  const status=$('#status');
  const clear=$('#clear-filters');
  const grid=$('#recipes');
  const empty=$('#empty');

  if(!q || !cat || !status || !clear || !grid || !empty){
    console.error('Controles do catálogo não encontrados.');
    return;
  }

  const recipes=await loadJSON('data/recipes.json');

  cat.innerHTML='<option value="">Todas as categorias</option>';
  const cats=[...new Set(recipes.map(r=>r.categoria).filter(Boolean))]
    .sort((a,b)=>a.localeCompare(b,'pt-BR'));

  cats.forEach(c=>{
    const opt=document.createElement('option');
    opt.value=c;
    opt.textContent=c;
    cat.appendChild(opt);
  });

  let resultInfo=$('#results-info');
  if(!resultInfo){
    resultInfo=document.createElement('div');
    resultInfo.id='results-info';
    resultInfo.className='results-info';
    const sectionHead=grid.closest('.section')?.querySelector('.section-head');
    if(sectionHead) sectionHead.insertAdjacentElement('afterend',resultInfo);
  }

  const updateClear=()=>{
    const active=Boolean(q.value.trim() || cat.value || status.value);
    clear.disabled=!active;
    clear.setAttribute('aria-disabled',String(!active));
  };

  const moveToResults=()=>{
    const section=grid.closest('.section');
    if(!section) return;
    const headerHeight=parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--fixed-header-height')
    ) || document.querySelector('#site-nav')?.getBoundingClientRect().height || 0;

    const target=Math.max(
      0,
      section.getBoundingClientRect().top + window.scrollY - headerHeight - 14
    );

    window.scrollTo({top:target,behavior:'smooth'});
  };

  const render=(shouldMove=false)=>{
    const query=q.value.trim();
    const category=cat.value;
    const state=status.value;

    const list=recipes.filter(r=>
      matchesSearch(r,query) &&
      (!category || r.categoria===category) &&
      (!state || r.status===state)
    );

    grid.innerHTML=list.map(recipeCard).join('');
    empty.hidden=Boolean(list.length);

    if(resultInfo){
      const active=Boolean(query || category || state);
      resultInfo.hidden=!active;
      resultInfo.textContent=active
        ? `${list.length} ${list.length===1?'receita encontrada':'receitas encontradas'}`
        : '';
    }

    updateClear();

    if(shouldMove){
      window.requestAnimationFrame(moveToResults);
    }
  };

  let inputTimer=null;

  q.addEventListener('input',()=>{
    window.clearTimeout(inputTimer);
    inputTimer=window.setTimeout(()=>render(true),120);
  });

  cat.addEventListener('change',()=>render(true));
  status.addEventListener('change',()=>render(true));

  clear.addEventListener('click',()=>{
    q.value='';
    cat.value='';
    status.value='';
    render(true);
    q.focus();
  });

  render(false);
}

function syncFixedHeader(){
  const siteNav=$("#site-nav");
  if(!siteNav) return;

  const apply=()=>{
    const h=Math.ceil(siteNav.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--fixed-header-height",`${h}px`);
    document.body.classList.add("fixed-header-ready");
  };

  apply();

  if("ResizeObserver" in window){
    const ro=new ResizeObserver(apply);
    ro.observe(siteNav);
  }

  window.addEventListener("resize",apply);
}

function footer(){
  return `<footer class="footer"><div class="container footer-inner"><span>Acervo culinário da família</span><span>Receitas preservadas, organizadas e identificadas por ID.</span></div></footer>`;
}

document.addEventListener("DOMContentLoaded",async()=>{
  const h=$("#site-nav");

  if(h){
    if(!h.querySelector(".topbar")) h.innerHTML=nav();

    const toggle=$(".menu-toggle");
    const links=$(".navlinks");

    if(toggle && links){
      const closeMenu=()=>{
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded","false");
        toggle.setAttribute("aria-label","Abrir menu");
      };

      toggle.addEventListener("click",()=>{
        const open=links.classList.toggle("open");
        toggle.setAttribute("aria-expanded",String(open));
        toggle.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");
      });

      $$(".navlinks a").forEach(a=>a.addEventListener("click",closeMenu));
      window.addEventListener("resize",()=>{ if(window.innerWidth>760) closeMenu(); });
    }
  }

  const f=$("#site-footer");
  if(f) f.innerHTML=footer();

  syncFixedHeader();

  try{
    await initRecipeListing();
  }catch(err){
    console.error("Erro ao carregar catálogo:",err);
    const empty=$("#empty");
    if(empty){
      empty.hidden=false;
      empty.textContent="Não foi possível carregar as receitas. Atualize a página.";
    }
  }
});
