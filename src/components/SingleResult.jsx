import { useState } from 'react'
import { DownloadIcon, RefreshIcon, ChartIcon, TrophyIcon } from './Icons'
import ysqScoring from '../data/ysq-scoring.json'
import smiScoring from '../data/smi-scoring.json'
import ysqQuestions from '../data/ysq-s3.json'
import smiQuestions from '../data/smi.json'
import YsqVisualizer from './YsqVisualizer'
import SmiVisualizer from './SmiVisualizer'
import ScoreChart from './ScoreChart'
import { schemaDescriptions } from '../data/descriptions'
import { getVerdieping } from '../data/verdieping'
import { getSchemaImage, getModeImage } from '../utils/images'
import { getCardColor } from '../utils/colors'
import SchemaCard from './SchemaCard'
import { getOfficialCardProps } from '../utils/officialCard';
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
  'Defectiveness/unlovability': 'Minderwaardigheid / Schaamte',
  'Emotional deprivation': 'Emotionele verwaarlozing',
  'Social isolation/Alienation': 'Sociaal isolement / Vervreemding',
  'Practical incompetence/Dependence': 'Afhankelijkheid / Onbekwaamheid',
  'Vulnerability to harm/illness': 'Kwetsbaarheid voor ziekte en gevaar',
  'Enmeshment': 'Verstrengeling / Kluwen',
  'Failure to achieve': 'Mislukking',
  'Insufficient self-control/self-discipline': 'Gebrek aan zelfcontrole / Zelfdiscipline',
  'Entitlement/Superiority': 'Zich rechten toe-eigenen',
  'Subjugation': 'Onderwerping',
  'Self-sacrifice': 'Zelfopoffering',
  'Admiration/Recognition-seeking': 'Goedkeuring en erkenning zoeken',
  'Pessimism/Worry': 'Negativiteit en pessimisme',
  'Emotional inhibition': 'Emotionele geremdheid',
  'Unrelenting Standards': 'Meedogenloze normen / Overmatig kritisch',
  'Self-punitiveness': 'Bestraffende houding'
};

const smiModesMap = {
  'kk': { name: 'Kwetsbare kind', group: 'Kindmodi' },
  'rk': { name: 'Razende kind', group: 'Kindmodi' },
  'ik': { name: 'Impulsieve kind', group: 'Kindmodi' },
  'ok': { name: 'Ongedisciplineerde kind', group: 'Kindmodi' },
  'bk': { name: 'Blije kind', group: 'Functionele modi' },
  'wi': { name: 'Willoze inschikkelijke', group: 'Beschermmodi - Overgave' },
  'ob': { name: 'Onthechte beschermer', group: 'Beschermmodi - Vermijden' },
  'oz': { name: 'Onthechte zelfsusser', group: 'Beschermmodi - Vermijden' },
  'wk': { name: 'Boze kind', group: 'Kindmodi' },
  'zh': { name: 'Zelfverheerlijker', group: 'Beschermmodi - Omkering' },
  'pa': { name: 'Pest en aanval', group: 'Beschermmodi - Omkering' },
  'so': { name: 'Straffende ouder', group: 'Disfunctionele oudermodi' },
  'vo': { name: 'Veeleisende ouder', group: 'Disfunctionele oudermodi' },
  'gv': { name: 'Gezonde volwassene', group: 'Functionele modi' }
};

