import { Link } from 'react-router-dom'
import { ItemCarrinho } from '../components/ItemCarrinho.jsx'
import { ResumoCompra } from '../components/ResumoCompra.jsx'

export const Carrinho = ({ produtos, onAtualizarQuantidade, onRemover }) => {
  const total = produtos.reduce(
    (soma, produto) => soma + produto.precoUnitario * produto.quantidade,
    0,
  )

  if (produtos.length === 0) {
    return (
      <section className="empty-state empty-cart">
        <p className="eyebrow">Seu carrinho está vazio</p>
        <h1>Encontre seu próximo Ford</h1>
        <p>Escolha um veículo no catálogo para começar sua compra.</p>
        <Link className="button button-primary" to="/catalogo">
          Explorar veículos
        </Link>
      </section>
    )
  }

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Revise seu pedido</p>
        <h1>Seu carrinho</h1>
        <p>Altere as quantidades ou remova itens antes de seguir para o pagamento.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {produtos.map((produto) => (
            <ItemCarrinho
              key={produto.id}
              produto={produto}
              onAtualizarQuantidade={onAtualizarQuantidade}
              onRemover={onRemover}
            />
          ))}
        </div>

        <div className="summary-column">
          <ResumoCompra total={total} />
          <Link className="button button-primary" to="/pagamento">
            Finalizar compra
          </Link>
          <Link className="back-link" to="/catalogo">
            Continuar comprando
          </Link>
        </div>
      </div>
    </section>
  )
}
