import produtosData from '../data/produtos.json'

export const useProdutos = () => {
  return { produtos: produtosData.produtos, carregando: false }
}
