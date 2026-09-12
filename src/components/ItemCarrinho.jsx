import { Link } from 'react-router-dom'
import { formatarMoeda } from '../utils/moeda.js'
import { obterImagemProduto } from '../utils/imagens.js'

export const ItemCarrinho = ({ produto, onAtualizarQuantidade, onRemover }) => {
  const subtotal = produto.precoUnitario * produto.quantidade

  return (
    <article className="cart-item">
      <Link to={`/produto/${produto.id}`} className="cart-item-image-link">
        <img src={obterImagemProduto(produto)} alt={produto.nome} />
      </Link>
      <div className="cart-item-content">
        <div>
          <p className="item-category">{produto.categoria}</p>
          <h3>
            <Link to={`/produto/${produto.id}`}>{produto.nome}</Link>
          </h3>
          <p className="item-description">{produto.descricao}</p>
        </div>
        <div className="cart-item-footer">
          <div className="quantity-control" role="group" aria-label={`Quantidade de ${produto.nome}`}>
            <button
              type="button"
              aria-label={`Diminuir quantidade de ${produto.nome}`}
              onClick={() => onAtualizarQuantidade(produto.id, produto.quantidade - 1)}
            >
              -
            </button>
            <span>{produto.quantidade}</span>
            <button
              type="button"
              aria-label={`Aumentar quantidade de ${produto.nome}`}
              onClick={() => onAtualizarQuantidade(produto.id, produto.quantidade + 1)}
            >
              +
            </button>
          </div>
          <div className="cart-item-prices">
            <span>{formatarMoeda(produto.precoUnitario)} cada</span>
            <strong>{formatarMoeda(subtotal)}</strong>
          </div>
          <button className="remove-button" type="button" onClick={() => onRemover(produto.id)}>
            Remover
          </button>
        </div>
      </div>
    </article>
  )
}
