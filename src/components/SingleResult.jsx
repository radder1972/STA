import { useState } from 'react'
import { DownloadIcon, RefreshIcon, ChartIcon, TrophyIcon } from './Icons'
import ysqScoring from '../data/ysq-scoring.json'
import smiScoring from '../data/smi-scoring.json'
import YsqVisualizer from './YsqVisualizer'
import SmiVisualizer from './SmiVisualizer'
import ScoreChart from './ScoreChart'
import { schemaDescriptions } from '../data/descriptions'
import './Visualizers.css'

const basisbehoeftenMap = {
  'Abandonment': 'Verbondenheid & Veiligheid',
  'Mistrust': 'Verbondenheid & Veiligheid',
  'Defectiveness/unlovability': 'Verbondenheid & Veiligheid',
  'Emotional deprivation': 'Verbondenheid & Veiligheid',
  'Social isolation/Alienation': 'Verbondenheid & Veiligheid',
  'Practical incompetence/Dependence': 'Autonomie',
  'Vulnerability to harm/illness': 'Autonomie',
  'Enmeshment': 'Autonomie',
  'Failure to achieve': 'Autonomie',
  'Insufficient self-control/self-discipline': 'Realistische Grenzen',
  'Entitlement/Superiority': 'Realistische Grenzen',
  'Subjugation': 'Zelfexpressie',
  'Self-sacrifice': 'Zelfexpressie',
  'Admiration/Recognition-seeking': 'Zelfexpressie',
  'Pessimism/Worry': 'Spontaniteit & Spel',
  'Emotional inhibition': 'Spontaniteit & Spel',
  'Unrelenting Standards': 'Spontaniteit & Spel',
  'Self-punitiveness': 'Spontaniteit & Spel'
};

const ysqSchemaNamesMap = {
  'Abandonment': 'Verlating / Instabiliteit',
  'Mistrust': 'Wantrouwen / Misbruik',
  'Defectiveness/unlovability': 'Tekortschieten / Schaamte',
  'Emotional deprivation': 'Emotioneel tekort',
  'Social isolation/Alienation': 'Sociale isolatie / Vervreemding',
  'Practical incompetence/Dependence': 'Afhankelijkheid / Incompetentie',
  'Vulnerability to harm/illness': 'Kwetsbaarheid voor ziekte en gevaar',
  'Enmeshment': 'Kluwen / Onderontwikkeld zelf',
  'Failure to achieve': 'Mislukken',
  'Insufficient self-control/self-discipline': 'Onvoldoende zelfcontrole',
  'Entitlement/Superiority': 'Veeleisendheid / Grandiositeit',
  'Subjugation': 'Onderwerping',
  'Self-sacrifice': 'Zelfopoffering',
  'Admiration/Recognition-seeking': 'Goedkeuring / Erkenning zoeken',
  'Pessimism/Worry': 'Negativisme / Pessimisme',
  'Emotional inhibition': 'Emotionele geremdheid',
  'Unrelenting Standards': 'Meedogenloze normen',
  'Self-punitiveness': 'Bestraffendheid'
};

const smiModesMap = {
  'kk': { name: 'Kwetsbare kind', group: 'KINDMODI' },
  'rk': { name: 'Razende kind', group: 'KINDMODI' },
  'ik': { name: 'Impulsieve kind', group: 'KINDMODI' },
  'ok': { name: 'Ongedisciplineerde kind', group: 'KINDMODI' },
  'bk': { name: 'Boze kind', group: 'KINDMODI' },
  'wi': { name: 'Willoze inschikkelijke', group: 'BESCHERMMODI - OVERGAVE' },
  'ob': { name: 'Onthechte beschermer', group: 'BESCHERMMODI - VERMIJDEN' },
  'oz': { name: 'Onthechte zelfsusser', group: 'BESCHERMMODI - VERMIJDEN' },
  'wk': { name: 'Wantrouwende overcontroleerder', group: 'BESCHERMMODI - OMKERING' },
  'zh': { name: 'Zelfverheerlijker', group: 'BESCHERMMODI - OMKERING' },
  'pa': { name: 'Pest en aanval', group: 'BESCHERMMODI - OMKERING' },
  'so': { name: 'Straffende ouder', group: 'DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI' },
  'vo': { name: 'Veeleisende ouder', group: 'DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI' },
  'gv': { name: 'Gezonde volwassene', group: 'FUNCTIONELE MODI' }
};

