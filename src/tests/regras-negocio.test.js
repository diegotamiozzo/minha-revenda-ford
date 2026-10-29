import { describe, expect, it } from 'vitest'
import { filtrarProdutos } from '../utils/busca.js'
import { formatarMoeda } from '../utils/moeda.js'
import { verificarCartaoGolpe } from '../utils/pagamento.js'

describe('regras de negócio', () => {
  it('formata valores para moeda brasileira', () => {
    expect(formatarMoeda(1234.5)).toContain('1.234,50')
  })

  it('identifica cartões suspeitos com todos os dígitos iguais', () => {
    expect(verificarCartaoGolpe('1111 1111 1111 1111')).toBe(true)
    expect(verificarCartaoGolpe('1234 5678 9012 3456')).toBe(false)
  })

  it('filtra produtos por termo e categoria', () => {
    const produtos = [
      { id: '1', nome: 'Ranger XLT', categoria: 'Picapes', descricao: 'Picape robusta' },
      { id: '2', nome: 'Mustang Mach-E', categoria: 'Eletrificação', descricao: 'Carro elétrico' },
      { id: '3', nome: 'Bronco Sport', categoria: 'SUVs', descricao: 'SUV aventureiro' },
    ]

    expect(filtrarProdutos(produtos, 'ranger', 'Todos')).toHaveLength(1)
    expect(filtrarProdutos(produtos, 'carro', 'Todos')).toHaveLength(1)
    expect(filtrarProdutos(produtos, 'xyz', 'Todos')).toHaveLength(0)
  })
})
