import { useCallback, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import logoMarca from './assets/img/logo-ford.png'
import { produtosIniciais, useProdutos } from './hooks/useProdutos.js'
import { Carrinho } from './pages/Carrinho.jsx'
import { Catalogo } from './pages/Catalogo.jsx'
import { Falha } from './pages/Falha.jsx'
import { Pagamento } from './pages/Pagamento.jsx'
import { ProdutoDetalhe } from './pages/ProdutoDetalhe.jsx'
import { NaoEncontrada } from './pages/NaoEncontrada.jsx'
import { Sucesso } from './pages/Sucesso.jsx'
import './App.css'

function App() {
  const { produtos, carregando, erro } = useProdutos()
  const [carrinho, setCarrinho] = useState(produtosIniciais)

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.id === produto.id)

      if (itemExistente) {
        return itensAtuais.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item,
        )
      }

      return [...itensAtuais, { ...produto, quantidade: 1 }]
    })
  }

  const atualizarQuantidade = (id, quantidade) => {
    setCarrinho((itensAtuais) =>
      itensAtuais
        .map((item) => (item.id === id ? { ...item, quantidade } : item))
        .filter((item) => item.quantidade > 0),
    )
  }

  const removerDoCarrinho = (id) => {
    setCarrinho((itensAtuais) => itensAtuais.filter((item) => item.id !== id))
  }

  const limparCarrinho = useCallback(() => setCarrinho([]), [])
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0)

  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="site-header">
          <Link to="/" aria-label="Ir para o carrinho">
            <img src={logoMarca} alt="Ford" className="logo" />
          </Link>
          <span className="brand-name">Minha Revenda Ford</span>
          <nav className="site-nav" aria-label="Navegação principal">
            <Link to="/catalogo">Catálogo</Link>
            <Link to="/" className="cart-link">
              Carrinho <span className="cart-badge">{totalItens}</span>
            </Link>
          </nav>
        </header>

        <main className="page-container">
          <Routes>
            {/* Rota principal / obrigatória (RF14): Resumo do carrinho */}
            <Route
              path="/"
              element={
                <Carrinho
                  produtos={carrinho}
                  onAtualizarQuantidade={atualizarQuantidade}
                  onRemover={removerDoCarrinho}
                />
              }
            />
            {/* Rota alternativa para o carrinho */}
            <Route
              path="/carrinho"
              element={
                <Carrinho
                  produtos={carrinho}
                  onAtualizarQuantidade={atualizarQuantidade}
                  onRemover={removerDoCarrinho}
                />
              }
            />
            {/* Rotas adicionais / diferencial do projeto */}
            <Route
              path="/catalogo"
              element={
                <Catalogo
                  produtos={produtos}
                  carregando={carregando}
                  erro={erro}
                  onAdicionar={adicionarAoCarrinho}
                />
              }
            />
            <Route
              path="/produto/:id"
              element={
                <ProdutoDetalhe
                  produtos={produtos}
                  carregando={carregando}
                  onAdicionar={adicionarAoCarrinho}
                />
              }
            />
            {/* Rotas obrigatórias do fluxo de compra (RF14) */}
            <Route
              path="/pagamento"
              element={<Pagamento produtos={carrinho} />}
            />
            <Route path="/sucesso" element={<Sucesso onCompraFinalizada={limparCarrinho} />} />
            <Route path="/falha" element={<Falha />} />
            <Route path="*" element={<NaoEncontrada />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
