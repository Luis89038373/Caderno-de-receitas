# ALTERAÇÕES V12.1

Correção específica da interface solicitada.

## Cabeçalho
- O contêiner `#site-nav` passa a ser o elemento sticky.
- Menu e filtros permanecem juntos na parte fixa.
- O cabeçalho foi ampliado para acomodar duas linhas.

## Filtros
- Busca por nome/ID.
- Categoria.
- Status.
- Botão `Limpar filtros`.
- A inicialização dos filtros foi movida para `app.js`, depois da criação do cabeçalho.
- Removidos os scripts inline de filtros em `index.html` e `catalogo.html`, eliminando a condição de corrida que deixava a barra oculta.

## Dados
- Nenhuma receita foi alterada.
- Mantidas 91 receitas, REC-0001 a REC-0091.
- Nenhuma imagem foi gerada.
