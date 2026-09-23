import { Download, RefreshCcw, BarChart2 } from 'lucide-react'
import ysqScoring from '../data/ysq-scoring.json'
import smiScoring from '../data/smi-scoring.json'
import YsqVisualizer from './YsqVisualizer'
import SmiVisualizer from './SmiVisualizer'
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

export default function Results({ type, answers, onRestart }) {
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
    
    // Map SMI abbreviations to full names
    let displayKey = key;
    if (type === 'smi' && smiModesMap[key]) {
      displayKey = smiModesMap[key].name;
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
          <BarChart2 /> {title} Resultaten
        </h2>
        <p>Je hebt {totalAnswered} vragen beantwoord.</p>

        {/* Top 3 Scores Highlight */}
        <div className="top-scores-section glass-panel" style={{ padding: '1.5rem', marginTop: '2rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.2) 100%)' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '1px' }}>🏆 Jouw Top 3 Hoogste Scores</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {top3.map((score, i) => {
              const group = type === 'smi' ? smiModesMap[score.id]?.group : basisbehoeftenMap[score.id];
              return (
                <div key={score.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', borderLeft: `4px solid ${i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : '#b45309'}` }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : '#b45309', width: '30px', textAlign: 'center' }}>
                    #{i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.05rem', lineHeight: '1.2', marginBottom: '4px' }}>{score.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{group || 'Overig'}</div>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-color)' }}>{score.mean}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-color)', letterSpacing: '1px' }}>Volledig Overzicht per Categorie</h3>
          {type === 'ysq' ? (
            <YsqVisualizer groupedScores={groupedScores} />
          ) : (
            <SmiVisualizer groupedScores={groupedScores} />
          )}
        </div>
        
        <div className="results-actions">
          <button className="btn" onClick={handleDownload}>
            <Download size={18} /> Download JSON (Incl. ruwe data)
          </button>
          <button className="btn btn-outline" onClick={onRestart}>
            <RefreshCcw size={18} /> Opnieuw Beginnen
          </button>
        </div>
      </div>
    </div>
  )
}
