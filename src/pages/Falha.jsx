import { Link } from 'react-router-dom'

export const Falha = () => (
  <section className="result-card" aria-live="assertive">
    <div className="result-icon result-icon-failure" aria-hidden="true">
      !
    </div>
    <p className="eyebrow">Pagamento não aprovado</p>
    <h1>Tentativa de golpe</h1>
    <p>Não foi possível concluir a compra com os dados informados.</p>
    <Link className="button button-primary" to="/pagamento">
      Tentar novamente
    </Link>
  </section>
)
