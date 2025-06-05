import React, { useState } from 'react'

export default function Parametres() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setDark(!dark)
  }

  const demanderNotification = () => {
    if (Notification.permission === 'granted') {
      alert('✅ Les notifications sont déjà activées.')
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('🔔 Tu recevras des rappels sur tes séances et ton suivi.')
        }
      })
    }
  }

  const resetData = () => {
    if (confirm('Effacer toutes les données locales ?')) {
      localStorage.clear()
      alert('✅ Données réinitialisées. Recharge la page.')
    }
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold mb-2">⚙️ Paramètres</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={toggleDarkMode}
      >
        Mode {dark ? 'clair' : 'sombre'}
      </button>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={demanderNotification}
      >
        🔔 Activer les notifications
      </button>

      <button
        className="bg-red-600 text-white px-4 py-2 rounded"
        onClick={resetData}
      >
        ♻️ Réinitialiser les données
      </button>
    </div>
  )
}
