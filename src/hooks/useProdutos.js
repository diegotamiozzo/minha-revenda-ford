import { useEffect, useState } from 'react'
import produtosData from '../data/produtos.json'

/**
 * Formata os produtos iniciais para o carrinho fixo (RF01/RF02).
 */
export const formatarProdutosIniciais = (lista) =>
  (Array.isArray(lista) ? lista : []).slice(0, 3).map((produto) => ({
    ...produto,
    quantidade: 1,
  }))

export const produtosIniciais = formatarProdutosIniciais(produtosData?.produtos ?? [])

/**
 * Custom hook para carregar e gerenciar os produtos da aplicação.
 * Encapsula o acesso aos dados (array local ou API futura), fornecendo
 * estados explícitos de carregamento (carregando) e erro (erro).
 */
export const useProdutos = () => {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    let ativo = true

    const carregarProdutos = async () => {
      try {
        setCarregando(true)
        setErro(null)

        // Simulação de carregamento assíncrono para suporte futuro a endpoints REST/API
        const lista = await new Promise((resolve) => {
          resolve(produtosData?.produtos ?? [])
        })

        if (!Array.isArray(lista) || lista.length === 0) {
          throw new Error('Nenhum veículo disponível no momento.')
        }

        if (ativo) {
          setProdutos(lista)
        }
      } catch (err) {
        if (ativo) {
          setErro(err instanceof Error ? err.message : 'Erro ao carregar catálogo de veículos.')
        }
      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    carregarProdutos()

    return () => {
      ativo = false
    }
  }, [])

  return { produtos, carregando, erro }
}

