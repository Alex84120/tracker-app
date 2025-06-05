import React, { useState } from 'react'

const muscuPlan = {
  Lundi: {
    titre: 'Push (pectoraux / épaules / triceps)',
    exos: [
      { nom: 'Développé couché', series: 4, reps: 10 },
      { nom: 'Développé militaire', series: 4, reps: 10 },
      { nom: 'Écartés haltères', series: 3, reps: 12 },
      { nom: 'Dips ou pompes triceps', series: 3, reps: 12 }
    ]
  },
  Mardi: {
    titre: 'Pull (dos / biceps)',
    exos: [
      { nom: 'Tractions', series: 4, reps: 8 },
      { nom: 'Rowing barre', series: 4, reps: 10 },
      { nom: 'Curl biceps', series: 3, reps: 12 },
      { nom: 'Face pull', series: 3, reps: 15 }
    ]
  },
  Jeudi: {
    titre: 'Jambes (quadriceps / fessiers / mollets)',
    exos: [
      { nom: 'Squats', series: 4, reps: 10 },
      { nom: 'Fentes haltères', series: 3, reps: 12 },
      { nom: 'Soulevé de terre jambes tendues', series: 3, reps: 10 },
      { nom: 'Mollets debout', series: 3, reps: 15 }
    ]
  }
}

const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

export default function Muscu() {
  const today = new Date().getDay()
  const jour = jours[today]
  const seance = muscuPlan[jour]
  const [charges, setCharges] = useState({})
  const [intensite, setIntensite] = useState('')
  const [remplacements, setRemplacements] = useState({})

  const handleChangeCharge = (exo, value) => {
    setCharges(prev => ({ ...prev, [exo]: value }))
  }

  const handleRemplacement = (exo) => {
    const remplacement = prompt(`Par quoi veux-tu remplacer "${exo}" ?`)
    if (remplacement) {
      setRemplacements(prev => ({ ...prev, [exo]: remplacement }))
    }
  }

  const handleMaison = () => {
    alert(`Séance maison (haltère 10 kg) :
- Pompes inclinées
- Rowing haltère
- Fentes
- Gainage
`)
  }

  if (!seance) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Pas de séance prévue ce jour</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleMaison}>
          🏠 Afficher une séance maison
        </button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">💪 {seance.titre}</h1>

      <label className="block mb-2">
        Intensité :
        <select
          value={intensite}
          onChange={(e) => setIntensite(e.target.value)}
          className="ml-2 border px-2 py-1 rounded"
        >
          <option value="">--</option>
          <option value="léger">🟢 Léger</option>
          <option value="modéré">🟡 Modéré</option>
          <option value="intense">🔴 Intense</option>
        </select>
      </label>

      <ul>
        {seance.exos.map(({ nom, series, reps }, index) => {
          const exo = remplacements[nom] || nom
          return (
            <li key={index} className="mb-4 border-b pb-2">
              <div className="font-semibold">{exo}</div>
              <div>Séries : {series} — Reps : {reps}</div>
              <input
                type="text"
                placeholder="Charge utilisée (kg)"
                className="border px-2 py-1 mt-1 rounded w-full"
                value={charges[exo] || ''}
                onChange={(e) => handleChangeCharge(exo, e.target.value)}
              />
              <button
                onClick={() => handleRemplacement(nom)}
                className="text-sm text-blue-500 underline mt-1"
              >
                🔁 Remplacer l'exercice
              </button>
            </li>
          )
        })}
      </ul>

      <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded" onClick={handleMaison}>
        🏠 Pas accès à la salle ? Afficher séance maison
      </button>
    </div>
  )
}
