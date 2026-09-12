export const normalizarNumeroCartao = (numeroCartao) =>
  String(numeroCartao).replace(/[\s-]/g, '')

export const verificarCartaoGolpe = (numeroCartao) => {
  const limpo = normalizarNumeroCartao(numeroCartao)
  return limpo.length === 16 && /^(\d)\1{15}$/.test(limpo)
}
