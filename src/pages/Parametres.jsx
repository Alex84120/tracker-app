import React from 'react'
import { supabase } from '../services/supabase'

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
    const { default: jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default
    const doc = new jsPDF()

    // 1. Titre
    doc.setFontSize(16)
    doc.text('📄 Suivi Tracker', 10, 10)

    // 2. Poids
    const poids = JSON.parse(localStorage.getItem('poids') || '[]')
    doc.setFontSize(12)
    doc.text('Poids enregistrés :', 10, 20)
    poids.forEach((p, i) => {
      doc.text(`${p.date} : ${p.value} kg`, 10, 30 + i * 6)
    })

    // 3. Surcharge progressive
    doc.addPage()
    doc.setFontSize(14)
    doc.text('Surcharge progressive', 10, 10)
    const charges = JSON.parse(localStorage.getItem('charges_histo') || '{}')
    doc.setFont
