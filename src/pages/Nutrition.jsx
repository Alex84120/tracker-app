import React, { useState, useEffect } from 'react'

export default function Nutrition() {
  const [shakes, setShakes] = useState(0)
  const [ecarts, setEcarts] = useState([])

  // charger depuis localStorage
  useEffect(() => {
    const s = localStorage.getItem('shakes')
    const e = localStorage.getItem('ecarts')
    if (s) setShakes(Number(s))
    if (e) setEcarts(JSON.parse(e))
  }, [])

  // sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem('shakes', shakes)
    localStorage.setItem('ecarts', JSON.stringify(ecarts))
  }, [shakes, ecarts])

  const addShake = () => {
    setShakes(prev => prev + 1)
  }

  const addEcart = () => {
    const aliment = prompt('Nom de l’aliment ou du plat ?')
    const cal = prompt('Estimation des calories ?')
    if (aliment && cal) {
      const date = new Date().toLocaleDateString()
      setEcarts(prev => [...prev, { aliment, cal, date }])
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🍽️ Suivi Nutrition</h1>

      <div className="mb-4">
        <h2 className="font-semibold text-lg">🥤 Shakes whey : {shakes}</h2>
        <button
          onClick={addShake}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          + Ajouter un shake
        </button>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-lg">🍔 Repas / aliments hors plan</h2>
        <button
          onClick={addEcart}
          className="bg-red-600 text-white px-4 py-2 rounded mt-2"
        >
          + Ajouter un écart
        </button>
        <ul className="mt-4">
          {ecarts.slice().reverse().map((e, i) => (
            <li key={i}>
              {e.date} — {e.aliment} ({e.cal} kcal)
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
