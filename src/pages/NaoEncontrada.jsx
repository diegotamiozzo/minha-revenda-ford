import { Link } from 'react-router-dom'

export const NaoEncontrada = () => (
  <section className="result-card">
    <div className="result-icon result-icon-failure" aria-hidden="true">
      ?
    </div>
    <p className="eyebrow">Página não encontrada</p>
    <h1>Erro 404</h1>
    <p>A página que você procura não existe ou foi movida.</p>
    <Link className="button button-primary" to="/">
      Voltar ao início
    </Link>
  </section>
)
