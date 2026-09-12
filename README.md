# Minha Revenda Ford

Aplicação SPA de estudo que simula uma loja virtual de uma concessionária Ford. O catálogo permite pesquisar e filtrar veículos, visualizar detalhes, adicionar produtos ao carrinho e finalizar um pagamento simulado no navegador, sem backend ou integração real.

O catálogo é um diferencial em relação ao fluxo mínimo solicitado na atividade. A aplicação mantém as telas `/`, `/produto/:id` e `/carrinho` para permitir explorar veículos e montar o pedido antes das telas obrigatórias de pagamento e resultado.

## Tecnologias

- React 19 com JavaScript/JSX
- Vite
- React Router
- React Hook Form e Zod
- CSS responsivo

## Estrutura projeto

```bash
├── 📁 public
│   └── 📄 favicon.ico
├── 📁 src
│   ├── 📁 assets
│   │   └── 📁 img
│   │       ├── 🖼️ 01-nova-geracao-ranger.jpg
│   │       ├── 🖼️ 02-ranger-raptor.jpg
│   │       ├── 🖼️ 03-maverick-black.jpg
│   │       ├── 🖼️ 04-f-150.jpg
│   │       ├── 🖼️ 05-f-150-tremor.jpg
│   │       ├── 🖼️ 06-maverick-tremor.jpg
│   │       ├── 🖼️ 07-territory.jpg
│   │       ├── 🖼️ 08-bronco-sport.jpg
│   │       ├── 🖼️ 09-mustang-mach-e.jpg
│   │       ├── 🖼️ 10-mustang-dark-horse.jpg
│   │       ├── 🖼️ 11-maverick-hybrid.jpg
│   │       ├── 🖼️ 12-ranger-xl-2-0-ch-diesel-4x4-mt.jpg
│   │       ├── 🖼️ 13-ranger-xl-2-0-ch-diesel-4x4-at.jpg
│   │       ├── 🖼️ 14-ranger-xl-2-0-cs-diesel-4x4-mt.jpg
│   │       ├── 🖼️ 15-ranger-xl-2-0-cs-diesel-4x4-at.jpg
│   │       ├── 🖼️ 16-ranger-xl-2-0-cd-diesel-4x4-mt.jpg
│   │       ├── 🖼️ 17-ranger-xl-2-0-cd-diesel-4x4-at.jpg
│   │       ├── 🖼️ 18-ranger-xls-2-0-4x4.jpg
│   │       └── 🖼️ logo-ford.png
│   ├── 📁 components
│   │   ├── 📄 CardProduto.jsx
│   │   ├── 📄 ItemCarrinho.jsx
│   │   └── 📄 ResumoCompra.jsx
│   ├── 📁 data
│   │   └── ⚙️ produtos.json
│   ├── 📁 hooks
│   │   └── 📄 usePagamento.js
│   ├── 📁 pages
│   │   ├── 📄 Carrinho.jsx
│   │   ├── 📄 Catalogo.jsx
│   │   ├── 📄 Falha.jsx
│   │   ├── 📄 NaoEncontrada.jsx
│   │   ├── 📄 Pagamento.jsx
│   │   ├── 📄 ProdutoDetalhe.jsx
│   │   └── 📄 Sucesso.jsx
│   ├── 📁 utils
│   │   ├── 📄 imagens.js
│   │   ├── 📄 moeda.js
│   │   └── 📄 pagamento.js
│   ├── 🎨 App.css
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 vite.config.js
```
## Clonar repositório

```bash
https://github.com/diegotamiozzo/minha-revenda-ford.git
```
## Executar localmente

Requisitos: Node.js e npm.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.


## Fluxo da aplicação

1. A rota `/` exibe o catálogo paginado de veículos, com busca e filtro por categoria.
2. Cada card permite abrir `/produto/:id` para visualizar detalhes ou adicionar o veículo diretamente ao carrinho.
3. A rota `/carrinho` permite alterar quantidades, remover itens e conferir subtotais e total.
4. O botão **Finalizar compra** leva para `/pagamento`.
5. O formulário valida titular, cartão com 16 dígitos, validade `MM/AA` e CVV.
6. A compra mostra um estado assíncrono de processamento e segue para `/sucesso` quando aprovada.
7. Um cartão com os 16 dígitos iguais segue para `/falha` e exibe `tentativa de golpe`.

Use apenas dados fictícios de cartão. Nenhuma informação de pagamento é persistida.

## Acessibilidade e responsividade

A interface usa HTML semântico, rótulos associados aos campos, mensagens de erro relacionadas aos respectivos inputs, regiões de resultado com `aria-live`, foco visível para navegação por teclado e controles de quantidade com áreas de toque ampliadas. O layout adapta catálogo, carrinho, pagamento e detalhes para telas menores.


