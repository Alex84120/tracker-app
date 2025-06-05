import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: '🏠 Accueil' },
  { path: '/muscu', label: '💪 Muscu' },
  { path: '/suivi', label: '📊 Suivi' },
  { path: '/nutrition', label: '🍽️ Nutrition' },
  { path: '/parametres', label: '⚙️ Réglages' },
]

export default function Navigation() {
  return (
    <nav className="flex justify-around border-t border-gray-600 p-2 bg-white dark:bg-gray-900">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `text-sm ${isActive ? 'font-bold text-blue-500' : 'text-gray-500'}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
