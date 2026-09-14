# Minha Revenda Ford

Aplicação SPA de estudo que simula uma loja virtual de uma concessionária Ford. A aplicação atende a todos os requisitos funcionais e técnicos da atividade avaliativa (RF01–RF15) e implementa um catálogo completo com busca, filtros e detalhes de produto como diferencial do projeto.

## Rotas da Aplicação (RF14 / Checklist)

A aplicação foi estruturada com as 4 rotas obrigatórias exigidas pela especificação (RF14 e Checklist de Entrega), além de rotas complementares de diferencial:

### Rotas Obrigatórias (RF14)
- **`/`**: Resumo do carrinho com a lista de produtos iniciais (RF01/RF02), quantidades, preços unitários, subtotais e valor total formatado em reais (RF03). Inclui controle dinâmico de quantidades e remoção de itens.
- **`/pagamento`**: Formulário de checkout com validação via React Hook Form e Zod (titular, número do cartão com 16 dígitos, validade MM/AA e CVV de 3 dígitos), exibindo feedback de erros e simulação de processamento assíncrono.
- **`/sucesso`**: Tela de confirmação e aprovação do pedido, com limpeza do carrinho após finalização.
- **`/falha`**: Tela de erro exibindo exatamente a mensagem `"tentativa de golpe"` quando o número do cartão possui todos os dígitos iguais.

### Rotas Adicionais (Diferencial / Bônus)
- **`/carrinho`**: Rota alternativa mapeada para a visualização do resumo do carrinho.
- **`/catalogo`**: Catálogo paginado com busca em tempo real e filtros por categoria para adicionar novos veículos ao carrinho.
- **`/produto/:id`**: Tela de detalhes individuais de cada veículo com ficha técnica e botão para adicionar ao carrinho.

## Tecnologias

- React 19 com JavaScript/JSX
- Vite
- React Router
- React Hook Form e Zod
- CSS responsivo

## Estrutura do projeto

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
git clone https://github.com/diegotamiozzo/minha-revenda-ford.git
```

## Executar localmente

Requisitos: Node.js e npm.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Fluxo da aplicação

1. Ao abrir a raiz (`/`), o usuário visualiza o resumo do carrinho com itens carregados, subtotais calculados e o valor total formatado.
2. É possível alterar quantidades, remover itens ou navegar até `/catalogo` para explorar o inventário completo e adicionar mais produtos ao carrinho.
3. O botão **Finalizar compra** direciona o usuário para a rota `/pagamento`.
4. O formulário valida em tempo real titular, número do cartão (16 dígitos), validade (`MM/AA`) e CVV (3 dígitos).
5. Durante o envio, é exibido feedback de "Processando compra..." com o botão desabilitado para evitar duplo clique.
6. Se todos os dígitos do cartão forem idênticos (ex.: `1111 1111 1111 1111`), a aplicação redireciona para `/falha` e apresenta a mensagem `"tentativa de golpe"`.
7. Qualquer outro cartão em formato válido redireciona para `/sucesso`, apresentando a confirmação de aprovação e limpando o carrinho.

> **Aviso**: Utilize exclusivamente dados fictícios. Nenhuma informação real de cartão de crédito é solicitada ou persistida.

## Acessibilidade e responsividade

A interface foi desenvolvida seguindo princípios de HTML semântico (`<header>`, `<main>`, `<section>`, `<nav>`, `<form>`), rótulos associados explicitamente aos campos via `htmlFor`/`id`, mensagens de validação conectadas com `aria-describedby` e `role="alert"`, regiões de resultado configuradas com `aria-live`, foco visível otimizado para navegação por teclado e layout totalmente responsivo testado para dispositivos móveis e desktops.


