import { Link, Outlet } from 'react-router-dom'
import logoMarca from '../assets/img/logo-ford.png'
import { useCarrinho } from '../contexts/CarrinhoContext.jsx'

export const Layout = () => {
  const { quantidadeTotal } = useCarrinho()

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/produtos" aria-label="Ir para o catálogo de veículos">
          <img src={logoMarca} alt="Ford" className="logo" />
        </Link>
        <span className="brand-name">Minha Revenda Ford</span>

        <nav className="site-nav" aria-label="Navegação principal">
          <Link to="/produtos">Veículos</Link>
          <Link to="/carrinho" className="cart-link">
            Carrinho <span className="cart-badge">{quantidadeTotal}</span>
          </Link>
        </nav>
      </header>

      <main className="page-container">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Minha Revenda Ford • Loja virtual de demonstração</p>
      </footer>
    </div>
  )
}
