
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const SITE_ASSET_VERSION='v12.4-20260818';
function versionedURL(url){
  const value=String(url??'');
  if(!value || /^(https?:|data:|blob:)/i.test(value)) return value;
  const sep=value.includes('?')?'&':'?';
  return `${value}${sep}v=${encodeURIComponent(SITE_ASSET_VERSION)}`;
}
async function loadJSON(path){ const r=await fetch(versionedURL(path),{cache:'no-store'}); if(!r.ok) throw new Error(path); return r.json(); }
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
      <a class="brand" href="index.html" aria-label="Página inicial do Caderno de Receitas">
        <span class="brand-mark">✦</span><span>Caderno de Receitas</span>
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
  const q=$('#q'), cat=$('#cat'), status=$('#status'), clear=$('#clear-filters'), grid=$('#recipes'), empty=$('#empty');
  if(!q || !cat || !status || !clear || !grid || !empty) return;

  const recipes=await loadJSON('data/recipes.json');
  const cats=[...new Set(recipes.map(r=>r.categoria))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
  cats.forEach(c=>cat.insertAdjacentHTML('beforeend',`<option value="${safe(c)}">${safe(c)}</option>`));

  const updateClear=()=>{
    const active=Boolean(q.value || cat.value || status.value);
    clear.disabled=!active;
    clear.setAttribute('aria-disabled',String(!active));
  };

  const render=()=>{
    const list=recipes.filter(r=>
      matchesSearch(r,q.value) &&
      (!cat.value || r.categoria===cat.value) &&
      (!status.value || r.status===status.value)
    );
    grid.innerHTML=list.map(recipeCard).join('');
    empty.hidden=Boolean(list.length);
    updateClear();
  };

  q.addEventListener('input',render);
  cat.addEventListener('change',render);
  status.addEventListener('change',render);
  clear.addEventListener('click',()=>{
    q.value='';
    cat.value='';
    status.value='';
    render();
    q.focus();
  });

  render();
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
  if(f)f.innerHTML=footer();

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
