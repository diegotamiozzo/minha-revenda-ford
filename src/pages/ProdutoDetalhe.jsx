import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCarrinho } from '../contexts/CarrinhoContext.jsx'
import { buscarProdutoPorId } from '../services/api.js'
import { formatarMoeda } from '../utils/moeda.js'
import { obterImagemProduto } from '../utils/imagens.js'

export const ProdutoDetalhe = () => {
  const { id } = useParams()
  const { adicionarItem } = useCarrinho()
  const [produto, setProduto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [adicionado, setAdicionado] = useState(false)

  useEffect(() => {
    let ativo = true

    const carregarProduto = async () => {
      try {
        setCarregando(true)
        setErro('')
        const dados = await buscarProdutoPorId(id)

        if (ativo) {
          setProduto(dados)
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message || 'Produto não encontrado.')
          setProduto(null)
        }
      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    carregarProduto()

    return () => {
      ativo = false
    }
  }, [id])

  useEffect(() => {
    if (!adicionado) {
      return undefined
    }

    const timeout = window.setTimeout(() => setAdicionado(false), 1800)
    return () => window.clearTimeout(timeout)
  }, [adicionado])

  if (carregando) {
    return (
      <section className="empty-state" aria-live="polite">
        <p className="eyebrow">Aguarde</p>
        <h1>Carregando detalhes do veículo…</h1>
      </section>
    )
  }

  if (erro || !produto) {
    return (
      <section className="empty-state" aria-live="assertive">
        <p className="eyebrow">Produto não encontrado</p>
        <h1>Não foi possível localizar este veículo.</h1>
        <p>{erro || 'Verifique o link ou retorne ao catálogo.'}</p>
        <Link className="button button-primary" to="/produtos">
          Voltar ao catálogo
        </Link>
      </section>
    )
  }

  return (
    <section className="product-detail">
      <Link className="back-link back-link-start" to="/produtos">
        ← Voltar para o catálogo
      </Link>
      <div className="product-detail-layout">
        <img src={obterImagemProduto(produto)} alt={produto.nome} />
        <div className="product-detail-content">
          <p className="eyebrow">{produto.categoria}</p>
          <h1>{produto.nome}</h1>
          <p className="detail-description">{produto.descricao}</p>
          <strong className="detail-price">{formatarMoeda(produto.precoUnitario ?? produto.preco)}</strong>
          <p className="detail-note">Estoque disponível: {produto.estoque ?? 0} unidades.</p>
          <button
            className="button button-primary"
            type="button"
            onClick={() => {
              adicionarItem(produto)
              setAdicionado(true)
            }}
          >
            {adicionado ? 'Adicionado ✓' : 'Adicionar ao carrinho'}
          </button>
          <span className="add-feedback detail-add-feedback" role="status" aria-live="polite">
            {adicionado ? 'Veículo adicionado ao carrinho.' : ''}
          </span>
        </div>
      </div>
    </section>
  )
}
