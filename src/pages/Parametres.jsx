import React from 'react'
import { supabase } from '../services/supabase'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function Parametres() {
  const userId = localStorage.getItem('anon_id') || (() => {
    const id = crypto.randomUUID()
    localStorage.setItem('anon_id', id)
    return id
  })()

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
  }

  const saveCloud = async () => {
    const poids = JSON.parse(localStorage.getItem('poids') || '[]')
    const charges = JSON.parse(localStorage.getItem('charges_histo') || '{}')
    const shakes = localStorage.getItem('shakes') || '0'
    const ecarts = JSON.parse(localStorage.getItem('ecarts') || '[]')

    await supabase.from('tracker_data').upsert({
      id: userId,
      poids,
      charges,
      shakes,
      ecarts,
      updated_at: new Date().toISOString()
    })

    alert('✅ Données sauvegardées dans le cloud.')
  }

  const loadCloud = async () => {
    const { data, error } = await supabase.from('tracker_data').select('*').eq('id', userId).single()
    if (data) {
      localStorage.setItem('poids', JSON.stringify(data.poids || []))
      localStorage.setItem('charges_histo', JSON.stringify(data.charges || {}))
      localStorage.setItem('shakes', data.shakes || '0')
      localStorage.setItem('ecarts', JSON.stringify(data.ecarts || []))
      alert('✅ Données restaurées.')
    } else {
      alert('❌ Aucune donnée trouvée.')
    }
  }

  const exportPDF = async () => {
    const doc = new jsPDF()
    const poids = JSON.parse(localStorage.getItem('poids') || '[]')
    const charges = JSON.parse(localStorage.getItem('charges_histo') || '{}')

    doc.text('📄 Suivi Tracker', 10, 10)
    doc.text(`Poids enregistrés :`, 10, 20)
    poids.forEach((p, i) => doc.text(`${p.date} : ${p.value} kg`, 10, 30 + i * 6))

    doc.addPage()
    doc.text('Surcharge progressive :', 10, 10)
    Object.entries(charges).forEach(([exo, list], i) => {
      doc.text(`${exo}:`, 10, 20 + i * 6)
      const lines = list.slice(-3).map(h => `${h.date}: ${h.value} kg`).join(', ')
      doc.text(lines, 40, 20 + i * 6)
    })

    // Capture du graphique
    const chart = document.querySelector('canvas')
    if (chart) {
      const canvas = await html2canvas(chart)
      const imgData = canvas.toDataURL('image/png')
      doc.addPage()
      doc.addImage(imgData, 'PNG', 10, 10, 180, 80)
    }

    doc.save('suivi_tracker.pdf')
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold mb-2">⚙️ Paramètres</h1>

      <button onClick={toggleDark} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        🌓 Changer de mode
      </button>

      <button onClick={saveCloud} className="bg-green-600 text-white px-4 py-2 rounded w-full">
        ☁️ Sauvegarder sur le cloud
      </button>

      <button onClick={loadCloud} className="bg-yellow-600 text-white px-4 py-2 rounded w-full">
        ☁️ Restaurer depuis le cloud
      </button>

      <button onClick={exportPDF} className="bg-purple-600 text-white px-4 py-2 rounded w-full">
        📄 Exporter en PDF
      </button>
    </div>
  )
}