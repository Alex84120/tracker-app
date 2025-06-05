import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Muscu from './pages/Muscu'
import Suivi from './pages/Suivi'
import Nutrition from './pages/Nutrition'
import Parametres from './pages/Parametres'
import Navigation from './components/Navigation'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/muscu" element={<Muscu />} />
          <Route path="/suivi" element={<Suivi />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/parametres" element={<Parametres />} />
        </Routes>
      </div>
      <Navigation />
    </div>
  )
}
