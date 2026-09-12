const imagens = import.meta.glob('../assets/img/*', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const obterImagemProduto = (produto) => {
  const nomeArquivo = produto.imagem.split('/').pop()
  return imagens[`../assets/img/${nomeArquivo}`] ?? ''
}
