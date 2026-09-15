import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatarMoeda } from '../utils/moeda.js'
import { obterImagemProduto } from '../utils/imagens.js'

export const CardProduto = ({ produto, onAdicionar }) => {
  const [adicionado, setAdicionado] = useState(false)

  useEffect(() => {
    if (!adicionado) {
      return undefined
    }

    const timeout = window.setTimeout(() => setAdicionado(false), 1800)
    return () => window.clearTimeout(timeout)
  }, [adicionado])

  const handleAdicionar = () => {
    onAdicionar(produto)
    setAdicionado(true)
  }

  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/produto/${produto.id}`}>
        <img src={obterImagemProduto(produto)} alt={produto.nome} />
      </Link>
      <div className="product-card-content">
        <p className="item-category">{produto.categoria}</p>
        <h2>{produto.nome}</h2>
        <p className="product-description">{produto.descricao}</p>
        <strong className="product-price">{formatarMoeda(produto.precoUnitario)}</strong>
        <div className="product-actions">
          <Link className="button button-secondary" to={`/produto/${produto.id}`}>
            Ver detalhes
          </Link>
          <button className="button button-primary" type="button" onClick={handleAdicionar}>
            {adicionado ? 'Adicionado ✓' : 'Adicionar'}
          </button>
        </div>
        <span className="add-feedback" role="status" aria-live="polite">
          {adicionado ? 'Veículo adicionado ao carrinho.' : ''}
        </span>
      </div>
    </article>
  )
}
