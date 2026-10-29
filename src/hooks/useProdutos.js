/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from 'react'
import { buscarProdutos } from '../services/api.js'

export const useProdutos = () => {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  const carregarProdutos = useCallback(async () => {
    try {
      setCarregando(true)
      setErro('')
      const dados = await buscarProdutos()
      setProdutos(dados)
    } catch (error) {
      setErro(error.message || 'Não foi possível carregar os veículos.')
      setProdutos([])
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    carregarProdutos()
  }, [carregarProdutos])

  return { produtos, carregando, erro, recarregar: carregarProdutos }
}
