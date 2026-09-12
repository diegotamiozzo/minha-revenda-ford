import { useCallback, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import logoMarca from './assets/img/logo-ford.png'
import produtosData from './data/produtos.json'
import { Carrinho } from './pages/Carrinho.jsx'
import { Catalogo } from './pages/Catalogo.jsx'
import { Falha } from './pages/Falha.jsx'
import { Pagamento } from './pages/Pagamento.jsx'
import { ProdutoDetalhe } from './pages/ProdutoDetalhe.jsx'
import { NaoEncontrada } from './pages/NaoEncontrada.jsx'
import { Sucesso } from './pages/Sucesso.jsx'
import './App.css'

function App() {
  const [carrinho, setCarrinho] = useState([])

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
          <Link to="/" aria-label="Ir para a loja">
            <img src={logoMarca} alt="Ford" className="logo" />
          </Link>
          <span className="brand-name">Minha Revenda Ford</span>
          <nav className="site-nav" aria-label="Navegação principal">
            <Link to="/">Veículos</Link>
            <Link to="/carrinho" className="cart-link">
              Carrinho <span className="cart-badge">{totalItens}</span>
            </Link>
          </nav>
        </header>

        <main className="page-container">
          <Routes>
            <Route
              path="/"
              element={<Catalogo produtos={produtosData.produtos} onAdicionar={adicionarAoCarrinho} />}
            />
            <Route
              path="/produto/:id"
              element={
                <ProdutoDetalhe produtos={produtosData.produtos} onAdicionar={adicionarAoCarrinho} />
              }
            />
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
