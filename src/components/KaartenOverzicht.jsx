import React, { useState } from 'react'
import { ArrowLeftIcon } from './Icons'

import imgB1 from '../assets/images/basisbehoeften/1.png'
import imgB1Color from '../assets/images/basisbehoeften/1_teal.png'
import imgB2 from '../assets/images/basisbehoeften/2.png'
import imgB2Color from '../assets/images/basisbehoeften/2_teal.png'
import imgB3 from '../assets/images/basisbehoeften/3.png'
import imgB3Color from '../assets/images/basisbehoeften/3_teal.png'
import imgB4 from '../assets/images/basisbehoeften/4.png'
import imgB4Color from '../assets/images/basisbehoeften/4_teal.png'
import imgB5 from '../assets/images/basisbehoeften/5.png'
import imgB5Color from '../assets/images/basisbehoeften/5_teal.png'

import imgM1 from '../assets/images/modicategorieen/1.png'
import imgM1Color from '../assets/images/modicategorieen/1_teal.png'
import imgM2 from '../assets/images/modicategorieen/2.png'
import imgM2Color from '../assets/images/modicategorieen/2_teal.png'
import imgM3a from '../assets/images/modicategorieen/coping_overgave.png'
import imgM3aColor from '../assets/images/modicategorieen/coping_overgave_teal.png'
import imgM3b from '../assets/images/modicategorieen/coping_vermijding.png'
import imgM3bColor from '../assets/images/modicategorieen/coping_vermijding_teal.png'
import imgM3c from '../assets/images/modicategorieen/coping_overcompensatie.png'
import imgM3cColor from '../assets/images/modicategorieen/coping_overcompensatie_teal.png'
import imgM4 from '../assets/images/modicategorieen/4.png'
import imgM4Color from '../assets/images/modicategorieen/4_teal.png'

import { schemaImages, modeImages } from '../utils/images'
import { schemaDescriptions } from '../data/descriptions'
import { getVerdieping } from '../data/verdieping'

const ysqSchemaNamesMap = {
  'Abandonment': 'Verlating / Instabiliteit',
  'Mistrust': 'Wantrouwen / Misbruik',
  'Defectiveness_unlovability': 'Tekortschieten / Schaamte',
  'Emotional deprivation': 'Emotioneel tekort',
  'Social isolation_Alienation': 'Sociale isolatie / Vervreemding',
  'Practical incompetence_Dependence': 'Afhankelijkheid / Incompetentie',
  'Vulnerability to harm_illness': 'Kwetsbaarheid voor ziekte en gevaar',
  'Enmeshment': 'Kluwen / Onderontwikkeld zelf',
  'Failure to achieve': 'Mislukken',
  'Insufficient self-control_self-discipline': 'Onvoldoende zelfcontrole',
  'Entitlement_Superiority': 'Veeleisendheid / Grandiositeit',
  'Subjugation': 'Onderwerping',
  'Self-sacrifice': 'Zelfopoffering',
  'Admiration_Recognition-seeking': 'Goedkeuring / Erkenning zoeken',
  'Pessimism_Worry': 'Negativisme / Pessimisme',
  'Emotional inhibition': 'Emotionele geremdheid',
  'Unrelenting Standards': 'Meedogenloze normen',
  'Self-punitiveness': 'Bestraffendheid'
};

const smiModesMap = {
  'kk': 'Kwetsbare kind',
  'rk': 'Razende kind',
  'ik': 'Impulsieve kind',
  'ok': 'Ongedisciplineerde kind',
  'bk': 'Boze kind',
  'wi': 'Willoze inschikkelijke',
  'ob': 'Onthechte beschermer',
  'oz': 'Onthechte zelfsusser',
  'wk': 'Wantrouwende overcontroleerder',
  'zh': 'Zelfverheerlijker',
  'pa': 'Pest en aanval',
  'so': 'Straffende ouder',
  'vo': 'Veeleisende ouder',
  'gv': 'Gezonde volwassene'
};

const basisbehoeftenText = {
  '1. Veilige hechting': 'Veiligheid, stabiliteit, verzorging en onvoorwaardelijke acceptatie. Een thuishaven zonder angst voor verlating of afwijzing.',
  '2. Autonomie': 'Ruimte om zelf de wereld te ontdekken, fouten te mogen maken en vertrouwen te krijgen in je eigen kunnen als onafhankelijk individu.',
  '3. Vrije expressie': 'Ruimte om je vrij uit te drukken. Eigen gevoelens (ook boosheid of verdriet) en behoeften zijn geldig en belangrijk.',
  '4. Spontaniteit en spel': 'Ruimte voor plezier, creativiteit en onbezorgdheid. Niet alles hoeft nuttig, perfect of efficiënt te zijn.',
  '5. Realistische grenzen': 'Kaders om te leren omgaan met frustratie. Leren dat je niet altijd je zin kunt krijgen en rekening moet houden met anderen.'
};

