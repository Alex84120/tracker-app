import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

export default function Suivi() {
  const [poids, setPoids] = useState([])
  const [inputPoids, setInputPoids] = useState('')

  // Charger les données locales
  useEffect(() => {
    const data = localStorage.getItem('poids')
    if (data) setPoids(JSON.parse(data))
  }, [])

  // Sauvegarder automatiquement
  useEffect(() => {
    localStorage.setItem('poids', JSON.stringify(poids))
  }, [poids])

  const enregistrerPoids = () => {
    if (!inputPoids) return
    const date = new Date().toLocaleDateString()
    setPoids([...poids, { date, value: parseFloat(inputPoids) }])
    setInputPoids('')
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📊 Suivi du poids</h1>

      <div className="mb-4">
        <input
          type="number"
          value={inputPoids}
          onChange={(e) => setInputPoids(e.target.value)}
          placeholder="Poids du jour"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={enregistrerPoids}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full"
        >
          Enregistrer
        </button>
      </div>

      {poids.length > 0 && (
        <>
          <Line
            data={{
              labels: poids.map((p) => p.date),
              datasets: [
                {
                  label: 'Poids (kg)',
                  data: poids.map((p) => p.value),
                  borderColor: 'cyan',
                  fill: false
                }
              ]
            }}
          />
          <ul className="mt-4">
            {poids.slice().reverse().map((p, i) => (
              <li key={i}>
                {p.date} : {p.value} kg
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
