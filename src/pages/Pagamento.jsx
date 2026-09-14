import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { ResumoCompra } from '../components/ResumoCompra.jsx'
import { usePagamento } from '../hooks/usePagamento.js'
import { normalizarNumeroCartao } from '../utils/pagamento.js'

const schemaPagamento = z.object({
  titular: z.string().trim().min(1, 'Informe o nome do titular.'),
  numeroCartao: z
    .string()
    .transform(normalizarNumeroCartao)
    .refine((valor) => /^\d{16}$/.test(valor), {
      message: 'Informe um cartão com 16 dígitos.',
    }),
  validade: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use o formato MM/AA.'),
  cvv: z.string().regex(/^\d{3}$/, 'Informe um CVV com 3 dígitos.'),
})

export const Pagamento = ({ produtos }) => {
  const navigate = useNavigate()
  const { processando, processarPagamento } = usePagamento()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaPagamento),
    mode: 'onBlur',
  })

  if (produtos.length === 0) {
    return <Navigate to="/carrinho" replace />
  }

  const total = produtos.reduce(
    (soma, produto) => soma + produto.precoUnitario * produto.quantidade,
    0,
  )

  const onSubmit = async (dados) => {
    const aprovado = await processarPagamento(dados)

    navigate(aprovado ? '/sucesso' : '/falha')
  }

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Etapa 2 de 2</p>
        <h1>Pagamento</h1>
        <p>Use dados fictícios para simular a aprovação da compra.</p>
      </div>

      <div className="payment-layout">
        <form className="payment-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-field">
            <label htmlFor="titular">Nome do titular</label>
            <input
              id="titular"
              type="text"
              autoComplete="cc-name"
              aria-invalid={Boolean(errors.titular)}
              aria-describedby={errors.titular ? 'titular-error' : undefined}
              {...register('titular')}
            />
            {errors.titular && (
              <span id="titular-error" className="field-error" role="alert">
                {errors.titular.message}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="numeroCartao">Número do cartão</label>
            <input
              id="numeroCartao"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              aria-invalid={Boolean(errors.numeroCartao)}
              aria-describedby={errors.numeroCartao ? 'numero-cartao-error' : undefined}
              {...register('numeroCartao')}
            />
            {errors.numeroCartao && (
              <span id="numero-cartao-error" className="field-error" role="alert">
                {errors.numeroCartao.message}
              </span>
            )}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="validade">Validade</label>
              <input
                id="validade"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/AA"
                aria-invalid={Boolean(errors.validade)}
                aria-describedby={errors.validade ? 'validade-error' : undefined}
                {...register('validade')}
              />
              {errors.validade && (
                <span id="validade-error" className="field-error" role="alert">
                  {errors.validade.message}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                type="text"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                aria-invalid={Boolean(errors.cvv)}
                aria-describedby={errors.cvv ? 'cvv-error' : undefined}
                {...register('cvv')}
              />
              {errors.cvv && (
                <span id="cvv-error" className="field-error" role="alert">
                  {errors.cvv.message}
                </span>
              )}
            </div>
          </div>

          <button
            className="button button-primary"
            type="submit"
            disabled={processando}
            aria-busy={processando}
          >
            {processando ? 'Processando compra…' : 'Confirmar pagamento'}
          </button>
          <Link className="back-link" to="/carrinho">
            Voltar ao carrinho
          </Link>
        </form>

        <ResumoCompra total={total} />
      </div>
    </section>
  )
}
