import { useState } from 'react'
import { verificarCartaoGolpe } from '../utils/pagamento.js'

export const usePagamento = () => {
  const [processando, setProcessando] = useState(false)

  const processarPagamento = async ({ numeroCartao }) => {
    setProcessando(true)

    const resultado = await new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(!verificarCartaoGolpe(numeroCartao))
      }, 900)
    })

    setProcessando(false)
    return resultado
  }

  return { processando, processarPagamento }
}
