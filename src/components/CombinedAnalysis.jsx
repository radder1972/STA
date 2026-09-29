import React, { useMemo, useState } from 'react';
import ysqScoring from '../data/ysq-scoring.json';
import smiScoring from '../data/smi-scoring.json';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell, LabelList, Legend } from 'recharts';
import { ArrowRightIcon, LightbulbIcon, HypothesisIcon, ConnectionIcon, MatrixIcon } from './Icons';
import AiAnalysis from './AiAnalysis';
import { getCardColor } from '../utils/colors';
import { getSchemaImage } from '../utils/images';
import { schemaDescriptions } from '../data/descriptions';

// Duplicated maps for simplicity, as they are not exported from SingleResult
const basisbehoeftenMap = {
  'Abandonment': 'Verbondenheid & Veiligheid', 'Mistrust': 'Verbondenheid & Veiligheid', 'Defectiveness/unlovability': 'Verbondenheid & Veiligheid', 'Emotional deprivation': 'Verbondenheid & Veiligheid', 'Social isolation/Alienation': 'Verbondenheid & Veiligheid',
  'Practical incompetence/Dependence': 'Autonomie', 'Vulnerability to harm/illness': 'Autonomie', 'Enmeshment': 'Autonomie', 'Failure to achieve': 'Autonomie',
  'Insufficient self-control/self-discipline': 'Realistische Grenzen', 'Entitlement/Superiority': 'Realistische Grenzen',
  'Subjugation': 'Zelfexpressie', 'Self-sacrifice': 'Zelfexpressie', 'Admiration/Recognition-seeking': 'Zelfexpressie',
  'Pessimism/Worry': 'Spontaniteit & Spel', 'Emotional inhibition': 'Spontaniteit & Spel', 'Unrelenting Standards': 'Spontaniteit & Spel', 'Self-punitiveness': 'Spontaniteit & Spel'
};

const smiModesMap = {
  'kk': { name: 'Kwetsbare kind', group: 'Kindmodi' }, 'rk': { name: 'Razende kind', group: 'Kindmodi' }, 'ik': { name: 'Impulsieve kind', group: 'Kindmodi' }, 'ok': { name: 'Ongedisciplineerde kind', group: 'Kindmodi' }, 'bk': { name: 'Boze kind', group: 'Kindmodi' },
  'wi': { name: 'Willoze inschikkelijke', group: 'Beschermmodi - Overgave' }, 'ob': { name: 'Onthechte beschermer', group: 'Beschermmodi - Vermijden' }, 'oz': { name: 'Onthechte zelfsusser', group: 'Beschermmodi - Vermijden' }, 'wk': { name: 'Wantrouwende overcontroleerder', group: 'Beschermmodi - Omkering' }, 'zh': { name: 'Zelfverheerlijker', group: 'Beschermmodi - Omkering' }, 'pa': { name: 'Pest en aanval', group: 'Beschermmodi - Omkering' },
  'so': { name: 'Straffende ouder', group: 'Disfunctionele oudermodi' }, 'vo': { name: 'Veeleisende ouder', group: 'Disfunctionele oudermodi' }, 'gv': { name: 'Gezonde volwassene', group: 'Functionele modi' }
};

const ysqNamesMap = {
  'Abandonment': 'Verlating', 'Mistrust': 'Wantrouwen', 'Defectiveness/unlovability': 'Tekortschieten', 'Emotional deprivation': 'Emotioneel tekort', 'Social isolation/Alienation': 'Sociale isolatie',
  'Practical incompetence/Dependence': 'Afhankelijkheid', 'Vulnerability to harm/illness': 'Kwetsbaarheid', 'Enmeshment': 'Kluwen', 'Failure to achieve': 'Mislukken',
  'Insufficient self-control/self-discipline': 'Onvoldoende zelfcontrole', 'Entitlement/Superiority': 'Veeleisendheid',
  'Subjugation': 'Onderwerping', 'Self-sacrifice': 'Zelfopoffering', 'Admiration/Recognition-seeking': 'Erkenning zoeken',
  'Pessimism/Worry': 'Pessimisme', 'Emotional inhibition': 'Emotionele geremdheid', 'Unrelenting Standards': 'Meedogenloze normen', 'Self-punitiveness': 'Bestraffendheid'
};

