/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CarrinhoContext = createContext(null)
const CHAVE_CARRINHO = 'minha-revenda-ford-carrinho'

const normalizarItem = (produto) => ({
  ...produto,
  id: String(produto.id),
  quantidade: Number(produto.quantidade ?? 1),
  preco: Number(produto.preco ?? produto.precoUnitario ?? 0),
  precoUnitario: Number(produto.precoUnitario ?? produto.preco ?? 0),
  estoque: Number(produto.estoque ?? 0),
})

export const CarrinhoProvider = ({ children }) => {
  const [itens, setItens] = useState(() => {
    if (typeof window === 'undefined') {
      return []
    }

    const valorGuardado = window.localStorage.getItem(CHAVE_CARRINHO)

    if (!valorGuardado) {
      return []
    }

    try {
      return JSON.parse(valorGuardado).map(normalizarItem)
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens))
    }
  }, [itens])

  const adicionarItem = useCallback((produto) => {
    setItens((itensAtuais) => {
      const produtoNormalizado = normalizarItem(produto)
      const itemExistente = itensAtuais.find((item) => String(item.id) === String(produtoNormalizado.id))

      if (itemExistente) {
        const estoqueMaximo = Number(itemExistente.estoque || produtoNormalizado.estoque || Number.MAX_SAFE_INTEGER)
        const proximaQuantidade = Math.min(itemExistente.quantidade + 1, estoqueMaximo)

        return itensAtuais.map((item) =>
          String(item.id) === String(produtoNormalizado.id)
            ? { ...item, ...produtoNormalizado, quantidade: proximaQuantidade }
            : item,
        )
      }

      return [...itensAtuais, { ...produtoNormalizado, quantidade: 1 }]
    })
  }, [])

  const alterarQuantidade = useCallback((id, novaQuantidade) => {
    setItens((itensAtuais) => {
      const quantidadeSolicitada = Number(novaQuantidade)

      if (!Number.isFinite(quantidadeSolicitada) || quantidadeSolicitada <= 0) {
        return itensAtuais.filter((item) => String(item.id) !== String(id))
      }

      return itensAtuais
        .map((item) => {
          if (String(item.id) !== String(id)) {
            return item
          }

          const estoqueMaximo = Number(item.estoque || Number.MAX_SAFE_INTEGER)
          return { ...item, quantidade: Math.min(quantidadeSolicitada, estoqueMaximo) }
        })
        .filter((item) => item.quantidade > 0)
    })
  }, [])

  const removerItem = useCallback((id) => {
    setItens((itensAtuais) => itensAtuais.filter((item) => String(item.id) !== String(id)))
  }, [])

  const limparCarrinho = useCallback(() => {
    setItens([])
  }, [])

  const quantidadeTotal = useMemo(
    () => itens.reduce((total, item) => total + Number(item.quantidade || 0), 0),
    [itens],
  )

  const valorTotal = useMemo(
    () =>
      itens.reduce(
        (total, item) => total + Number(item.precoUnitario ?? item.preco ?? 0) * Number(item.quantidade || 0),
        0,
      ),
    [itens],
  )

  const valor = useMemo(
    () => ({
      itens,
      adicionarItem,
      alterarQuantidade,
      removerItem,
      limparCarrinho,
      quantidadeTotal,
      valorTotal,
    }),
    [adicionarItem, alterarQuantidade, itens, limparCarrinho, quantidadeTotal, removerItem, valorTotal],
  )

  return <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>
}

export const useCarrinho = () => {
  const contexto = useContext(CarrinhoContext)

  if (!contexto) {
    throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider')
  }

  return contexto
}
