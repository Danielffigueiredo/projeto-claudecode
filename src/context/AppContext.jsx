import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

const DEFAULT_PARTNERS = [
  { id: 'p1', name: 'Sócio 1', color: '#a855f7' },
  { id: 'p2', name: 'Sócio 2', color: '#ec4899' },
  { id: 'p3', name: 'Sócio 3', color: '#06b6d4' },
]

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [partners, setPartners] = useState(() => load('partners', DEFAULT_PARTNERS))
  const [sales, setSales] = useState(() => load('sales', []))
  const [influencers, setInfluencers] = useState(() => load('influencers', []))

  useEffect(() => { localStorage.setItem('partners', JSON.stringify(partners)) }, [partners])
  useEffect(() => { localStorage.setItem('sales', JSON.stringify(sales)) }, [sales])
  useEffect(() => { localStorage.setItem('influencers', JSON.stringify(influencers)) }, [influencers])

  function updatePartner(id, data) {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
  }

  function addSale(sale) {
    setSales(prev => [...prev, { ...sale, id: crypto.randomUUID(), createdAt: new Date().toISOString() }])
  }
  function updateSale(id, data) {
    setSales(prev => prev.map(s => s.id === id ? { ...s, ...data } : s))
  }
  function deleteSale(id) {
    setSales(prev => prev.filter(s => s.id !== id))
  }

  function addInfluencer(inf) {
    setInfluencers(prev => [...prev, { ...inf, id: crypto.randomUUID() }])
  }
  function updateInfluencer(id, data) {
    setInfluencers(prev => prev.map(i => i.id === id ? { ...i, ...data } : i))
  }
  function deleteInfluencer(id) {
    setInfluencers(prev => prev.filter(i => i.id !== id))
  }

  function getPartnerEarnings(partnerId) {
    let ownSales = 0
    let commissions = 0
    let deliveries = 0

    for (const s of sales) {
      if (s.status === 'cancelled') continue
      if (s.type === 'own' && s.ownerId === partnerId) {
        ownSales += s.salePrice || 0
      }
      if (s.type === 'consignment') {
        const fee = ((s.salePrice || 0) * (s.commissionRate || 0)) / 100
        commissions += fee / 3
      }
      if (s.hasDelivery && s.deliveredById === partnerId) {
        deliveries += s.deliveryFee || 0
      }
    }
    return { ownSales, commissions, deliveries, total: ownSales + commissions + deliveries }
  }

  return (
    <AppContext.Provider value={{
      partners, updatePartner,
      sales, addSale, updateSale, deleteSale,
      influencers, addInfluencer, updateInfluencer, deleteInfluencer,
      getPartnerEarnings,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
