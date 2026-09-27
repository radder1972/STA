import React from 'react'
import { ArrowLeftIcon } from './Icons'

import imgB1 from '../assets/images/basisbehoeften/1.png'
import imgB2 from '../assets/images/basisbehoeften/2.png'
import imgB3 from '../assets/images/basisbehoeften/3.png'
import imgB4 from '../assets/images/basisbehoeften/4.png'
import imgB5 from '../assets/images/basisbehoeften/5.png'

import imgM1 from '../assets/images/modicategorieen/1.png'
import imgM2 from '../assets/images/modicategorieen/2.png'
import imgM3a from '../assets/images/modicategorieen/coping_overgave.png'
import imgM3b from '../assets/images/modicategorieen/coping_vermijding.png'
import imgM3c from '../assets/images/modicategorieen/coping_overcompensatie.png'
import imgM4 from '../assets/images/modicategorieen/4.png'

export default function KaartenOverzicht({ onBack }) {
  const allCards = [
    { src: imgB1, title: 'Veilige hechting' },
    { src: imgB2, title: 'Autonomie' },
    { src: imgB3, title: 'Realistische grenzen' },
    { src: imgB4, title: 'Vrije expressie' },
    { src: imgB5, title: 'Spontaniteit en spel' },
    { src: imgM1, title: 'Kindmodi' },
    { src: imgM2, title: 'Oudermodi' },
    { src: imgM3a, title: 'Overgave' },
    { src: imgM3b, title: 'Vermijding', style: { width: '80%', height: '80%' } },
    { src: imgM3c, title: 'Overcompensatie' },
    { src: imgM4, title: 'Gezonde volwassene' },
  ]

  return (
    <div className="view-container">
      <div className="header" style={{ marginBottom: '2rem' }}>
        <h1 className="text-gradient">Kaarten Overzicht</h1>
        <p>Alle illustraties uit de theorie op een rij</p>
      </div>
      
      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <button className="btn btn-outline" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeftIcon size={18} /> Terug naar Start
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        {allCards.map((card, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div className="schema-img playing-card" style={{ width: '200px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
            </div>
            <div style={{ fontWeight: 'bold', color: 'var(--text-main)', textAlign: 'center', maxWidth: '200px' }}>
              {card.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
