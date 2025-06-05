import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

const styles = {
  dark: { backgroundColor: '#121212', color: '#E0E0E0', minHeight: '100vh', padding: '1rem' },
  light: { backgroundColor: '#ffffff', color: '#000000', minHeight: '100vh', padding: '1rem' },
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [shakes, setShakes] = useState(0)
  const [extraFoods, setExtraFoods] = useState([])
  const [customSessions, setCustomSessions] = useState([])
  const [poids, setPoids] = useState([])
  const [inputPoids, setInputPoids] = useState('')
  const [planning, setPlanning] = useState({
    Lundi: { done: false, intensity: '' },
    Mardi: { done: false, intensity: '' },
    Mercredi: { done: false, intensity: '' },
    Jeudi: { done: false, intensity: '' },
    Vendredi: { done: false, intensity: '' },
    Samedi: { done: false, intensity: '' },
    Dimanche: { done: false, intensity: '' },
  })

  const toggleDark = () => setDarkMode(!darkMode)
  const addShake = () => setShakes(prev => prev + 1)

  const addExtra = () => {
    const food = prompt('Aliment ?')
    const cal = prompt('Calories ?')
    if (food && cal) setExtraFoods(prev => [...prev, { food, cal }])
  }

  const addSession = () => {
    const sess = prompt('Séance hors programme ?')
    if (sess) setCustomSessions(prev => [...prev, sess])
  }

  const savePoids = () => {
    if (inputPoids) {
      const date = new Date().toLocaleDateString()
      setPoids(prev => [...prev, { date, value: parseFloat(inputPoids) }])
      setInputPoids('')
    }
  }

  const toggleDay = (day) => {
    setPlanning(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        done: !prev[day].done,
      },
    }))
  }

  const setIntensity = (day, level) => {
    setPlanning(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        intensity: level,
      },
    }))
  }

  const replaceWithHomeWorkout = (day) => {
    alert(`Séance maison pour ${day} : \n- Pompes \n- Fentes \n- Rowing haltère \n- Crunchs \n- Gainage`)
  }

  const replaceExercise = () => {
    const ex = prompt('Exercice à remplacer ?')
    const alt = prompt('Par quoi veux-tu le remplacer ?')
    if (ex && alt) alert(`${ex} remplacé par ${alt}`)
  }

  useEffect(() => {
    if (Notification.permission === 'granted') {
      setTimeout(() => new Notification('Rappel : entraînement ou pesée aujourd’hui ?'), 10000)
    }
  }, [])

  return (
    <div style={darkMode ? styles.dark : styles.light}>
      <h1>📱 Tracker</h1>
      <button onClick={toggleDark}>Mode {darkMode ? 'Clair' : 'Sombre'}</button>

      <h2>📅 Planning</h2>
      {Object.entries(planning).map(([day, { done, intensity }]) => (
        <div key={day}>
          <input type="checkbox" checked={done} onChange={() => toggleDay(day)} />
          {day} — Intensité : {intensity || 'aucune'}
          <select onChange={(e) => setIntensity(day, e.target.value)} value={intensity}>
            <option value="">--</option>
            <option value="léger">🟢 Léger</option>
            <option value="modéré">🟡 Modéré</option>
            <option value="intense">🔴 Intense</option>
          </select>
          <button onClick={() => replaceWithHomeWorkout(day)}>🏠 Maison</button>
        </div>
      ))}

      <h2>🥤 Shakes Whey : {shakes}</h2>
      <button onClick={addShake}>+ Ajouter un shake</button>

      <h2>🍽️ Écarts</h2>
      <ul>{extraFoods.map((e, i) => <li key={i}>{e.food} - {e.cal} kcal</li>)}</ul>
      <button onClick={addExtra}>+ Ajouter un aliment</button>

      <h2>🏃‍♂️ Séances hors programme</h2>
      <ul>{customSessions.map((s, i) => <li key={i}>{s}</li>)}</ul>
      <button onClick={addSession}>+ Ajouter une séance</button>

      <h2>⚖️ Poids</h2>
      <input value={inputPoids} onChange={e => setInputPoids(e.target.value)} placeholder="Poids du jour" />
      <button onClick={savePoids}>Enregistrer</button>
      {poids.length > 0 && (
        <Line
          data={{
            labels: poids.map(p => p.date),
            datasets: [{
              label: 'Poids (kg)',
              data: poids.map(p => p.value),
              fill: false,
              borderColor: 'cyan',
            }]
          }}
        />
      )}

      <hr />
      <button onClick={replaceExercise}>🔁 Remplacer un exercice</button>
    </div>
  )
}
