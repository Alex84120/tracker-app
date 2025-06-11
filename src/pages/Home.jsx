import React from 'react'

export default function Accueil() {
  return (
    <div className="p-4 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Bienvenue dans Tracker 👋</h2>
      <p className="mb-2">Cette application te permet de suivre :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>💪 Ta progression en musculation</li>
        <li>📈 Ton poids et tes mensurations</li>
        <li>📄 Ton historique PDF</li>
        <li>☁️ Tes données dans le cloud</li>
      </ul>
    </div>
  )
}