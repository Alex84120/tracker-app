import { useState } from 'react'

export default function Parametres() {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    setDarkMode(!darkMode)
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">⚙️ Paramètres</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={toggleDark}
      >
        Activer le mode {darkMode ? 'clair' : 'sombre'}
      </button>
    </div>
  )
}
