import { formatarMoeda } from '../utils/moeda.js'

export const ResumoCompra = ({ total }) => (
  <aside className="purchase-summary" aria-label="Resumo da compra">
    <h2>Resumo da compra</h2>
    <div className="summary-total">
      <span>Total</span>
      <strong>{formatarMoeda(total)}</strong>
    </div>
  </aside>
)
