const moedaBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const formatarMoeda = (valor) => moedaBRL.format(valor)
