# Minha Revenda Ford

Aplicação SPA para simular uma loja virtual de veículos da Ford. O fluxo principal inclui catálogo, busca, detalhes do produto, carrinho, checkout com validação e telas de sucesso/falha.

## Funcionalidades principais

- Catálogo de veículos com busca e filtro por categoria
- Página de detalhe do veículo com dados e botão de compra
- Carrinho compartilhado via Context API e persistência em localStorage
- Rota privada para o pagamento somente quando há itens no carrinho
- Simulação de processamento de cartão com regras de fraude
- Layout com cabeçalho, navegação e rodapé
- Testes automatizados para regras de negócio

## Stack

- React 19
- Vite
- React Router DOM
- React Hook Form + Zod
- JSON Server para simular a API de produtos
- Vitest para testes unitários

## Requisitos

- Node.js 18+
- npm

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie a API simulada em paralelo:

```bash
npm run api
```

3. Inicie a aplicação:

```bash
npm run dev
```

4. Acesse a aplicação em `http://localhost:5173`.

## Scripts

```bash
npm run dev
npm run api
npm run build
npm run lint
npm test
```

## Fluxo de uso

1. A rota `/produtos` lista os veículos disponíveis.
2. O usuário pode buscar por nome e filtrar por categoria.
3. A rota `/produto/:id` exibe os detalhes do produto.
4. Ao adicionar ao carrinho, o contador no cabeçalho é atualizado.
5. O carrinho pode ser revisado em `/carrinho`.
6. O checkout em `/pagamento` valida nome, cartão, validade e CVV.
7. Cartões com todos os dígitos iguais redirecionam para `/falha`.
8. Qualquer cartão válido envia para `/sucesso`.

## Estrutura de pastas

```bash
src/
  components/
  contexts/
  hooks/
  pages/
  routes/
  services/
  tests/
  utils/
  App.jsx
  main.jsx
```

## Observações

- Os dados do catálogo ficam em `db.json` e são consumidos por `json-server` em `http://localhost:3001`.
- O carrinho é persistido no navegador com `localStorage` para manter a experiência mais consistente.
- Os dados de cartão são fictícios e usados apenas para simular a compra.


