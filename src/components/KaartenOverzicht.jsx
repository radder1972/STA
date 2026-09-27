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

import { schemaImages, modeImages } from '../utils/images'

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

export default function KaartenOverzicht({ onBack }) {
  const schemaCards = [
    { src: imgB1, title: '1. Veilige hechting' },
    { src: imgB2, title: '2. Autonomie' },
    { src: imgB3, title: '3. Vrije expressie' },
    { src: imgB4, title: '4. Spontaniteit en spel' },
    { src: imgB5, title: '5. Realistische grenzen' },
  ]

  const modiCards = [
    { src: imgM1, title: 'Kindmodi' },
    { src: imgM2, title: 'Oudermodi' },
    { src: imgM3a, title: 'Coping: Overgave' },
    { src: imgM3b, title: 'Coping: Vermijding', style: { width: '80%', height: '80%' } },
    { src: imgM3c, title: 'Coping: Overcompensatie' },
    { src: imgM4, title: 'Gezonde volwassene' },
  ]

  const detailedSchemaCards = Object.keys(schemaImages).map(path => {
    const filename = path.split('/').pop().replace('.png', '');
    const title = ysqSchemaNamesMap[filename] || filename.replace(/_/g, ' ');
    return { src: schemaImages[path], title };
  })

  const detailedModeCards = Object.keys(modeImages).map(path => {
    const filename = path.split('/').pop().replace('.png', '');
    const title = smiModesMap[filename] || filename;
    return { src: modeImages[path], title, style: { transform: title === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(0.85)' } };
  })

  const renderCardList = (cards, defaultImageStyle = {}) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyItems: 'center', justifyContent: 'center', padding: '1rem', marginBottom: '3rem' }}>
      {cards.map((card, idx) => (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="schema-img playing-card" style={{ width: '200px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', ...defaultImageStyle, ...card.style }} />
          </div>
          <div style={{ fontWeight: 'bold', color: 'var(--text-main)', textAlign: 'center', maxWidth: '200px' }}>
            {card.title}
          </div>
        </div>
      ))}
    </div>
  )

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

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem' }}>Schema Domeinen (Basisbehoeften)</h2>
        {renderCardList(schemaCards, { transform: 'scale(0.85)' })}

        <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '2rem' }}>Individuele Schema's (18)</h2>
        {renderCardList(detailedSchemaCards)}

        <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '2rem' }}>Modi Categorieën</h2>
        {renderCardList(modiCards, { transform: 'scale(0.85)' })}

        <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '2rem' }}>Individuele Modi (14)</h2>
        {renderCardList(detailedModeCards)}
      </div>
    </div>
  )
}
