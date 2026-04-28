import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Sales from './pages/Sales'
import Commissions from './pages/Commissions'
import Documents from './pages/Documents'
import Partners from './pages/Partners'
import Influencers from './pages/Influencers'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vendas" element={<Sales />} />
            <Route path="/comissoes" element={<Commissions />} />
            <Route path="/documentos" element={<Documents />} />
            <Route path="/socios" element={<Partners />} />
            <Route path="/influencers" element={<Influencers />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  )
}