const schemaToModesHypothesis = {
  'Abandonment': { modes: ['wi', 'ob', 'bk'], desc: 'Mensen met sterke verlatingsangst klampen zich soms wanhopig vast (Willoze Inschikkelijke) of stoten anderen juist uit voorzorg af (Onthechte Beschermer / Boze Kind).' },
  'Mistrust': { modes: ['wk', 'ob'], desc: 'Bij wantrouwen staat men vaak chronisch op scherp (Wantrouwende Overcontroleerder) of trekt men een muur op (Onthechte Beschermer).' },
  'Defectiveness/unlovability': { modes: ['ob', 'wk', 'zh'], desc: 'Gevoelens van tekortschieten worden vaak weggedrukt (Onthechte Beschermer) of overgecompenseerd door perfectionisme of arrogantie (Zelfverheerlijker / Overcontroleerder).' },
  'Emotional deprivation': { modes: ['ob', 'oz', 'bk'], desc: 'Een emotioneel tekort leidt vaak tot vermijding en zelfsus-gedrag (Onthechte Beschermer / Zelfsusser), of juist tot woede (Boze kind).' },
  'Subjugation': { modes: ['wi', 'bk'], desc: 'Onderwerping vertaalt zich logischerwijs vaak in de Willoze Inschikkelijke modus, maar kan uiteindelijk omslaan in opgekropte woede (Boze Kind).' },
  'Entitlement/Superiority': { modes: ['zh', 'pa', 'ok'], desc: 'Veeleisendheid is verbonden met de Zelfverheerlijker of Pest- en Aanval-modus, en hangt soms samen met Ongedisciplineerd gedrag.' },
  'Insufficient self-control/self-discipline': { modes: ['ik', 'ok'], desc: 'Onvoldoende zelfcontrole is het fundament onder het Impulsieve en Ongedisciplineerde Kind.' },
  'Unrelenting Standards': { modes: ['vo', 'wk'], desc: 'Meedogenloze normen worden meestal aangestuurd door de Veeleisende Ouder en in stand gehouden door de Wantrouwende Overcontroleerder.' },
  'Self-punitiveness': { modes: ['so'], desc: 'Bestraffendheid correspondeert vrijwel 1-op-1 met de aanwezigheid van de Straffende Oudermodus.' },
  'Failure to achieve': { modes: ['ob', 'vo'], desc: 'De angst om te mislukken activeert vaak de Veeleisende Ouder (die falen afstraft) en leidt dan tot de Onthechte Beschermer (opgeven uit zelfbescherming).' },
  'Vulnerability to harm/illness': { modes: ['wk', 'wi'], desc: 'Kwetsbaarheid leidt vaak tot obsessieve waakzaamheid (Overcontroleerder) of vastklampen aan anderen (Willoze Inschikkelijke).' },
  'Social isolation/Alienation': { modes: ['ob', 'oz'], desc: 'Sociale isolatie wordt over het algemeen in stand gehouden door de Onthechte Beschermer of Zelfsusser.' },
  'Practical incompetence/Dependence': { modes: ['wi', 'wk'], desc: 'Bij afhankelijkheid stelt men zich vaak ondergeschikt of hulpeloos op (Willoze Inschikkelijke), of compenseert men juist met krampachtige overcontrole.' },
  'Enmeshment': { modes: ['wi', 'oz'], desc: 'Een kluwen-schema leidt vaak tot grenzeloze aanpassing aan de ander (Willoze Inschikkelijke) of dissociatie via zelfsus-gedrag (Zelfsusser).' },
  'Self-sacrifice': { modes: ['wi', 'bk'], desc: 'Zelfopoffering is de brandstof van de Willoze Inschikkelijke modus. Vaak leidt het op de lange termijn tot wrok in de vorm van het Boze Kind.' },
  'Admiration/Recognition-seeking': { modes: ['zh', 'wi'], desc: 'Erkenning zoeken activeert vaak de Zelfverheerlijker (om indruk te maken) of de Willoze Inschikkelijke (door alles te doen om aardig gevonden te worden).' },
  'Pessimism/Worry': { modes: ['wk', 'ob'], desc: 'Pessimisme en zorgen worden vaak in toom gehouden door de Wantrouwende Overcontroleerder (alles dichttimmeren) of de Onthechte Beschermer.' },
  'Emotional inhibition': { modes: ['ob', 'vo'], desc: 'Emotionele geremdheid is een actieve vorm van de Onthechte Beschermer, vaak aangestuurd door een Veeleisende Ouder die emoties afkeurt.' }
};

