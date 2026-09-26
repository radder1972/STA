import React, { useMemo } from 'react';
import ysqScoring from '../data/ysq-scoring.json';
import smiScoring from '../data/smi-scoring.json';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell, LabelList, Legend } from 'recharts';
import { ArrowRightIcon, LightbulbIcon, HypothesisIcon, ConnectionIcon, MatrixIcon } from './Icons';
import AiAnalysis from './AiAnalysis';

// Duplicated maps for simplicity, as they are not exported from SingleResult
const basisbehoeftenMap = {
  'Abandonment': 'Verbondenheid & Veiligheid', 'Mistrust': 'Verbondenheid & Veiligheid', 'Defectiveness/unlovability': 'Verbondenheid & Veiligheid', 'Emotional deprivation': 'Verbondenheid & Veiligheid', 'Social isolation/Alienation': 'Verbondenheid & Veiligheid',
  'Practical incompetence/Dependence': 'Autonomie', 'Vulnerability to harm/illness': 'Autonomie', 'Enmeshment': 'Autonomie', 'Failure to achieve': 'Autonomie',
  'Insufficient self-control/self-discipline': 'Realistische Grenzen', 'Entitlement/Superiority': 'Realistische Grenzen',
  'Subjugation': 'Zelfexpressie', 'Self-sacrifice': 'Zelfexpressie', 'Admiration/Recognition-seeking': 'Zelfexpressie',
  'Pessimism/Worry': 'Spontaniteit & Spel', 'Emotional inhibition': 'Spontaniteit & Spel', 'Unrelenting Standards': 'Spontaniteit & Spel', 'Self-punitiveness': 'Spontaniteit & Spel'
};

