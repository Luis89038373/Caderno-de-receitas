# Caderno de Receitas da Família — V10

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


## V7 — revisão de receitas e imagens
- 113 receitas ativas em sequência contínua: **REC-0001 a REC-0113**.
- 14 receitas da V6 foram retiradas conforme revisão da família.
- Fotos selecionadas foram substituídas por referências visuais aprovadas durante a revisão.
- A foto da antiga REC-0020 foi transferida para a antiga REC-0094 antes da exclusão e da renumeração.
- Os títulos de Pudim de Leite Condensado e Pudim de Maria Mole foram corrigidos.
- O mapa completo de IDs V6 → V7 está em `documentacao/MAPA_IDS_V6_PARA_V7.csv`.


## V8 — revisão de receitas e imagens
- 108 receitas ativas em sequência contínua: **REC-0001 a REC-0108**.
- 5 receitas da V7/V7.1 foram retiradas conforme revisão da família.
- As fotos de Cocadinha e Biscoito Amanteigado foram substituídas pelas referências fornecidas.
- A correção de cache da V7.1 foi mantida e atualizada para a versão V8.
- O mapa completo de IDs V7/V7.1 → V8 está em `documentacao/MAPA_IDS_V7_PARA_V8.csv`.


## V9 — revisão de receitas e imagens
- 101 receitas ativas em sequência contínua: **REC-0001 a REC-0101**.
- 7 receitas da V8 foram retiradas conforme revisão da família.
- As fotos de Biliscão, Ganache de Chocolate, Creme de Limão, Glacê com Emulsificante e Rosca Doce foram substituídas pelas referências fornecidas.
- `Glacê de Emulsificante` foi renomeado para **Glacê com Emulsificante**.
- A correção de cache foi mantida e atualizada para a versão V9.
- O mapa completo de IDs V8 → V9 está em `documentacao/MAPA_IDS_V8_PARA_V9.csv`.


## V10 — revisão, tratamento de imagens e renumeração
- 96 receitas ativas em sequência contínua: **REC-0001 a REC-0096**.
- 5 receitas da V9 foram retiradas conforme revisão da família.
- Fotos de Biliscão, Creme de Limão, Leite Condensado Caseiro, Brigadeiro, Pão de Ló e Torta Salgada foram atualizadas/tratadas antes da publicação.
- A antiga REC-0068 teve o texto **Variante** removido do título, ficando **Bolo de Cenoura**.
- A correção de cache foi mantida e atualizada para a versão V10.
- O mapa completo de IDs V9 → V10 está em `documentacao/MAPA_IDS_V9_PARA_V10.csv`.