const calculateScores = (answers, scoringData, type) => {
  return Object.entries(scoringData).map(([key, items]) => {
    let sum = 0; let answeredCount = 0;
    items.forEach(qId => {
      if (answers && answers[qId]) {
        sum += answers[qId];
        answeredCount++;
      }
    });
    const mean = answeredCount > 0 ? (sum / answeredCount).toFixed(2) : 0;
    const name = type === 'ysq' ? ysqNamesMap[key] : (smiModesMap[key]?.name || key);
    const category = type === 'ysq' ? basisbehoeftenMap[key] : smiModesMap[key]?.group;
    return { id: key, name, mean: parseFloat(mean), category };
  }).sort((a, b) => b.mean - a.mean);
};

export default function CombinedAnalysis({ ysqAnswers, smiAnswers }) {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const ysqScores = useMemo(() => calculateScores(ysqAnswers, ysqScoring, 'ysq'), [ysqAnswers]);
  const smiScores = useMemo(() => calculateScores(smiAnswers, smiScoring, 'smi'), [smiAnswers]);

  const top3Ysq = ysqScores.slice(0, 3);
  const top3Coping = smiScores.filter(s => s.category?.includes('BESCHERMMODI')).slice(0, 3);

  // For Option B: Domain comparison
  const domainAverages = useMemo(() => {
    const ysqGroups = {};
    ysqScores.forEach(s => {
      if (!ysqGroups[s.category]) ysqGroups[s.category] = { sum: 0, count: 0 };
      ysqGroups[s.category].sum += s.mean;
      ysqGroups[s.category].count += 1;
    });

    const smiGroups = {};
    smiScores.forEach(s => {
      if (!smiGroups[s.category]) smiGroups[s.category] = { sum: 0, count: 0 };
      smiGroups[s.category].sum += s.mean;
      smiGroups[s.category].count += 1;
    });

    const combined = [
      { name: 'Verbondenheid / Kindmodi', ysq: ysqGroups['Verbondenheid & Veiligheid']?.sum / ysqGroups['Verbondenheid & Veiligheid']?.count || 0, smi: smiGroups['KINDMODI']?.sum / smiGroups['KINDMODI']?.count || 0 },
      { name: 'Grenzen / Oudermodi', ysq: ysqGroups['Realistische Grenzen']?.sum / ysqGroups['Realistische Grenzen']?.count || 0, smi: smiGroups['DISFUNCTIONELE OUDERMODI']?.sum / smiGroups['DISFUNCTIONELE OUDERMODI']?.count || 0 },
      { name: 'Autonomie / Coping (Vermijden)', ysq: ysqGroups['Autonomie']?.sum / ysqGroups['Autonomie']?.count || 0, smi: smiGroups['BESCHERMMODI - VERMIJDEN']?.sum / smiGroups['BESCHERMMODI - VERMIJDEN']?.count || 0 },
      { name: 'Zelfexpressie / Coping (Overgave)', ysq: ysqGroups['Zelfexpressie']?.sum / ysqGroups['Zelfexpressie']?.count || 0, smi: smiGroups['BESCHERMMODI - OVERGAVE']?.sum / smiGroups['BESCHERMMODI - OVERGAVE']?.count || 0 },
      { name: 'Spel / Coping (Omkering)', ysq: ysqGroups['Spontaniteit & Spel']?.sum / ysqGroups['Spontaniteit & Spel']?.count || 0, smi: smiGroups['BESCHERMMODI - OMKERING']?.sum / smiGroups['BESCHERMMODI - OMKERING']?.count || 0 }
    ];
    return combined.map(c => ({ ...c, ysq: Number(c.ysq.toFixed(2)), smi: Number(c.smi.toFixed(2)) }));
  }, [ysqScores, smiScores]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* OPTION A: Top 3 Visual Links */}
      <div className="glass-panel print-avoid-break" style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ConnectionIcon size={28} useGradient={true} /> Directe Top 3 Connectie
        </h2>
        <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          Voor uw meest verhoogde schema's laten we hier de hoogst scorende, theoretisch gekoppelde modus (SMI) zien.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '1rem' }}>
                <th style={{ padding: '8px 0', textAlign: 'left', fontWeight: 'bold' }} colSpan="2">Kwetsbaarheid (Top 3 Schema's)</th>
                <th style={{ padding: '8px 0', textAlign: 'center', width: '40px' }}></th>
                <th style={{ padding: '8px 0', textAlign: 'left', fontWeight: 'bold' }} colSpan="2">Reactie (Hoogste Gekoppelde Modus)</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2].map(i => {
                const schema = top3Ysq[i];
                
                // Vind de hoogst scorende modus die theorethisch aan dit schema gekoppeld is
                let topLinkedMode = null;
                if (schema) {
                  const hypothesis = schemaToModesHypothesis[schema.id];
                  if (hypothesis && hypothesis.modes) {
                    const linkedModesScores = smiScores.filter(s => hypothesis.modes.includes(s.id));
                    topLinkedMode = linkedModesScores[0]; // Al gesorteerd op mean descending
                  }
                }

                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '8px 0', color: 'var(--text-main)', fontSize: '1rem' }}>{schema?.name || '-'}</td>
                    <td style={{ padding: '8px 0', textAlign: 'left', color: 'var(--text-main)', fontSize: '1rem' }}>{schema?.mean || '-'}</td>
                    <td style={{ padding: '8px 0', textAlign: 'center' }}>
                      {schema && topLinkedMode && <ArrowRightIcon size={14} color="var(--text-muted)" />}
                    </td>
                    <td style={{ padding: '8px 0', color: 'var(--text-main)', fontSize: '1rem' }}>{topLinkedMode?.name || 'Geen sterke link gevonden'}</td>
                    <td style={{ padding: '8px 0', textAlign: 'left', color: 'var(--text-main)', fontSize: '1rem' }}>{topLinkedMode?.mean || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>



      {/* OPTION C: Matrix Table */}
      <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MatrixIcon size={28} useGradient={true} /> Kruisverbanden Matrix
        </h2>
        <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
          Ruwe data vergelijking: zijn de hoogste schema's terug te zien in het modusgebruik?
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '1rem' }}>
                <th style={{ padding: '8px 0', textAlign: 'left', fontWeight: 'bold' }}>Theoretisch Vlak</th>
                <th style={{ padding: '8px 0', textAlign: 'left', fontWeight: 'bold' }}>YSQ Domein Score</th>
                <th style={{ padding: '8px 0', textAlign: 'left', fontWeight: 'bold' }}>SMI Groep Score</th>
              </tr>
            </thead>
            <tbody>
              {domainAverages.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', color: 'var(--text-main)', fontSize: '1rem' }}>{row.name}</td>
                  <td style={{ padding: '8px 0', textAlign: 'left', color: 'var(--text-main)', fontSize: '1rem' }}>
                    <span style={{ fontWeight: row.ysq >= 4 ? 'bold' : 'normal', color: row.ysq >= 4 ? 'var(--text-main)' : 'var(--text-muted)' }}>
                      {row.ysq}
                    </span>
                  </td>
                  <td style={{ padding: '8px 0', textAlign: 'left', color: 'var(--text-main)', fontSize: '1rem' }}>
                    <span style={{ fontWeight: row.smi >= 4 ? 'bold' : 'normal', color: row.smi >= 4 ? 'var(--text-main)' : 'var(--text-muted)' }}>
                      {row.smi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Matrix Explanation */}
        <div className="no-print" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0, marginBottom: '1rem', color: 'var(--text-main)' }}>
            <LightbulbIcon size={24} useGradient={true} /> Wat zegt deze matrix?
          </h4>
          <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '1rem' }}>
            In de schematherapie is er een theoretisch verband tussen uw onderliggende gevoeligheden (schema's) en uw huidige gedrag (modi). Deze matrix legt de score van een groep schema's direct naast de score van de bijbehorende groep modi om te zien of deze in balans zijn.
          </p>
          <ul style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.6', margin: 0, paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>In balans:</strong> Een vergelijkbare score betekent dat uw gedrag logisch aansluit bij uw onderliggende gevoel.</li>
            <li><strong>Uit balans (Discrepantie):</strong> Lopen de scores sterk uiteen? Dan drukt u uw kwetsbaarheid mogelijk extreem goed weg via coping (bijv. een lage schema-score, maar héél hoog vermijdend gedrag), óf u voelt de pijn wel (hoge schema-score) maar het uit zich niet in actief gedrag. Dit is voor een behandelaar een belangrijk inzicht.</li>
          </ul>
        </div>
      </div>
      
      {/* OPTION D: Clinical Hypothesis Engine */}
      <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <HypothesisIcon size={28} useGradient={true} /> Hypothese
        </h2>
        <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          Deze analyse combineert de theorie van Schematherapie met uw specifieke scores om gepersonaliseerde hypothesen te genereren en te valideren.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {top3Ysq.map((schema, index) => {
            const hypothesis = schemaToModesHypothesis[schema.id];
            if (!hypothesis) return null;
            // Check if patient actually uses these modes
            const usedModes = hypothesis.modes.map(mId => smiScores.find(s => s.id === mId)).filter(m => m && m.mean >= 3.0);
            // Determine card color based on schema domain
            const cardColor = getCardColor('schema', schema.id);
            const medalNames = ['#1', '#2', '#3'];
            const medalName = medalNames[index] || `#${index + 1}`;
            const schemaImgUrl = getSchemaImage(schema.id);
            const rotations = [12, -8, 15];
            const rotation = rotations[index % 3];

            return (
              <div key={schema.id} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', borderLeft: `4px solid ${cardColor}`, border: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
                
                {schemaImgUrl && (
                  <div className="card-scene" title="Klik om te draaien voor uitleg, of lees hier de theorie" style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '10px',
                    width: '130px',
                    height: '185px',
                    transform: `rotate(${rotation}deg)`,
                    zIndex: 10,
                    cursor: 'pointer'
                  }} onClick={() => toggleFlip(schema.id)}>
                    <div className={`card-flip-container ${flippedCards[schema.id] ? 'flipped' : ''}`} style={{ width: '100%', height: '100%' }}>
                      
                      <div className="card-face-front schema-img playing-card" style={{ padding: '10px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', background: 'white' }}>
                        <div style={{ position: 'absolute', top: '4px', left: '4px', right: '4px', bottom: '4px', border: `2px solid ${cardColor}`, borderRadius: '4px', pointerEvents: 'none' }}></div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                          <img src={schemaImgUrl} alt={schema.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply', transform: schema.name === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(1)' }} />
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '0.6rem', fontWeight: 'bold', margin: '4px 0 0 0', lineHeight: '1.1' }}>{schema.name}</div>
                      </div>

                      <div className="card-face-back playing-card" style={{ display: 'flex', flexDirection: 'column', padding: '10px', background: 'var(--bg-main)', boxSizing: 'border-box' }}>
                        <div style={{ position: 'absolute', top: '4px', left: '4px', right: '4px', bottom: '4px', border: `2px solid ${cardColor}`, borderRadius: '4px', pointerEvents: 'none' }}></div>
                        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                          <h4 style={{ fontSize: '0.7rem', marginTop: '0.2rem', marginBottom: '0.2rem', lineHeight: '1.1', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{schema.name}</h4>
                          <p style={{ fontSize: '0.55rem', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 10, WebkitBoxOrient: 'vertical', margin: 0 }}>
                            {schemaDescriptions[schema.name] || schema.name}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                <div style={{ paddingRight: '150px' }}>
                <h4 style={{ color: cardColor, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
                  <span style={{ background: '#94a3b8', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{medalName}</span>
                  Hypothese rondom schema: {schema.name}
                </h4>
                <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.6' }}>"{hypothesis.desc}"</p>
                
                {/* Visual Connection Network for this specific Schema */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                   <div style={{ padding: '0.5rem 1rem', background: `${cardColor}15`, border: `1px solid ${cardColor}`, borderRadius: '20px', fontSize: '1rem', fontWeight: 'bold', color: cardColor }}>{schema.name}</div>
                   <ArrowRightIcon size={16} color="var(--text-muted)" />
                   {hypothesis.modes.map(mId => {
                     const modeData = smiScores.find(s => s.id === mId);
                     const isActive = modeData && modeData.mean >= 3.0;
                     return (
                       <div key={mId} style={{ 
                         padding: '0.5rem 1rem', 
                         background: isActive ? 'rgba(245, 158, 11, 0.2)' : 'transparent', 
                         border: `1px solid ${isActive ? '#f59e0b' : 'var(--border-color)'}`, 
                         color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                         borderRadius: '20px', fontSize: '1rem' 
                       }}>
                         {modeData ? modeData.name : mId} {isActive && '✓'}
                       </div>
                     );
                   })}
                </div>

                {usedModes.length > 0 ? (
                  <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', lineHeight: '1.6' }}>
                    <strong style={{ color: 'var(--text-main)' }}>✓ Bevestiging in data:</strong> 
                    <span style={{ color: 'var(--text-main)' }}> U scoort inderdaad ook bovengemiddeld (≥3) op de theoretisch gekoppelde coping-modi: <strong>{usedModes.map(m => m.name).join(', ')}</strong>. Dit wijst op een sterk patroon.</span>
                  </div>
                ) : (
                  <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', lineHeight: '1.6' }}>
                    <strong style={{ color: 'var(--text-main)' }}>○ Geen sterke bevestiging:</strong> 
                    <span style={{ color: 'var(--text-main)' }}> U lijkt deze standaard coping-modi niet exceptioneel hoog in te zetten. U hanteert waarschijnlijk een andere overlevingsstrategie voor dit schema, of het schema is wel aanwezig maar u copt er niet actief op deze manier mee.</span>
                  </div>
                )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      
      <AiAnalysis ysqData={ysqScores} smiData={smiScores} />
    </div>
  );
}
