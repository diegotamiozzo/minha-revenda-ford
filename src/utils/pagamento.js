export const normalizarNumeroCartao = (numeroCartao) =>
  String(numeroCartao).replace(/[\s-]/g, '')

export const verificarCartaoGolpe = (numeroCartao) => {
  const limpo = normalizarNumeroCartao(numeroCartao)
  return limpo.length === 16 && /^(\d)\1{15}$/.test(limpo)
}

export const validarValidadeCartao = (validade) => {
  const correspondencia = /^(\d{2})\/(\d{2})$/.exec(validade)

  if (!correspondencia) {
    return false
  }

  const [, mesTexto, anoTexto] = correspondencia
  const mes = Number(mesTexto)
  const ano = Number(anoTexto)
  const agora = new Date()
  const anoAtual = agora.getFullYear() % 100
  const mesAtual = agora.getMonth() + 1

  return mes >= 1 && mes <= 12 && (ano > anoAtual || (ano === anoAtual && mes >= mesAtual))
}
