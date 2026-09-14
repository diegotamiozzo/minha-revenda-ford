import { Link, Navigate, useParams } from 'react-router-dom'
import { formatarMoeda } from '../utils/moeda.js'
import { obterImagemProduto } from '../utils/imagens.js'

export const ProdutoDetalhe = ({ produtos, onAdicionar }) => {
  const { id } = useParams()
  const produto = produtos.find((item) => item.id === id)

  if (!produto) {
    return <Navigate to="/catalogo" replace />
  }

  return (
    <section className="product-detail">
      <Link className="back-link back-link-start" to="/catalogo">
        ← Voltar para o catálogo
      </Link>
      <div className="product-detail-layout">
        <img src={obterImagemProduto(produto)} alt={produto.nome} />
        <div className="product-detail-content">
          <p className="eyebrow">{produto.categoria}</p>
          <h1>{produto.nome}</h1>
          <p className="detail-description">{produto.descricao}</p>
          <strong className="detail-price">{formatarMoeda(produto.precoUnitario)}</strong>
          <p className="detail-note">Pagamento seguro e simulação sem cobrança real.</p>
          <button className="button button-primary" type="button" onClick={() => onAdicionar(produto)}>
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </section>
  )
}
