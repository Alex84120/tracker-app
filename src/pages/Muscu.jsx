import React, { useState, useEffect } from 'react'

const muscuPlan = {
  Mardi: {
    titre: 'Jambes (quadriceps / fessiers / mollets)',
    exos: [
      { nom: 'Squats', series: 4, reps: 10 },
      { nom: 'Fentes haltères', series: 3, reps: 12 },
      { nom: 'Soulevé de terre jambes tendues', series: 3, reps: 10 },
      { nom: 'Mollets debout', series: 3, reps: 15 }
    ]
  },
  Jeudi: {
    titre: 'Push (pectoraux / épaules / triceps)',
    exos: [
      { nom: 'Développé couché', series: 4, reps: 10 },
      { nom: 'Développé militaire', series: 4, reps: 10 },
      { nom: 'Écartés haltères', series: 3, reps: 12 },
      { nom: 'Dips ou pompes triceps', series: 3, reps: 12 }
    ]
  },
  Vendredi: {
    titre: 'Pull (dos / biceps)',
    exos: [
      { nom: 'Tractions', series: 4, reps: 8 },
      { nom: 'Rowing barre', series: 4, reps: 10 },
      { nom: 'Curl biceps', series: 3, reps: 12 },
      { nom: 'Face pull', series: 3, reps: 15 }
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
  const [historique, setHistorique] = useState({})
  const [activiteLibre, setActiviteLibre] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem('charges_histo')
    if (data) setHistorique(JSON.parse(data))

    const libre = localStorage.getItem(`activite_${jour}`)
    if (libre === 'true') setActiviteLibre(true)
  }, [jour])

  useEffect(() => {
    localStorage.setItem('charges_histo', JSON.stringify(historique))
  }, [historique])

  useEffect(() => {
    localStorage.setItem(`activite_${jour}`, activiteLibre.toString())
  }, [activiteLibre, jour])

  const handleChangeCharge = (exo, value) => {
    setCharges(prev => ({ ...prev, [exo]: value }))
    const date = new Date().toLocaleDateString()
    setHistorique(prev => {
      const newHisto = { ...prev }
      if (!newHisto[exo]) newHisto[exo] = []
      newHisto[exo].push({ date, value })
      return newHisto
    })
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

  const isJourLibre = jour === 'Lundi' || jour === 'Mercredi' || jour === 'Samedi' || jour === 'Dimanche'

  return (
    <div className="p-4">
      {seance ? (
        <>
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

                  {/* Historique de l'exercice */}
                  {historique[exo] && (
                    <div className="mt-2 text-sm">
                      <p className="font-semibold">Historique :</p>
                      <ul className="list-disc ml-5">
                        {historique[exo].slice(-5).reverse().map((h, i) => (
                          <li key={i}>{h.date} : {h.value} kg</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Pas de séance muscu prévue aujourd'hui</h2>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded mb-4"
            onClick={handleMaison}
          >
            🏠 Afficher séance maison
          </button>
        </>
      )}

      {/* Case à cocher activité libre (escalade/trail) */}
      {isJourLibre && (
        <div className="mt-4">
          <label>
            <input
              type="checkbox"
              className="mr-2"
              checked={activiteLibre}
              onChange={() => setActiviteLibre(!activiteLibre)}
            />
            ✅ J'ai fait ma séance escalade / trail aujourd’hui
          </label>
        </div>
      )}
    </div>
  )
}