export default function SingleResult({ type, answers }) {
  const scoringData = type === 'ysq' ? ysqScoring : smiScoring;
  const title = type === 'ysq' ? 'YSQ S3' : 'SMI'
  
  // Calculate scores
  const calculatedScores = Object.entries(scoringData).map(([key, items]) => {
    let sum = 0;
    let highScores = 0; // count of 5s and 6s
    let answeredCount = 0;
    
    items.forEach(qId => {
      const val = answers[qId]
      if (val !== undefined) {
        sum += val;
        answeredCount++;
        if (val === 5 || val === 6) highScores++;
      }
    })
    
    const mean = answeredCount > 0 ? (sum / answeredCount).toFixed(2) : 0;
    
    // Map abbreviations/English to Dutch names
    let displayKey = key;
    if (type === 'smi' && smiModesMap[key]) {
      displayKey = smiModesMap[key].name;
    } else if (type === 'ysq' && ysqSchemaNamesMap[key]) {
      displayKey = ysqSchemaNamesMap[key];
    }
    
    return { id: key, name: displayKey, mean, highScores, totalItems: items.length }
  })
  
  const handleDownload = () => {
    const exportData = {
      questionnaire: title,
      rawAnswers: answers,
      calculatedScores: calculatedScores
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", `${type}_results.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const totalAnswered = Object.keys(answers).length

  // Group scores
  let groupedScores = {};
  
  if (type === 'ysq') {
    calculatedScores.forEach(score => {
      const groupName = basisbehoeftenMap[score.id] || 'Overig';
      if (!groupedScores[groupName]) groupedScores[groupName] = [];
      groupedScores[groupName].push(score);
    });
  } else if (type === 'smi') {
    calculatedScores.forEach(score => {
      const groupName = smiModesMap[score.id]?.group || 'Overig';
      if (!groupedScores[groupName]) groupedScores[groupName] = [];
      groupedScores[groupName].push(score);
    });
  }
  
  // Sort items within groups by mean descending
  Object.keys(groupedScores).forEach(group => {
    groupedScores[group].sort((a, b) => b.mean - a.mean);
  });

  // Get Top 3 scores overall
  const sortedOverall = [...calculatedScores].sort((a, b) => b.mean - a.mean);
  const top3 = sortedOverall.slice(0, 3);

  return (
    <div className="results-container" style={{ width: '100%', maxWidth: '900px', margin: '0 auto', paddingBottom: '2rem' }}>
      <div className="results-box glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <ChartIcon size={28} /> {title} Resultaten
        </h2>

        <p className="no-print">Je hebt {totalAnswered} vragen beantwoord.</p>


          {/* Top 3 Scores Highlight */}
        <div className="top-scores-section glass-panel" style={{ padding: '1.5rem', marginTop: '3rem', marginBottom: '1rem', border: '1px solid var(--border-color)', borderRadius: '16px', background: 'var(--card-bg)', boxShadow: 'var(--glass-shadow)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-color)', marginBottom: '3rem', letterSpacing: '1px', fontSize: '1.5rem' }}>
            <TrophyIcon size={28} color="#fbbf24" /> Jouw Top 3 {type === 'ysq' ? "Schema's" : "Modi"}
          </h3>
          <div className="top-scores-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {top3.map((score, i) => {
              const group = type === 'smi' ? smiModesMap[score.id]?.group : basisbehoeftenMap[score.id];
              const medalColor = i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : '#b45309';
              
              const schemasWithImages = [
                'Abandonment', 'Mistrust', 'Emotional deprivation', 'Social isolation/Alienation', 'Defectiveness/unlovability',
                'Practical incompetence/Dependence', 'Vulnerability to harm/illness', 'Enmeshment', 'Failure to achieve', 'Self-sacrifice',
                'Admiration/Recognition-seeking', 'Pessimism/Worry', 'Emotional inhibition', 'Unrelenting Standards', 'Self-punitiveness',
                'Entitlement/Superiority', 'Insufficient self-control/self-discipline', 'Subjugation'
              ];
              const modesWithImages = ['kk', 'rk', 'ik', 'wi', 'oz', 'ob', 'vo', 'so', 'wk', 'pa', 'zh', 'gv', 'bk', 'ok'];
              
              const isSchemaImg = type === 'ysq' && schemasWithImages.includes(score.id);
              const isModeImg = type === 'smi' && modesWithImages.includes(score.id);
              const hasImage = isSchemaImg || isModeImg;
              const imgUrl = isSchemaImg ? `/images/schemas/${score.id.replace('/', '_')}.png` : (isModeImg ? `/images/modes/${score.id}.png` : null);

              return (
                <div 
                  key={score.id} 
                  className="top-score-card glass-panel" 
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: `6px solid ${medalColor}`, padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: medalColor, marginBottom: '1rem', lineHeight: '1' }}>
                    #{i + 1}
                  </div>
                  {hasImage && (
                    <div style={{ marginBottom: '1rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <div className="schema-img playing-card" style={{ width: '130px', height: '155px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transform: `rotate(${(i * 7) % 8 - 4}deg)`, boxShadow: '2px 4px 12px rgba(0,0,0,0.4)', border: '4px solid white', background: 'white' }}>
                        <img src={imgUrl} alt={score.name} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: score.name === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(0.85)' }} />
                      </div>
                    </div>
                  )}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', lineHeight: '1.3', marginBottom: '0.25rem', minHeight: '2.8rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>{score.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.5px', minHeight: '2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>{group || 'Overig'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '1.5rem', fontStyle: 'italic', flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                      {schemaDescriptions[score.name] || ''}
                    </div>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-main)', background: 'var(--card-bg)', padding: '0.2rem 1rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>{score.mean}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Chart Overview */}
        <div className="chart-section glass-panel" style={{ marginTop: '1rem', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '16px', background: 'var(--card-bg)' }}>
          <ScoreChart scores={calculatedScores.map(score => ({
            ...score,
            category: type === 'smi' ? smiModesMap[score.id]?.group : basisbehoeftenMap[score.id]
          }))} />
        </div>

        <div className="details-section" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {type === 'ysq' ? (
            <YsqVisualizer groupedScores={groupedScores} top3={top3} />
          ) : (
            <SmiVisualizer groupedScores={groupedScores} top3={top3} />
          )}
        </div>
      </div>
    </div>
  )
}
