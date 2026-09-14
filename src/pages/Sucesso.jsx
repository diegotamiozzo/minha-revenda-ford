import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Sucesso = ({ onCompraFinalizada }) => {
  useEffect(() => {
    onCompraFinalizada()
  }, [onCompraFinalizada])

  return (
    <section className="result-card" aria-live="polite">
      <div className="result-icon result-icon-success" aria-hidden="true">
        ✓
      </div>
      <p className="eyebrow">Pagamento aprovado</p>
      <h1>Compra realizada com sucesso!</h1>
      <p>Seu pedido foi processado. Obrigado por escolher a Minha Revenda Ford.</p>
      <Link className="button button-primary" to="/catalogo">
        Voltar ao catálogo
      </Link>
    </section>
  )
}
