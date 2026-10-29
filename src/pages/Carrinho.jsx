import { Link } from 'react-router-dom'
import { ItemCarrinho } from '../components/ItemCarrinho.jsx'
import { ResumoCompra } from '../components/ResumoCompra.jsx'
import { useCarrinho } from '../contexts/CarrinhoContext.jsx'

export const Carrinho = () => {
  const { itens, alterarQuantidade, removerItem, valorTotal } = useCarrinho()

  if (itens.length === 0) {
    return (
      <section className="empty-state empty-cart">
        <p className="eyebrow">Seu carrinho está vazio</p>
        <h1>Encontre seu próximo Ford</h1>
        <p>Escolha um veículo no catálogo para começar sua compra.</p>
        <Link className="button button-primary" to="/produtos">
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
          {itens.map((produto) => (
            <ItemCarrinho
              key={produto.id}
              produto={produto}
              onAtualizarQuantidade={alterarQuantidade}
              onRemover={removerItem}
            />
          ))}
        </div>

        <div className="summary-column">
          <ResumoCompra total={valorTotal} />
          <Link className="button button-primary" to="/pagamento">
            Finalizar compra
          </Link>
          <Link className="back-link" to="/produtos">
            Continuar comprando
          </Link>
        </div>
      </div>
    </section>
  )
}
