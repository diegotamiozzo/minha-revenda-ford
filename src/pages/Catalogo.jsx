import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CardProduto } from '../components/CardProduto.jsx'
import { useCarrinho } from '../contexts/CarrinhoContext.jsx'
import { useProdutos } from '../hooks/useProdutos.js'
import { filtrarProdutos } from '../utils/busca.js'

const ITENS_POR_PAGINA = 6

export const Catalogo = () => {
  const { produtos, carregando, erro } = useProdutos()
  const { adicionarItem } = useCarrinho()
  const [pagina, setPagina] = useState(1)
  const [categoria, setCategoria] = useState('Todos')
  const [busca, setBusca] = useState('')

  const categorias = useMemo(
    () => ['Todos', ...new Set(produtos.map((produto) => produto.categoria).filter(Boolean))],
    [produtos],
  )

  const produtosFiltrados = useMemo(
    () => filtrarProdutos(produtos, busca, categoria),
    [busca, categoria, produtos],
  )

  const totalPaginas = Math.max(1, Math.ceil(produtosFiltrados.length / ITENS_POR_PAGINA))
  const inicio = (pagina - 1) * ITENS_POR_PAGINA
  const produtosDaPagina = produtosFiltrados.slice(inicio, inicio + ITENS_POR_PAGINA)

  const alterarCategoria = (valor) => {
    setCategoria(valor)
    setPagina(1)
  }

  const alterarBusca = (valor) => {
    setBusca(valor)
    setPagina(1)
  }

  if (carregando) {
    return (
      <section className="empty-state" aria-live="polite">
        <p className="eyebrow">Aguarde</p>
        <h1>Carregando catálogo…</h1>
        <p>Buscando os veículos disponíveis para você.</p>
      </section>
    )
  }

  if (erro) {
    return (
      <section className="empty-state" aria-live="assertive">
        <p className="eyebrow">Erro ao carregar</p>
        <h1>Não foi possível carregar o catálogo</h1>
        <p>{erro}</p>
      </section>
    )
  }

  return (
    <section>
      <div className="hero">
        <div>
          <p className="eyebrow">Sua próxima aventura começa aqui</p>
          <h1>Escolha o Ford ideal para você</h1>
          <p>
            Explore nossa seleção de veículos, compare detalhes e monte seu pedido com poucos
            cliques.
          </p>
        </div>
        <Link className="button button-primary" to="/carrinho">
          Ver carrinho
        </Link>
      </div>

      <div className="catalog-toolbar">
        <label className="search-field">
          <span>Buscar veículo</span>
          <input
            type="search"
            value={busca}
            onChange={(evento) => alterarBusca(evento.target.value)}
            placeholder="Ex.: Ranger, Mustang..."
          />
        </label>

        <label className="category-field">
          <span>Categoria</span>
          <select value={categoria} onChange={(evento) => alterarCategoria(evento.target.value)}>
            {categorias.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        </label>
      </div>

      {produtosDaPagina.length > 0 ? (
        <div className="product-grid">
          {produtosDaPagina.map((produto) => (
            <CardProduto key={produto.id} produto={produto} onAdicionar={adicionarItem} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nenhum veículo encontrado</h2>
          <p>Tente buscar por outro nome ou selecione outra categoria.</p>
          {busca && (
            <button className="button button-secondary" type="button" onClick={() => setBusca('')}>
              Limpar busca
            </button>
          )}
        </div>
      )}

      {produtosFiltrados.length > 0 && (
        <nav className="pagination" aria-label="Paginação do catálogo">
          <button
            className="pagination-button"
            type="button"
            disabled={pagina === 1}
            aria-label="Ir para a página anterior"
            onClick={() => setPagina((atual) => atual - 1)}
          >
            Anterior
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="pagination-button"
            type="button"
            disabled={pagina === totalPaginas}
            aria-label="Ir para a próxima página"
            onClick={() => setPagina((atual) => atual + 1)}
          >
            Próxima
          </button>
        </nav>
      )}
    </section>
  )
}
