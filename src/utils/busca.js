export const filtrarProdutos = (produtos = [], termo = '', categoria = 'Todos') => {
  const busca = termo.trim().toLowerCase()

  return produtos.filter((produto) => {
    const categoriaCorresponde = categoria === 'Todos' || produto.categoria === categoria
    const nome = String(produto.nome ?? '').toLowerCase()
    const descricao = String(produto.descricao ?? '').toLowerCase()
    const termoCorresponde = !busca || nome.includes(busca) || descricao.includes(busca)

    return categoriaCorresponde && termoCorresponde
  })
}
