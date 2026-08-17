
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
async function loadJSON(path){ const r=await fetch(path); if(!r.ok) throw new Error(path); return r.json(); }
function safe(t){ return String(t??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m])); }
function statusLabel(s){ return s==='publicada'?'Publicada':'Em revisão'; }
function recipeCard(r){
  const img=r.imagem&&r.imagem.url?r.imagem.url:'';
  return `<a class="card recipe-card" href="receita.html?id=${encodeURIComponent(r.id)}" data-search="${safe((r.id+' '+r.titulo+' '+r.categoria).toLowerCase())}" data-cat="${safe(r.categoria)}">
    <div class="card-media">${img?`<img loading="lazy" src="${safe(img)}" alt="${safe(r.titulo)}" onerror="this.style.display='none'">`:''}<span class="badge">${safe(r.id)}</span></div>
    <div class="card-body"><div class="meta"><span>${safe(r.categoria)}</span><span>•</span><span>${statusLabel(r.status)}</span></div><h3>${safe(r.titulo)}</h3><p>${safe((r.contexto||'').slice(0,155))}${(r.contexto||'').length>155?'...':''}</p></div>
  </a>`;
}
function nav(){
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
  </header>`;
}
function footer(){
  return `<footer class="footer"><div class="container footer-inner"><span>Acervo culinário da família</span><span>Receitas preservadas, organizadas e identificadas por ID.</span></div></footer>`;
}
document.addEventListener("DOMContentLoaded",()=>{
  const h=$("#site-nav");
  if(h){
    h.innerHTML=nav();
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
});
