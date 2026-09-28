import React, { useState } from 'react'
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

const basisbehoeftenToSchemas = {
  '1. Veilige hechting': ['Verlating / Instabiliteit', 'Wantrouwen / Misbruik', 'Emotioneel tekort', 'Tekortschieten / Schaamte', 'Sociale isolatie / Vervreemding'],
  '2. Autonomie': ['Afhankelijkheid / Incompetentie', 'Kwetsbaarheid voor ziekte en gevaar', 'Kluwen / Onderontwikkeld zelf', 'Mislukken'],
  '3. Vrije expressie': ['Onderwerping', 'Zelfopoffering', 'Goedkeuring / Erkenning zoeken'],
  '4. Spontaniteit en spel': ['Negativisme / Pessimisme', 'Emotionele geremdheid', 'Meedogenloze normen', 'Bestraffendheid'],
  '5. Realistische grenzen': ['Veeleisendheid / Grandiositeit', 'Onvoldoende zelfcontrole']
};

const categorieText = {
  'Kindmodi': 'De modus waarin je je kwetsbaar, eenzaam, boos of impulsief voelt, net als een kind van vroeger dat iets tekortkwam.',
  'Oudermodi': 'De geïnternaliseerde stem van een veeleisende of straffende ouder. Een innerlijke criticus die zegt dat je tekortschiet.',
  'Coping: Overgave': 'Je gedraagt je alsof het schema 100% waar is. Je past je aan en ondergaat de situatie passief.',
  'Coping: Vermijding': 'Je vermijdt de emotionele pijn van het schema door situaties uit de weg te gaan of jezelf af te leiden/verdoven.',
  'Coping: Overcompensatie': 'Je vecht tegen het schema door je precies tegenovergesteld te gedragen aan wat het schema dicteert.',
  'Gezonde volwassene': 'De gezonde kant die zorgt voor het kwetsbare kind, gezonde grenzen stelt en de strenge oudermodi bestrijdt.'
};

const categorieToModi = {
  'Kindmodi': ['Kwetsbare kind', 'Razende kind', 'Impulsieve kind', 'Ongedisciplineerde kind', 'Boze kind'],
  'Oudermodi': ['Straffende ouder', 'Veeleisende ouder'],
  'Coping: Overgave': ['Willoze inschikkelijke'],
  'Coping: Vermijding': ['Onthechte beschermer', 'Onthechte zelfsusser'],
  'Coping: Overcompensatie': ['Wantrouwende overcontroleerder', 'Zelfverheerlijker', 'Pest en aanval'],
  'Gezonde volwassene': ['Gezonde volwassene']
};

