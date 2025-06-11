import React from 'react'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-all duration-300">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold">🎯 Tracker</h1>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}