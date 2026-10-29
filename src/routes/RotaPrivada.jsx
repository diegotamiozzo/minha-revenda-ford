import { Navigate } from 'react-router-dom'
import { useCarrinho } from '../contexts/CarrinhoContext.jsx'

export const RotaPrivada = ({ children }) => {
  const { itens } = useCarrinho()

  if (itens.length === 0) {
    return <Navigate to="/carrinho" replace />
  }

  return children
}
