import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingBag, DollarSign, FileText,
  Users, Star, Menu,
} from 'lucide-react'
import { useState } from 'react'

const nav = [
  { to: '/',             label: 'Visão Geral',  Icon: LayoutDashboard },
  { to: '/vendas',       label: 'Vendas',        Icon: ShoppingBag },
  { to: '/comissoes',    label: 'Comissões',     Icon: DollarSign },
  { to: '/documentos',   label: 'Documentos',    Icon: FileText },
  { to: '/socios',       label: 'Sócios',        Icon: Users },
  { to: '/influencers',  label: 'Influencers',   Icon: Star },
]

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30
        flex flex-col transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
            <ShoppingBag size={16} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm leading-none">Brechó</p>
            <p className="text-xs text-gray-400 mt-0.5">Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {nav.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">© 2025 Brechó</p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
          <button onClick={() => setOpen(true)} className="p-1.5 rounded-md hover:bg-gray-100">
            <Menu size={20} />
          </button>
          <span className="font-semibold text-gray-900">Brechó Dashboard</span>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