export default function SingleResult({ type, answers, onUpdateAnswer, onViewBasisbehoeften, onViewModiCategorieen }) {
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
    
    const questionBank = type === 'ysq' ? ysqQuestions : smiQuestions;
    const questionDetails = items.map(qId => {
      const val = answers[qId];
      if (val === undefined) return null;
      const qObj = questionBank.find(q => q.id === parseInt(qId));
      return { id: qId, score: val, text: qObj ? qObj.text : `Vraag ${qId}` };
    }).filter(Boolean);
    
    return { id: key, name: displayKey, mean, highScores, totalItems: items.length, questionDetails }
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
          <ChartIcon size={28} useGradient={true} /> {title} Resultaten
        </h2>

        <p className="no-print">Je hebt {totalAnswered} vragen beantwoord.</p>


          {/* Top 3 Scores Highlight */}
        <div className="top-scores-section glass-panel" style={{ padding: '1.5rem', marginTop: '3rem', marginBottom: '1rem', border: '1px solid var(--border-color)', borderRadius: '16px', background: 'var(--card-bg)', boxShadow: 'var(--glass-shadow)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '3rem', letterSpacing: '1px', fontSize: '1.5rem', color: 'var(--text-main)' }}>
            Jouw Top 3 {type === 'ysq' ? "Schema's" : "Modi"}
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
              const imgUrl = isSchemaImg ? getSchemaImage(score.id) : (isModeImg ? getModeImage(score.id) : null);
              const cardColor = getCardColor(type === 'ysq' ? 'schema' : 'mode', score.id);

              return (
                <div 
                  key={score.id} 
                  className="top-score-card glass-panel" 
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)', borderTop: `6px solid ${cardColor}` }}
                >
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: cardColor, marginBottom: '1rem', lineHeight: '1', opacity: 0.9 }}>
                    #{i + 1}
                  </div>
                  {hasImage && (
                    <div style={{ marginBottom: '1rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <SchemaCard
                        id={score.id}
                        title={score.name}
                        description={schemaDescriptions[score.name] || score.name}
                        src={imgUrl}
                        color={cardColor}
                        width="130px"
                        height="185px"
                        rotation={(i * 7) % 8 - 4}
                        {...getOfficialCardProps(type === 'ysq' ? 'schema' : 'mode', score.id)}
                        flipOnClick={false}
                        zoomOnClick={false}
                      />
                    </div>
                  )}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem', lineHeight: '1.3', marginBottom: '0.25rem', minHeight: '2.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', textAlign: 'center' }}>
                      {score.name.includes(' ') ? (
                        <>
                          <span>{score.name.substring(0, score.name.indexOf(' '))}</span>
                          <span>{score.name.substring(score.name.indexOf(' ') + 1)}</span>
                        </>
                      ) : (
                        <span>{score.name}</span>
                      )}
                    </div>
                    <div style={{ color: 'var(--text-main)', fontSize: '0.8rem', marginBottom: '1.5rem', letterSpacing: '0.5px', minHeight: '2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>{group || 'Overig'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '1.5rem', fontStyle: 'italic', flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
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
          <ScoreChart type={type} scores={calculatedScores.map(score => ({
            ...score,
            category: type === 'smi' ? smiModesMap[score.id]?.group : basisbehoeftenMap[score.id]
          }))} onViewBasisbehoeften={onViewBasisbehoeften} onViewModiCategorieen={onViewModiCategorieen} />
        </div>

        <div className="details-section" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {type === 'ysq' ? (
            <YsqVisualizer groupedScores={groupedScores} top3={top3} onUpdateAnswer={(qId, val) => onUpdateAnswer && onUpdateAnswer(type, qId, val)} />
          ) : (
            <SmiVisualizer groupedScores={groupedScores} top3={top3} onUpdateAnswer={(qId, val) => onUpdateAnswer && onUpdateAnswer(type, qId, val)} />
          )}
        </div>

        {/* Appendix: Theoriekaarten (Scores >= 4) */}
        {sortedOverall.some(s => s.mean >= 4.0) && (
          <div className="appendix-section glass-panel print-break-before" style={{ marginTop: '2rem', padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '16px', background: 'var(--card-bg)' }}>
            <h3 style={{ color: 'var(--text-main)', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem' }}>
               Bijlage: Relevante Theoriekaarten (score ≥ 4.0)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Hieronder vindt u de theoriekaarten en verdiepende uitleg voor de {type === 'ysq' ? 'schema\'s' : 'modi'} waarop u bovengemiddeld hoog heeft gescoord. Deze kunnen gebruikt worden als gespreksstof tijdens uw therapie.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {sortedOverall.filter(s => s.mean >= 4.0).map((score) => {
                const group = type === 'ysq' ? basisbehoeftenMap[score.id] : smiModesMap[score.id]?.group;
                
                // Determine images and colors exactly as top 3 does
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
                const imgUrl = isSchemaImg ? getSchemaImage(score.id) : (isModeImg ? getModeImage(score.id) : null);
                const cardColor = getCardColor(type === 'ysq' ? 'schema' : 'mode', score.id);
                
                const verdieping = getVerdieping(score.name);
                
                return (
                  <div key={score.id} className="single-result-item" style={{ display: 'flex', gap: '2rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
                    {hasImage && (
                      <div style={{ flexShrink: 0 }}>
                         <SchemaCard
                            id={score.id}
                            title={score.name}
                            description={schemaDescriptions[score.name] || score.name}
                            src={imgUrl}
                            color={cardColor}
                            width="180px"
                            height="256px"
                            flipOnClick={false}
                            zoomOnClick={false}
                            {...getOfficialCardProps(type === 'ysq' ? 'schema' : 'mode', score.id)}
                         />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <h4 style={{ color: cardColor, fontSize: '1.3rem', marginTop: 0, marginBottom: '0.5rem' }}>{score.name}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 'bold' }}>{group}</p>
                      
                      <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                        "{schemaDescriptions[score.name] || ''}"
                      </p>

                      <h5 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Herkenbaar Praktijkvoorbeeld</h5>
                      <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', padding: '1rem', borderLeft: `4px solid ${cardColor}`, background: `${cardColor}15`, borderRadius: '0 8px 8px 0' }}>
                        {verdieping.casus}
                      </p>
                      
                      <h5 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Concrete Tips & Handvatten</h5>
                      <ul style={{ color: 'var(--text-main)', paddingLeft: '1.5rem', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>
                        {verdieping.tips.map((tip, idx) => (
                          <li key={idx} style={{ marginBottom: '0.5rem' }}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