export default function KaartenOverzicht({ onBack }) {
  const [filter, setFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleFlip = (title) => {
    setFlippedCards(prev => ({ ...prev, [title]: !prev[title] }));
  }

  const schemaCards = [
    { src: imgB1, title: '1. Veilige hechting', description: basisbehoeftenText['1. Veilige hechting'] },
    { src: imgB2, title: '2. Autonomie', description: basisbehoeftenText['2. Autonomie'] },
    { src: imgB3, title: '3. Vrije expressie', description: basisbehoeftenText['3. Vrije expressie'] },
    { src: imgB4, title: '4. Spontaniteit en spel', description: basisbehoeftenText['4. Spontaniteit en spel'] },
    { src: imgB5, title: '5. Realistische grenzen', description: basisbehoeftenText['5. Realistische grenzen'] },
  ]

  const modiCards = [
    { src: imgM1, title: 'Kindmodi', description: categorieText['Kindmodi'] },
    { src: imgM2, title: 'Oudermodi', description: categorieText['Oudermodi'] },
    { src: imgM3a, title: 'Coping: Overgave', description: categorieText['Coping: Overgave'] },
    { src: imgM3b, title: 'Coping: Vermijding', description: categorieText['Coping: Vermijding'], style: { width: '80%', height: '80%' } },
    { src: imgM3c, title: 'Coping: Overcompensatie', description: categorieText['Coping: Overcompensatie'] },
    { src: imgM4, title: 'Gezonde volwassene', description: categorieText['Gezonde volwassene'] },
  ]

  const detailedSchemaCards = Object.keys(schemaImages).map(path => {
    const filename = path.split('/').pop().replace('.png', '');
    const title = ysqSchemaNamesMap[filename] || filename.replace(/_/g, ' ');
    return { src: schemaImages[path], title, description: schemaDescriptions[title], style: { transform: title === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(1)' } };
  })

  const detailedModeCards = Object.keys(modeImages).map(path => {
    const filename = path.split('/').pop().replace('.png', '');
    const title = smiModesMap[filename] || filename;
    return { src: modeImages[path], title, description: schemaDescriptions[title], style: { transform: 'scale(1.1)' } };
  })

  const renderCardList = (cards, listName, defaultImageStyle = {}) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyItems: 'center', justifyContent: 'center', padding: '1rem', marginBottom: '3rem' }}>
      {cards.map((card, idx) => {
        const uniqueKey = `${listName}-${card.title}`;
        return (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="card-scene">
            <div className={`card-flip-container ${flippedCards[uniqueKey] ? 'flipped' : ''}`}>
              
              <div className="card-face-front schema-img playing-card" onClick={() => handleFlip(uniqueKey)} style={{ padding: '16px', boxSizing: 'border-box', cursor: 'pointer', pointerEvents: flippedCards[uniqueKey] ? 'none' : 'auto' }}>
                <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', ...defaultImageStyle, ...card.style }} />
                </div>
                <div style={{ fontWeight: 'bold', color: '#333', textAlign: 'center', fontSize: '1rem', lineHeight: '1.2', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', marginTop: '4px', zIndex: 1 }}>
                  {card.title}
                </div>
              </div>
              
              <div className="card-face-back" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: flippedCards[uniqueKey] ? 'auto' : 'none' }}>
                <div 
                  onClick={() => handleFlip(uniqueKey)} 
                  style={{ flex: 1, cursor: 'pointer', overflow: 'hidden', marginBottom: '5px', paddingRight: '2px', display: 'flex', flexDirection: 'column' }}
                >
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>{card.title}</h4>
                  <p style={{ fontSize: '0.75rem', lineHeight: '1.4', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>{card.description || 'Geen theorie beschikbaar.'}</p>
                </div>
                <button 
                  className="btn btn-card" 
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); setSelectedCard({ ...card, listName }); }}
                  style={{ fontSize: '0.75rem', padding: '6px 12px', alignSelf: 'center', width: '100%', zIndex: 20, position: 'relative', flexShrink: 0 }}
                >
                  <span className="btn-text">Lees theorie & tips</span>
                </button>
              </div>

            </div>
          </div>
        </div>
        );
      })}
    </div>
  )

  const FilterButton = ({ id, label }) => (
    <button 
      onClick={() => setFilter(id)}
      style={{
        padding: '8px 16px',
        borderRadius: '20px',
        border: filter === id ? 'none' : '1px solid var(--border-color)',
        background: filter === id ? 'var(--primary)' : 'var(--card-bg)',
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

  if (selectedCategory) {
    const isSchema = !!basisbehoeftenToSchemas[selectedCategory.title];
    const mapping = isSchema ? basisbehoeftenToSchemas[selectedCategory.title] : categorieToModi[selectedCategory.title];
    const fullList = isSchema ? detailedSchemaCards : detailedModeCards;
    const filteredCards = fullList.filter(c => mapping && mapping.includes(c.title));

    return (
      <div className="view-container">
        <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <button onClick={() => setSelectedCategory(null)} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeftIcon size={18} /> Terug naar Overzicht
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
          <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem' }}>Geselecteerde Categorie</h2>
          {renderCardList([selectedCategory], isSchema ? 'schema-cat' : 'modi-cat', isSchema ? { transform: 'scale(0.85)' } : { transform: 'scale(0.85)' })}
        </div>

        <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Bijbehorende {isSchema ? "Schema's" : 'Modi'}
        </h2>
        {renderCardList(filteredCards, isSchema ? 'schema-ind' : 'modi-ind')}

        {selectedCard && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
          }} onClick={() => setSelectedCard(null)}>
            <div className="glass-panel" style={{
              background: 'var(--bg-color)', maxWidth: '600px', width: '100%', 
              maxHeight: '90vh', overflowY: 'auto', padding: '2rem', position: 'relative',
              borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
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
    );
  }

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

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)', WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}>
        
        {(filter === 'all' || filter === 'domeinen') && (
          <div>
            <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem' }}>Schema Domeinen (Basisbehoeften)</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Ieder mens heeft fundamentele emotionele basisbehoeften, zoals de behoefte aan veiligheid, verbondenheid, autonomie en spontaniteit. Als er in de kindertijd structureel niet aan deze behoeften is voldaan, kunnen er hardnekkige, negatieve patronen (schema's) ontstaan. De schema's vallen onder de volgende 5 domeinen.
            </p>
            {renderCardList(schemaCards, 'schema-cat', { transform: 'scale(0.85)' })}
          </div>
        )}

        {(filter === 'all' || filter === 'schemas') && (
          <div>
            <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', marginTop: filter === 'all' ? '3rem' : '0' }}>Individuele Schema's (18)</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Een schema is een vastgeroest patroon van denken, voelen en doen dat vaak al in de vroege jeugd is ontstaan. Ze fungeren als een soort gekleurde bril waardoor je (soms onbewust) naar jezelf, anderen en de wereld kijkt. Hieronder zie je de 18 specifieke schema's die we onderscheiden.
            </p>
            {renderCardList(detailedSchemaCards, 'schema-ind')}
          </div>
        )}

        {(filter === 'all' || filter === 'modicats') && (
          <div>
            <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', marginTop: filter === 'all' ? '3rem' : '0' }}>Modi Categorieën</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Waar schema's de dieperliggende, langdurige patronen of 'knoppen' zijn, is een <strong>modus</strong> de actuele gemoedstoestand waarin je op dít specifieke moment verkeert als een knop wordt ingedrukt. Modi worden ingedeeld in deze 4 hoofdcategorieën.
            </p>
            {renderCardList(modiCards, 'modi-cat', { transform: 'scale(0.85)' })}
          </div>
        )}

        {(filter === 'all' || filter === 'modi') && (
          <div>
            <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', marginTop: filter === 'all' ? '3rem' : '0' }}>Individuele Modi (14)</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Binnen de 4 hoofdcategorieën kunnen we specifieker inzoomen. Hier vind je de 14 meest voorkomende, specifieke gemoedstoestanden of kanten van jezelf (de modi) die geactiveerd kunnen worden wanneer je schema's worden geraakt.
            </p>
            {renderCardList(detailedModeCards, 'modi-ind')}
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
            background: 'var(--bg-color)', maxWidth: '600px', width: '100%', 
            maxHeight: '90vh', overflowY: 'auto', padding: '2rem', position: 'relative',
            borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
          }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedCard(null)} 
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)' }}
            >×</button>
            <h2 className="text-gradient" style={{ marginBottom: '0.5rem' }}>{selectedCard.title}</h2>
            
            <div style={{ marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '1.05rem', color: 'var(--text-main)' }}>
              {selectedCard.description || 'Geen theorie beschikbaar.'}
            </div>

            {(selectedCard.listName === 'schema-cat' || selectedCard.listName === 'modi-cat') && (
              <button 
                className="btn btn-gradient" 
                onClick={() => { setSelectedCategory(selectedCard); setSelectedCard(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ width: '100%', marginBottom: '2rem', color: 'white', padding: '12px' }}
              >
                {selectedCard.listName === 'schema-cat' ? "Bekijk bijbehorende schema's" : "Bekijk bijbehorende modi"}
              </button>
            )}

            <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '1rem' }}>Verdieping & Tips</h4>
            
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
