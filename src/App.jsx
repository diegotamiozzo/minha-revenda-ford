import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { CarrinhoProvider } from './contexts/CarrinhoContext.jsx'
import { Carrinho } from './pages/Carrinho.jsx'
import { Catalogo } from './pages/Catalogo.jsx'
import { Falha } from './pages/Falha.jsx'
import { NaoEncontrada } from './pages/NaoEncontrada.jsx'
import { Pagamento } from './pages/Pagamento.jsx'
import { ProdutoDetalhe } from './pages/ProdutoDetalhe.jsx'
import { Sucesso } from './pages/Sucesso.jsx'
import { RotaPrivada } from './routes/RotaPrivada.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <CarrinhoProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/produtos" replace />} />
            <Route path="/" element={<Navigate to="/produtos" replace />} />
            <Route path="/catalogo" element={<Navigate to="/produtos" replace />} />
            <Route path="/produtos" element={<Catalogo />} />
            <Route path="/produto/:id" element={<ProdutoDetalhe />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route
              path="/pagamento"
              element={
                <RotaPrivada>
                  <Pagamento />
                </RotaPrivada>
              }
            />
            <Route path="/sucesso" element={<Sucesso />} />
            <Route path="/falha" element={<Falha />} />
            <Route path="*" element={<NaoEncontrada />} />
          </Route>
        </Routes>
      </CarrinhoProvider>
    </BrowserRouter>
  )
}

export default App
