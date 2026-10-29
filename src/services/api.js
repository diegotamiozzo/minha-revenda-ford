const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

const normalizarProduto = (produto = {}) => ({
  ...produto,
  id: String(produto.id),
  preco: Number(produto.preco ?? produto.precoUnitario ?? 0),
  precoUnitario: Number(produto.precoUnitario ?? produto.preco ?? 0),
  estoque: Number(produto.estoque ?? 0),
})

export const buscarProdutos = async () => {
  const url = import.meta.env.DEV ? `${API_BASE_URL}/produtos` : '/db.json'
  const resposta = await fetch(url)

  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os produtos.')
  }

  const dados = await resposta.json()
  const lista = Array.isArray(dados) ? dados : dados.produtos ?? []

  return lista.map(normalizarProduto)
}

export const buscarProdutoPorId = async (id) => {
  if (import.meta.env.DEV) {
    const resposta = await fetch(`${API_BASE_URL}/produtos/${id}`)
    if (!resposta.ok) throw new Error('Produto não encontrado.')
    return normalizarProduto(await resposta.json())
  }

  const produtos = await buscarProdutos()
  const produto = produtos.find((p) => p.id === String(id))
  if (!produto) throw new Error('Produto não encontrado.')
  return produto
}