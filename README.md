# Caderno de Receitas da Família — V6

# Caderno de Receitas da Família

Site estático, responsivo e pronto para GitHub Pages.

## Objetivo
Preservar as receitas da família em um repositório digital organizado, mantendo a origem manuscrita e apresentando cada receita em um formato atual e agradável.

## Como abrir
Para testar localmente, use um servidor HTTP simples dentro desta pasta:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

No GitHub Pages, publique a branch principal a partir da raiz do repositório.

## Estrutura
- `index.html` — catálogo.
- `receita.html?id=REC-0004` — página dinâmica da receita.
- `acervo.html` — páginas manuscritas ainda em revisão.
- `data/recipes.json` — banco de dados das receitas consolidadas.
- `data/acervo.json` — controle de fotos, multipáginas e duplicatas.
- `images/manuscritos/` — páginas originais preservadas.
- `images/multipagina/` — receitas já confirmadas com mais de uma página.
- `documentacao/PADRAO_OFICIAL.md` — regras oficiais.

## Imagens externas
Quando não existe fotografia própria do prato pronto, o catálogo pode usar uma imagem ilustrativa externa semelhante ao contexto da receita. A URL da fonte e a indicação de que a imagem é ilustrativa ficam registradas em `recipes.json` e exibidas na página.

Antes de publicar comercialmente ou distribuir imagens de terceiros, confirme a licença de uso ou substitua por fotografia própria/licenciada.


## Responsividade
O projeto segue a regra oficial de visualização em **PC, tablet e celular**.

O layout é único e responsivo:
- desktop: aproveita telas amplas com múltiplas colunas;
- tablet: reorganiza cartões e conteúdo em menos colunas;
- celular: usa uma coluna principal, menu móvel, controles em largura total e áreas de toque adequadas;
- não existe versão separada para celular.

Os pontos de adaptação principais estão definidos em `assets/css/styles.css`.


## Catálogo geral V3
A V3 separa dois estágios:

1. **Receita publicada/estruturada** — possui contexto, ingredientes, preparo e imagem no padrão final.
2. **Receita catalogada em transcrição** — duplicidades já foram resolvidas e o ID já foi reservado, mas o conteúdo ainda está sendo conferido antes da publicação.

Nesta etapa foram identificadas **138 receitas**, chegando ao ID **REC-0138**.

Use:
- `catalogo.html` para visualizar todos os IDs;
- `ficha.html?id=REC-XXXX` para uma ficha ainda em transcrição;
- `receita.html?id=REC-XXXX` para receitas já estruturadas.


## V4 — catálogo completo
- 142 receitas em sequência: REC-0001 a REC-0142.
- Duas entradas V3 duplicadas foram eliminadas antes da renumeração final.
- Seis receitas adicionais foram identificadas em páginas que continham mais de uma preparação.
- Todas as fichas possuem contexto de apresentação, ingredientes organizados, fonte original e imagem relacionada.
- Trechos ilegíveis ou modos de preparo ausentes são marcados como revisão; o sistema não inventa dados.
- Layout responsivo para PC, tablet e celular.


## V5 — navegação e busca
- Busca por várias palavras em qualquer ordem; por exemplo, `pudim Maria mole` encontra `Pudim de Maria Mole`.
- A busca ignora acentos e palavras intermediárias do título.
- As imagens/páginas da receita original não são mais exibidas dentro das fichas de receita; permanecem somente no acervo separado.
- Todas as fichas abertas possuem botão **← Voltar**.
- No celular, o bloco “Receitas da família” foi removido; “Receitas que continuam vivas” passou a concentrar o destaque e os filtros.

## V6 — consolidação das correções
- 127 receitas ativas em sequência contínua: **REC-0001 a REC-0127**.
- 15 receitas da V5 foram retiradas conforme revisão da família.
- Títulos e conteúdos selecionados foram corrigidos antes da renumeração.
- A numeração final foi refeita somente depois de todas as exclusões, evitando troca de receitas por deslocamento de ID.
- O mapa completo de IDs antigos para novos está em `documentacao/MAPA_IDS_V5_PARA_V6.csv`.
- As páginas manuscritas e imagens originais continuam preservadas no acervo.
