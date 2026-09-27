import React, { useState } from 'react';
import { ArrowLeftIcon } from './Icons';
import { schemaImages, modeImages } from '../utils/images';

import imgB1 from '../assets/images/basisbehoeften/1.png';
import imgB2 from '../assets/images/basisbehoeften/2.png';
import imgB3 from '../assets/images/basisbehoeften/3.png';
import imgB4 from '../assets/images/basisbehoeften/4.png';
import imgB5 from '../assets/images/basisbehoeften/5.png';
import imgM4 from '../assets/images/modicategorieen/4.png';

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

const needCards = [
  { src: imgB1, title: '1. Veilige hechting', type: 'need' },
  { src: imgB2, title: '2. Autonomie', type: 'need' },
  { src: imgB3, title: '3. Vrije expressie', type: 'need' },
  { src: imgB4, title: '4. Spontaniteit en spel', type: 'need' },
  { src: imgB5, title: '5. Realistische grenzen', type: 'need' },
];

const schemaCards = Object.keys(schemaImages).map(path => {
  const filename = path.split('/').pop().replace('.png', '');
  const title = ysqSchemaNamesMap[filename] || filename.replace(/_/g, ' ');
  return { src: schemaImages[path], title, type: 'schema', style: { transform: title === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(1)' } };
});

const modeCards = Object.keys(modeImages).map(path => {
  const filename = path.split('/').pop().replace('.png', '');
  const title = smiModesMap[filename] || filename;
  return { src: modeImages[path], title, type: 'mode', style: { transform: 'scale(1.1)' } };
});

const healthyAdultCard = { src: imgM4, title: 'Gezonde volwassene', type: 'mode', style: { transform: 'scale(1.1)' } };

const CardSlot = ({ label, card, onSelect, onRemove }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary)', textAlign: 'center' }}>{label}</div>
    {card ? (
      <div style={{ position: 'relative' }}>
         <div className="schema-img playing-card" style={{ width: '140px', height: '180px', padding: '12px', display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
           <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
             <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
           </div>
           <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', margin: '6px 0 0 0', lineHeight: '1.2' }}>{card.title}</div>
         </div>
         {onRemove && (
           <button onClick={onRemove} className="no-print" style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>&times;</button>
         )}
      </div>
    ) : (
      <div 
        onClick={onSelect} 
        className="glass-panel no-print" 
        style={{ width: '140px', height: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--primary)', borderRadius: '12px', cursor: 'pointer', background: 'rgba(20, 184, 166, 0.05)', transition: 'all 0.2s' }}
      >
        <span style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>+</span>
        <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold' }}>Kies Kaart</span>
      </div>
    )}
  </div>
);

export default function Tafelopstelling({ onBack }) {
  const [situationText, setSituationText] = useState('');
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [gvNotes, setGvNotes] = useState('');
  const [showCardPicker, setShowCardPicker] = useState(null);

  const handleSelectCard = (card) => {
    if (showCardPicker === 'mode') setSelectedMode(card);
    if (showCardPicker === 'schema') setSelectedSchema(card);
    if (showCardPicker === 'need') setSelectedNeed(card);
    setShowCardPicker(null);
  };

  const clearTable = () => {
    if (window.confirm('Weet je zeker dat je de tafel wilt leegmaken?')) {
      setSituationText('');
      setSelectedMode(null);
      setSelectedSchema(null);
      setSelectedNeed(null);
      setGvNotes('');
    }
  };

  return (
    <div className="view-container">
      <div className="header no-print" style={{ marginBottom: '2rem' }}>
        <h1 className="text-gradient">Digitale Tafelopstelling</h1>
        <p>Visualiseer je psychologische reactiepatroon op een specifieke trigger.</p>
      </div>
      
      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button className="btn btn-outline" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeftIcon size={18} /> Terug naar Start
        </button>
        <button className="btn btn-outline" onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          PDF / Printen
        </button>
        <button className="btn btn-outline" onClick={clearTable} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', borderColor: '#ef4444' }}>
          Tafel Leegmaken
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', maxWidth: '900px', margin: '0 auto', background: 'var(--card-bg)' }}>
        
        <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 className="text-gradient" style={{ marginBottom: '1rem' }}>Wat was de situatie / trigger?</h3>
          <textarea 
            placeholder="Beschrijf hier kort de situatie (bijv. 'Tijdens een overleg werd mijn idee genegeerd...')" 
            value={situationText}
            onChange={e => setSituationText(e.target.value)}
            style={{ 
              width: '100%', maxWidth: '600px', minHeight: '80px', padding: '1rem', 
              borderRadius: '12px', border: '1px solid var(--border-color)', 
              background: 'rgba(0,0,0,0.02)', color: 'var(--text-main)', 
              fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical' 
            }}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Linkerkant: De Keten */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '250px' }}>
            <CardSlot label="Mijn Reactie (Modus)" card={selectedMode} onSelect={() => setShowCardPicker('mode')} onRemove={() => setSelectedMode(null)} />
            
            <div style={{ height: '40px', width: '3px', background: 'var(--primary)', opacity: 0.3, margin: '10px 0' }}></div>
            
            <CardSlot label="Geraakt Schema" card={selectedSchema} onSelect={() => setShowCardPicker('schema')} onRemove={() => setSelectedSchema(null)} />
            
            <div style={{ height: '40px', width: '3px', background: 'var(--primary)', opacity: 0.3, margin: '10px 0' }}></div>
            
            <CardSlot label="Onvervulde Behoefte" card={selectedNeed} onSelect={() => setShowCardPicker('need')} onRemove={() => setSelectedNeed(null)} />
          </div>

          {/* Rechterkant: Gezonde Volwassene */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '250px', padding: '2rem', background: 'rgba(20, 184, 166, 0.05)', borderRadius: '16px', border: '1px dashed var(--primary)' }}>
            <CardSlot label="Gezonde Volwassene" card={healthyAdultCard} />
            <div style={{ width: '100%', marginTop: '1.5rem' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary)', textAlign: 'center' }}>Grenzen stellen & Zorgen</div>
              <textarea 
                placeholder="Wat zou de Gezonde Volwassene zeggen of doen in deze situatie?" 
                value={gvNotes}
                onChange={e => setGvNotes(e.target.value)}
                style={{ 
                  width: '100%', minHeight: '180px', padding: '1rem', 
                  borderRadius: '12px', border: '1px solid var(--border-color)', 
                  background: 'var(--bg-color)', color: 'var(--text-main)', 
                  fontFamily: 'inherit', fontSize: '0.95rem', resize: 'vertical',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {showCardPicker && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }} onClick={() => setShowCardPicker(null)}>
          <div className="glass-panel" style={{ background: 'var(--bg-color)', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', borderRadius: '16px', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowCardPicker(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)' }}>&times;</button>
            <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              {showCardPicker === 'mode' ? 'Kies een Modus' : showCardPicker === 'schema' ? 'Kies een Schema' : 'Kies een Basisbehoefte'}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              {(showCardPicker === 'mode' ? modeCards : showCardPicker === 'schema' ? schemaCards : needCards).map((card, idx) => (
                <div key={idx} className="schema-img playing-card" onClick={() => handleSelectCard(card)} style={{ width: '120px', height: '160px', padding: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src={card.src} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '4px', lineHeight: '1.2' }}>{card.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