const smiModesMap = {
  'kk': { name: 'Kwetsbare kind', group: 'KINDMODI' }, 'rk': { name: 'Razende kind', group: 'KINDMODI' }, 'ik': { name: 'Impulsieve kind', group: 'KINDMODI' }, 'ok': { name: 'Ongedisciplineerde kind', group: 'KINDMODI' }, 'bk': { name: 'Boze kind', group: 'KINDMODI' },
  'wi': { name: 'Willoze inschikkelijke', group: 'BESCHERMMODI - OVERGAVE' }, 'ob': { name: 'Onthechte beschermer', group: 'BESCHERMMODI - VERMIJDEN' }, 'oz': { name: 'Onthechte zelfsusser', group: 'BESCHERMMODI - VERMIJDEN' }, 'wk': { name: 'Wantrouwende overcontroleerder', group: 'BESCHERMMODI - OMKERING' }, 'zh': { name: 'Zelfverheerlijker', group: 'BESCHERMMODI - OMKERING' }, 'pa': { name: 'Pest en aanval', group: 'BESCHERMMODI - OMKERING' },
  'so': { name: 'Straffende ouder', group: 'DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI' }, 'vo': { name: 'Veeleisende ouder', group: 'DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI' }, 'gv': { name: 'Gezonde volwassene', group: 'FUNCTIONELE MODI' }
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
      { name: 'Grenzen / Oudermodi', ysq: ysqGroups['Realistische Grenzen']?.sum / ysqGroups['Realistische Grenzen']?.count || 0, smi: smiGroups['DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI']?.sum / smiGroups['DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI']?.count || 0 },
      { name: 'Autonomie / Coping (Vermijden)', ysq: ysqGroups['Autonomie']?.sum / ysqGroups['Autonomie']?.count || 0, smi: smiGroups['BESCHERMMODI - VERMIJDEN']?.sum / smiGroups['BESCHERMMODI - VERMIJDEN']?.count || 0 },
      { name: 'Zelfexpressie / Coping (Overgave)', ysq: ysqGroups['Zelfexpressie']?.sum / ysqGroups['Zelfexpressie']?.count || 0, smi: smiGroups['BESCHERMMODI - OVERGAVE']?.sum / smiGroups['BESCHERMMODI - OVERGAVE']?.count || 0 },
      { name: 'Spel / Coping (Omkering)', ysq: ysqGroups['Spontaniteit & Spel']?.sum / ysqGroups['Spontaniteit & Spel']?.count || 0, smi: smiGroups['BESCHERMMODI - OMKERING']?.sum / smiGroups['BESCHERMMODI - OMKERING']?.count || 0 }
    ];
    return combined.map(c => ({ ...c, ysq: Number(c.ysq.toFixed(2)), smi: Number(c.smi.toFixed(2)) }));
  }, [ysqScores, smiScores]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* OPTION D: Clinical Hypothesis Engine */}
      <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        <h2 className="text-gradient" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <HypothesisIcon size={28} useGradient={true} /> Klinische Hypothese
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Deze analyse combineert de theorie van Schematherapie met uw specifieke scores om gepersonaliseerde hypothesen te genereren en te valideren.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {top3Ysq.map((schema, index) => {
            const hypothesis = schemaToModesHypothesis[schema.id];
            if (!hypothesis) return null;
            // Check if patient actually uses these modes
            const usedModes = hypothesis.modes.map(mId => smiScores.find(s => s.id === mId)).filter(m => m && m.mean >= 3.0);
            
            const medalColors = ['#fbbf24', '#94a3b8', '#b45309'];
            const medalColor = medalColors[index] || 'var(--primary)';
            const medalNames = ['#1', '#2', '#3'];
            const medalName = medalNames[index] || `#${index + 1}`;

            return (
              <div key={schema.id} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', borderLeft: `4px solid ${medalColor}`, border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: medalColor }}></div>
                <h4 style={{ color: medalColor, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ background: medalColor, color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{medalName}</span>
                  Hypothese rondom schema: {schema.name}
                </h4>
                <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>"{hypothesis.desc}"</p>
                
                {/* Visual Connection Network for this specific Schema */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                   <div style={{ padding: '0.5rem 1rem', background: `rgba(${index === 0 ? '251, 191, 36' : index === 1 ? '148, 163, 184' : '180, 83, 9'}, 0.1)`, border: `1px solid ${medalColor}`, borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', color: medalColor }}>{schema.name}</div>
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
                         borderRadius: '20px', fontSize: '0.85rem' 
                       }}>
                         {modeData ? modeData.name : mId} {isActive && '✓'}
                       </div>
                     );
                   })}
                </div>

                {usedModes.length > 0 ? (
                  <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>✓ Bevestiging in data:</strong> 
                    <span style={{ color: 'var(--text-muted)' }}> U scoort inderdaad ook bovengemiddeld (≥3) op de theoretisch gekoppelde coping-modi: <strong>{usedModes.map(m => m.name).join(', ')}</strong>. Dit wijst op een sterk patroon.</span>
                  </div>
                ) : (
                  <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>○ Geen sterke bevestiging:</strong> 
                    <span style={{ color: 'var(--text-muted)' }}> U lijkt deze standaard coping-modi niet exceptioneel hoog in te zetten. U hanteert waarschijnlijk een andere overlevingsstrategie voor dit schema, of het schema is wel aanwezig maar u copt er niet actief op deze manier mee.</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* OPTION A: Top 3 Visual Links */}
      <div className="glass-panel print-avoid-break" style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        <h2 className="text-gradient" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ConnectionIcon size={28} useGradient={true} /> Directe Top 3 Connectie
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Voor uw meest verhoogde schema's laten we hier de hoogst scorende, theoretisch gekoppelde modus (SMI) zien.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <h4 style={{ flex: 1, color: 'var(--text-main)', textAlign: 'center', margin: 0 }}>Kwetsbaarheid (Top 3 Schema's)</h4>
            <div style={{ flex: '0 0 40px' }}></div>
            <h4 style={{ flex: 1, color: 'var(--text-main)', textAlign: 'center', margin: 0 }}>Reactie (Hoogste Gekoppelde Modus)</h4>
          </div>

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

            const bg = 'transparent';
            const border = 'var(--border-color)';
            const iconColor = 'var(--text-muted)';
            const iconBg = 'transparent';
            
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', width: '100%', padding: '0.5rem 0', borderBottom: i < 2 ? '1px solid var(--border-color)' : 'none' }}>
                {/* Left Box */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '3rem', background: bg, padding: '0.5rem 0' }}>
                  <span style={{ lineHeight: '1.2', fontSize: '1rem', color: 'var(--text-main)' }}>{schema?.name || '-'}</span> <span style={{ color: 'var(--text-muted)' }}>{schema?.mean || '-'}</span>
                </div>
                
                {/* Center Arrow */}
                <div style={{ flex: '0 0 40px', display: 'flex', justifyContent: 'center' }}>
                  <ArrowRightIcon size={18} color={iconColor} />
                </div>

                {/* Right Box */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '3rem', background: bg, padding: '0.5rem 0' }}>
                  <span style={{ lineHeight: '1.2', fontSize: '1rem', color: 'var(--text-main)' }}>{topLinkedMode?.name || 'Geen sterke link gevonden'}</span> <span style={{ color: 'var(--text-muted)' }}>{topLinkedMode?.mean || '-'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>



      {/* OPTION C: Matrix Table */}
      <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        <h2 className="text-gradient" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MatrixIcon size={28} useGradient={true} /> Kruisverbanden Matrix
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Ruwe data vergelijking: zijn de hoogste schema's terug te zien in het modusgebruik?
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <th style={{ padding: '12px 0', textAlign: 'left', fontWeight: 'normal' }}>Theoretisch Vlak</th>
                <th style={{ padding: '12px 0', textAlign: 'center', fontWeight: 'normal' }}>YSQ Domein Score</th>
                <th style={{ padding: '12px 0', textAlign: 'center', fontWeight: 'normal' }}>SMI Groep Score</th>
              </tr>
            </thead>
            <tbody>
              {domainAverages.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 0', color: 'var(--text-main)', fontSize: '0.95rem' }}>{row.name}</td>
                  <td style={{ padding: '16px 0', textAlign: 'center', color: 'var(--text-main)' }}>
                    <span style={{ fontWeight: row.ysq >= 4 ? 'bold' : 'normal', color: row.ysq >= 4 ? 'var(--text-main)' : 'var(--text-muted)' }}>
                      {row.ysq}
                    </span>
                  </td>
                  <td style={{ padding: '16px 0', textAlign: 'center', color: 'var(--text-main)' }}>
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
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>
            In de schematherapie is er een theoretisch verband tussen uw onderliggende gevoeligheden (schema's) en uw huidige gedrag (modi). Deze matrix legt de score van een groep schema's direct naast de score van de bijbehorende groep modi om te zien of deze in balans zijn.
          </p>
          <ul style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0, paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>In balans:</strong> Een vergelijkbare score betekent dat uw gedrag logisch aansluit bij uw onderliggende gevoel.</li>
            <li><strong>Uit balans (Discrepantie):</strong> Lopen de scores sterk uiteen? Dan drukt u uw kwetsbaarheid mogelijk extreem goed weg via coping (bijv. een lage schema-score, maar héél hoog vermijdend gedrag), óf u voelt de pijn wel (hoge schema-score) maar het uit zich niet in actief gedrag. Dit is voor een behandelaar een belangrijk inzicht.</li>
          </ul>
        </div>
      </div>
      
      <AiAnalysis ysqData={ysqScores} smiData={smiScores} />
    </div>
  );
}