const categorieText = {
  'Kindmodi': 'De modus waarin je je kwetsbaar, eenzaam, boos of impulsief voelt, net als een kind van vroeger dat iets tekortkwam.',
  'Oudermodi': 'De geïnternaliseerde stem van een veeleisende of straffende ouder. Een innerlijke criticus die zegt dat je tekortschiet.',
  'Coping: Overgave': 'Je gedraagt je alsof het schema 100% waar is. Je past je aan en ondergaat de situatie passief.',
  'Coping: Vermijding': 'Je vermijdt de emotionele pijn van het schema door situaties uit de weg te gaan of jezelf af te leiden/verdoven.',
  'Coping: Overcompensatie': 'Je vecht tegen het schema door je precies tegenovergesteld te gedragen aan wat het schema dicteert.',
  'Gezonde volwassene': 'De gezonde kant die zorgt voor het kwetsbare kind, gezonde grenzen stelt en de strenge oudermodi bestrijdt.'
};

export default function KaartenOverzicht({ onBack }) {
  const [filter, setFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);

  const handleFlip = (title) => {
    setFlippedCards(prev => ({ ...prev, [title]: !prev[title] }));
  }

  const schemaCards = [
    { src: imgB1, srcColor: imgB1Color, title: '1. Veilige hechting', description: basisbehoeftenText['1. Veilige hechting'] },
    { src: imgB2, srcColor: imgB2Color, title: '2. Autonomie', description: basisbehoeftenText['2. Autonomie'] },
    { src: imgB3, srcColor: imgB3Color, title: '3. Vrije expressie', description: basisbehoeftenText['3. Vrije expressie'] },
    { src: imgB4, srcColor: imgB4Color, title: '4. Spontaniteit en spel', description: basisbehoeftenText['4. Spontaniteit en spel'] },
    { src: imgB5, srcColor: imgB5Color, title: '5. Realistische grenzen', description: basisbehoeftenText['5. Realistische grenzen'] },
  ]

  const modiCards = [
    { src: imgM1, srcColor: imgM1Color, title: 'Kindmodi', description: categorieText['Kindmodi'] },
    { src: imgM2, srcColor: imgM2Color, title: 'Oudermodi', description: categorieText['Oudermodi'] },
    { src: imgM3a, srcColor: imgM3aColor, title: 'Coping: Overgave', description: categorieText['Coping: Overgave'] },
    { src: imgM3b, srcColor: imgM3bColor, title: 'Coping: Vermijding', description: categorieText['Coping: Vermijding'], style: { width: '80%', height: '80%' } },
    { src: imgM3c, srcColor: imgM3cColor, title: 'Coping: Overcompensatie', description: categorieText['Coping: Overcompensatie'] },
    { src: imgM4, srcColor: imgM4Color, title: 'Gezonde volwassene', description: categorieText['Gezonde volwassene'] },
  ]

  const detailedSchemaCards = Object.keys(schemaImages)
    .filter(path => !path.endsWith('_teal.png'))
    .map(path => {
      const filename = path.split('/').pop().replace('.png', '');
      const title = ysqSchemaNamesMap[filename] || filename.replace(/_/g, ' ');
      const colorPath = path.replace('.png', '_teal.png');
      return { src: schemaImages[path], srcColor: schemaImages[colorPath] || schemaImages[path], title, description: schemaDescriptions[title], style: { transform: title === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(1)' } };
    })

  const detailedModeCards = Object.keys(modeImages)
    .filter(path => !path.endsWith('_teal.png'))
    .map(path => {
      const filename = path.split('/').pop().replace('.png', '');
      const title = smiModesMap[filename] || filename;
      const colorPath = path.replace('.png', '_teal.png');
      return { src: modeImages[path], srcColor: modeImages[colorPath] || modeImages[path], title, description: schemaDescriptions[title], style: { transform: 'scale(1.1)' } };
    })

  const renderCardList = (cards, defaultImageStyle = {}) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyItems: 'center', justifyContent: 'center', padding: '1rem', marginBottom: '3rem' }}>
      {cards.map((card, idx) => (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="card-scene">
            <div className={`card-flip-container ${flippedCards[card.title] ? 'flipped' : ''}`}>
              
              <div className="card-face-front schema-img playing-card" onClick={() => handleFlip(card.title)} style={{ padding: '0', border: '4px solid white', boxSizing: 'border-box', cursor: 'pointer', pointerEvents: flippedCards[card.title] ? 'none' : 'auto' }}>
                <div style={{ flex: 1, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', borderRadius: '8px' }}>
                  <img src={card.src} alt={card.title} className="card-img-base" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', transition: 'opacity 0.5s ease-in-out', ...defaultImageStyle, ...card.style }} />
                  {card.srcColor && (
                    <img 
                      src={card.srcColor} 
                      alt={`${card.title} in color`} 
                      className="card-img-color"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', opacity: 0, transition: 'opacity 0.5s ease-in-out', ...defaultImageStyle, ...card.style }} 
                    />
                  )}
                  <div style={{ position: 'absolute', bottom: '8px', left: 0, right: 0, fontWeight: 'bold', color: '#333', textAlign: 'center', fontSize: '0.85rem', lineHeight: '1.2', zIndex: 1, textShadow: '0 0 3px rgba(255,255,255,0.9)' }}>
                    {card.title}
                  </div>
                </div>
              </div>
              
              <div className="card-face-back" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: flippedCards[card.title] ? 'auto' : 'none' }}>
                <div 
                  onClick={() => handleFlip(card.title)} 
                  style={{ flex: 1, cursor: 'pointer', overflowY: 'auto', marginBottom: '5px', paddingRight: '2px' }}
                  className="hide-scrollbar"
                >
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>{card.title}</h4>
                  <p style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>{card.description || 'Geen theorie beschikbaar.'}</p>
                </div>
                <button 
                  className="btn btn-card" 
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); setSelectedCard(card); }}
                  style={{ fontSize: '0.75rem', padding: '6px 12px', alignSelf: 'center', width: '100%', zIndex: 20, position: 'relative', flexShrink: 0 }}
                >
                  Praktijkvoorbeeld & Tips
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const FilterButton = ({ id, label }) => (
    <button 
      onClick={() => setFilter(id)}
      style={{
        padding: '8px 16px',
        borderRadius: '20px',
        border: filter === id ? 'none' : '1px solid var(--border-color)',
        background: filter === id ? '#14b8a6' : 'transparent',
        color: filter === id ? 'white' : 'var(--text-main)',
        fontWeight: filter === id ? 'bold' : 'normal',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: filter === id ? '0 4px 12px rgba(20, 184, 166, 0.3)' : 'none'
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="view-container">
      <div className="header" style={{ marginBottom: '2rem' }}>
        <h1 className="text-gradient">Kaarten Overzicht</h1>
        <p>Alle illustraties uit de theorie op een rij. Klik op een kaart om de theorie te lezen!</p>
      </div>
      
      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <button className="btn btn-outline" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeftIcon size={18} /> Terug naar Start
        </button>
      </div>

      <div className="no-print" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '3rem' }}>
        <FilterButton id="all" label="Toon Alles" />
        <FilterButton id="domeinen" label="Basisbehoeften" />
        <FilterButton id="schemas" label="Individuele Schema's" />
        <FilterButton id="modicats" label="Modi Categorieën" />
        <FilterButton id="modi" label="Individuele Modi" />
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        
        {(filter === 'all' || filter === 'domeinen') && (
          <div>
            <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem' }}>Schema Domeinen (Basisbehoeften)</h2>
            {renderCardList(schemaCards, { transform: 'scale(0.85)' })}
          </div>
        )}

        {(filter === 'all' || filter === 'schemas') && (
          <div>
            <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', marginTop: filter === 'all' ? '2rem' : '0' }}>Individuele Schema's (18)</h2>
            {renderCardList(detailedSchemaCards)}
          </div>
        )}

        {(filter === 'all' || filter === 'modicats') && (
          <div>
            <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', marginTop: filter === 'all' ? '2rem' : '0' }}>Modi Categorieën</h2>
            {renderCardList(modiCards, { transform: 'scale(0.85)' })}
          </div>
        )}

        {(filter === 'all' || filter === 'modi') && (
          <div>
            <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', marginTop: filter === 'all' ? '2rem' : '0' }}>Individuele Modi (14)</h2>
            {renderCardList(detailedModeCards)}
          </div>
        )}

      </div>

      {selectedCard && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }} onClick={() => setSelectedCard(null)}>
          <div className="glass-panel" style={{
            background: 'var(--card-bg)', maxWidth: '600px', width: '100%', 
            maxHeight: '90vh', overflowY: 'auto', padding: '2rem', position: 'relative'
          }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedCard(null)} 
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)' }}
            >×</button>
            <h2 className="text-gradient" style={{ marginBottom: '0.5rem' }}>{selectedCard.title}</h2>
            <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Praktijkvoorbeeld & Tips</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Herkenbaar Praktijkvoorbeeld</h5>
              <p style={{ lineHeight: '1.6', background: 'rgba(20, 184, 166, 0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                {getVerdieping(selectedCard.title).casus}
              </p>
            </div>

            <div>
              <h5 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Concrete Tips & Handvatten</h5>
              <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                {getVerdieping(selectedCard.title).tips.map((tip, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className="btn btn-gradient" onClick={() => setSelectedCard(null)} style={{ color: 'white' }}>
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
